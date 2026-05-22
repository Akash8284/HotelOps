const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = require("../config/prisma");

const getUsers = async (req, res) => {

  const users = await prisma.user.findMany();

  res.json(users);

};

const createUser = async (req, res) => {

  try {

    const {
  name,
  email,
  password,
  role
} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });

    res.status(201).json(user);

  } catch (error) {

  console.log(error);

  res.status(500).json({
    message: error.message
  });

}

};

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      "secretkey",
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {

   console.log(error);

res.status(500).json({
  message: error.message
});
  }

};

module.exports = {
  getUsers,
  createUser,
  loginUser
};