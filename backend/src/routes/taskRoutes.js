const adminMiddleware = require("../middlewares/adminMiddleware");

const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus
} = require("../controllers/taskController");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);

router.get("/", authMiddleware, getTasks);

router.put("/:id", authMiddleware, adminMiddleware, updateTaskStatus);

module.exports = router;