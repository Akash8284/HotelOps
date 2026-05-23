import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [department, setDepartment] = useState("");

  const [priority, setPriority] = useState("");

  const name = localStorage.getItem("name");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks`,
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
        `${import.meta.env.VITE_API_URL}/tasks`,
        {
          title,
          description,
          department,
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
      setPriority("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-black text-white flex overflow-hidden relative">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950 opacity-90"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-20 top-[-100px] left-[-100px] animate-blob"></div>

      <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl opacity-20 bottom-[-100px] right-[-100px] animate-blob animation-delay-2000"></div>

      {/* Sidebar */}

      <div className="w-72 bg-white/10 backdrop-blur-xl border-r border-white/10 p-8 relative z-10">

        <h1 className="text-4xl font-bold mb-12">
          HotelOps
        </h1>

        <div className="space-y-4">

          <button className="w-full text-left bg-purple-600 p-4 rounded-2xl font-semibold">
            Admin Dashboard
          </button>

        </div>

        <button
          onClick={logout}
          className="absolute bottom-10 left-8 right-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 transition p-4 rounded-2xl"
        >
          Logout
        </button>

      </div>

      {/* Main */}

      <div className="flex-1 p-10 relative z-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h2 className="text-5xl font-bold">
              Admin Dashboard
            </h2>

            <p className="text-gray-400 mt-3">
              Welcome back {name} 👋
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 transition px-8 py-4 rounded-2xl font-semibold"
          >
            + Create Task
          </button>

        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            All Tasks
          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-left text-gray-400 border-b border-white/10">

                <th className="pb-5">Task</th>

                <th className="pb-5">Assigned To</th>

                <th className="pb-5">Priority</th>

                <th className="pb-5">Status</th>

                <th className="pb-5">Started</th>

                <th className="pb-5">Completed</th>

              </tr>

            </thead>

            <tbody>

              {
                tasks.map((task) => (

                  <tr
                    key={task.id}
                    className="border-b border-white/5"
                  >

                    <td className="py-6">
                      {task.title}
                    </td>

                    <td>
                      {task.assignedTo || "Unassigned"}
                    </td>

                    <td>
                      {task.priority}
                    </td>

                    <td>
                      {task.status}
                    </td>

                    <td>

                      {
                        task.startedAt
                          ? new Date(task.startedAt)
                              .toLocaleString()
                          : "-"
                      }

                    </td>

                    <td>

                      {
                        task.completedAt
                          ? new Date(task.completedAt)
                              .toLocaleString()
                          : "-"
                      }

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

export default AdminDashboard;