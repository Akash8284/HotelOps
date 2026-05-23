import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const WorkerDashboard = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

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

  const acceptTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/accept/${id}`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const completeTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/complete/${id}`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );

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

    <div className="min-h-screen bg-black text-white p-10 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950 opacity-90"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-20 top-[-100px] left-[-100px] animate-blob"></div>

      <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl opacity-20 bottom-[-100px] right-[-100px] animate-blob animation-delay-2000"></div>

      <div className="relative z-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Worker Dashboard
            </h1>

            <p className="text-gray-400">
              Welcome back {name} 👋
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 transition px-6 py-3 rounded-2xl"
          >
            Logout
          </button>

        </div>

        <div className="grid gap-6">

          {
            tasks.map((task) => (

              <div
                key={task.id}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-3xl font-bold mb-2">
                      {task.title}
                    </h2>

                    <p className="text-gray-400 mb-4">
                      {task.description}
                    </p>

                    <div className="flex gap-4 mb-6">

                      <span className="bg-white/10 px-4 py-2 rounded-xl">
                        {task.department}
                      </span>

                      <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-xl">
                        {task.priority}
                      </span>

                      <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-xl">
                        {task.status}
                      </span>

                    </div>

                  </div>

                </div>

                {
                  !task.assignedTo && (

                    <button
                      onClick={() => acceptTask(task.id)}
                      className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-2xl font-semibold"
                    >
                      Accept Task
                    </button>

                  )
                }

                {
                  task.assignedTo === name &&
                  task.status !== "COMPLETED" && (

                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-2xl font-semibold ml-4"
                    >
                      Mark Complete
                    </button>

                  )
                }

                <div className="mt-6 text-sm text-gray-400 space-y-2">

                  <p>
                    Assigned To:
                    {" "}
                    {task.assignedTo || "Not Assigned"}
                  </p>

                  {
                    task.startedAt && (

                      <p>

                        Started:
                        {" "}
                        {
                          new Date(task.startedAt)
                            .toLocaleString()
                        }

                      </p>

                    )
                  }

                  {
                    task.completedAt && (

                      <p>

                        Completed:
                        {" "}
                        {
                          new Date(task.completedAt)
                            .toLocaleString()
                        }

                      </p>

                    )
                  }

                  {
                    task.startedAt &&
                    task.completedAt && (

                      <p>

                        Duration:
                        {" "}
                        {
                          Math.floor(
                            (
                              new Date(task.completedAt) -
                              new Date(task.startedAt)
                            ) / 60000
                          )
                        }
                        {" "}
                        mins

                      </p>

                    )
                  }

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

};

export default WorkerDashboard;