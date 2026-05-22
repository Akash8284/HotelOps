const prisma = require("../config/prisma");

const createTask = async (req, res) => {

  try {

    const {
  title,
  description,
  department,
  assignedTo,
  priority
} = req.body;

    const task = await prisma.task.create({
     data: {
  title,
  description,
  department,
  assignedTo,
  priority
}
    });

    res.status(201).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

const getTasks = async (req, res) => {

  try {

    const tasks = await prisma.task.findMany();

    res.json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

const updateTaskStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status
      }
    });

    res.json(updatedTask);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};