const prisma = require("../config/prisma");

const getTasks = async (req, res) => {

  try {

    let tasks;

    if (req.user.role === "ADMIN") {

      tasks = await prisma.task.findMany({
        orderBy: {
          createdAt: "desc"
        }
      });

    } else {

      tasks = await prisma.task.findMany({
        where: {
          OR: [
            {
              assignedTo: null
            },
            {
              assignedTo: req.user.name
            }
          ]
        },
        orderBy: {
          createdAt: "desc"
        }
      });

    }

    res.json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      department,
      priority
    } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        department,
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

const acceptTask = async (req, res) => {

  try {

    const { id } = req.params;

    const task = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        assignedTo: req.user.name,
        status: "IN_PROGRESS",
        startedAt: new Date()
      }
    });

    res.json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

const completeTask = async (req, res) => {

  try {

    const { id } = req.params;

    const task = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status: "COMPLETED",
        completedAt: new Date()
      }
    });

    res.json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

const getWorkerHistory = async (req, res) => {

  try {

    const tasks = await prisma.task.findMany({
      where: {
        assignedTo: req.user.name,
        status: "COMPLETED"
      },
      orderBy: {
        completedAt: "desc"
      }
    });

    res.json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getTasks,
  createTask,
  acceptTask,
  completeTask,
  getWorkerHistory
};