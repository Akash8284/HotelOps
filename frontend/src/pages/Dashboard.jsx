import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [department, setDepartment] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  const [priority, setPriority] = useState("");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/tasks",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/tasks",
        {
          title,
          description,
          department,
          assignedTo,
          priority
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setShowModal(false);

      setTitle("");
      setDescription("");
      setDepartment("");
      setAssignedTo("");
      setPriority("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks
    },
    {
      title: "Pending",
      value: pendingTasks
    },
    {
      title: "Completed",
      value: completedTasks
    },
    {
      title: "In Progress",
      value: inProgressTasks
    }
  ];

  return (

    <div className="min-h-screen bg-black text-white flex overflow-hidden relative">

      {/* Ambient Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950 opacity-90"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-20 top-[-100px] left-[-100px] animate-blob"></div>

      <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl opacity-20 bottom-[-100px] right-[-100px] animate-blob animation-delay-2000"></div>

      {/* Sidebar */}

      <div className="w-72 bg-white/10 backdrop-blur-xl border-r border-white/10 p-8 relative z-10">

        <h1 className="text-4xl font-bold mb-12">
          HotelOps
        </h1>

        <div className="space-y-4">

          <button className="w-full text-left bg-purple-600 hover:bg-purple-700 transition p-4 rounded-2xl font-semibold">
            Dashboard
          </button>

          <button className="w-full text-left hover:bg-white/10 transition p-4 rounded-2xl">
            Tasks
          </button>

          <button className="w-full text-left hover:bg-white/10 transition p-4 rounded-2xl">
            Staff
          </button>

          <button className="w-full text-left hover:bg-white/10 transition p-4 rounded-2xl">
            Reports
          </button>

        </div>

        <button
          onClick={logout}
          className="absolute bottom-10 left-8 right-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 transition p-4 rounded-2xl"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-10 relative z-10">

        {/* Topbar */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h2 className="text-5xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-400 mt-3">
              Welcome back, Admin 👋
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 transition px-8 py-4 rounded-2xl font-semibold shadow-lg"
          >
            + Create Task
          </button>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6 mb-10">

          {
            stats.map((item, index) => (

              <div
                key={index}
                className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:scale-105 transition"
              >

                <h3 className="text-gray-300 text-lg">
                  {item.title}
                </h3>

                <p className="text-5xl font-bold mt-4">
                  {item.value}
                </p>

              </div>

            ))
          }

        </div>

        {/* Tasks Table */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.1)]">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Recent Tasks
            </h2>

          </div>

          <table className="w-full">

            <thead>

              <tr className="text-left text-gray-400 border-b border-white/10">

                <th className="pb-5">Task</th>

                <th className="pb-5">Department</th>

                <th className="pb-5">Assigned</th>

                <th className="pb-5">Priority</th>

                <th className="pb-5">Status</th>

              </tr>

            </thead>

            <tbody>

              {
                tasks.map((task) => (

                  <tr
                    key={task.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >

                    <td className="py-6 text-lg">
                      {task.title}
                    </td>

                    <td>
                      {task.department}
                    </td>

                    <td>
                      {task.assignedTo}
                    </td>

                    <td>

                      <span className={`
                        px-4 py-2 rounded-full text-sm font-semibold
                        ${
                          task.priority === "HIGH"
                            ? "bg-red-500/20 text-red-400"
                            : task.priority === "MEDIUM"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }
                      `}>

                        {task.priority}

                      </span>

                    </td>

                    <td>

                      <span className={`
                        px-4 py-2 rounded-full text-sm font-semibold
                        ${
                          task.status === "COMPLETED"
                            ? "bg-green-500/20 text-green-400"
                            : task.status === "PENDING"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                        }
                      `}>

                        {task.status}

                      </span>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}

      {
        showModal && (

          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-[500px]">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">
                  Create Task
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>

              </div>

              <form onSubmit={createTask}>

                <input
                  type="text"
                  placeholder="Task Title"
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/10 mb-4 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/10 mb-4 outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <select
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/10 mb-4 outline-none"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="MAINTENANCE">
                    Maintenance
                  </option>

                  <option value="HOUSEKEEPING">
                    Housekeeping
                  </option>

                  <option value="FRONTDESK">
                    Front Desk
                  </option>

                </select>

                <input
                  type="text"
                  placeholder="Assigned To"
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/10 mb-4 outline-none"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                />

                <select
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/10 mb-6 outline-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >

                  <option value="">
                    Select Priority
                  </option>

                  <option value="HIGH">
                    HIGH
                  </option>

                  <option value="MEDIUM">
                    MEDIUM
                  </option>

                  <option value="LOW">
                    LOW
                  </option>

                </select>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 transition p-4 rounded-xl font-semibold"
                >
                  Create Task
                </button>

              </form>

            </div>

          </div>

        )
      }

    </div>

  );

};

export default Dashboard;