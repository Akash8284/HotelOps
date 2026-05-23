const express = require("express");

const router = express.Router();

const {
  getTasks,
  createTask,
  acceptTask,
  completeTask,
  getWorkerHistory
} = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/",
  authMiddleware,
  getTasks
);

router.get(
  "/history",
  authMiddleware,
  getWorkerHistory
);

router.post(
  "/",
  authMiddleware,
  createTask
);
router.put(
  "/accept/:id",
  authMiddleware,
  acceptTask
);
router.get(
  "/",
  authMiddleware,
  getTasks
);

router.post(
  "/",
  authMiddleware,
  createTask
);

router.put(
  "/accept/:id",
  authMiddleware,
  acceptTask
);

router.put(
  "/complete/:id",
  authMiddleware,
  completeTask
);

module.exports = router;