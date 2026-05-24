const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const userRoutes = require("./routes/userRoutes");


const app = express();


app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});