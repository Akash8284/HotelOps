import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isLogin) {

        const response = await axios.post(
          "http://localhost:5000/users/login",
          {
            email,
            password
          }
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        navigate("/dashboard");

      } else {

        await axios.post(
          "http://localhost:5000/users",
          {
            name,
            email,
            password,
            role: "STAFF"
          }
        );

        alert("Account Created Successfully");

        setIsLogin(true);

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (

    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">

      {/* Animated Gradient Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950 animate-gradient opacity-90"></div>

      {/* Ambient Blobs */}

      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-20 animate-blob top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 bottom-[-100px] right-[-100px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-pink-600 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000 top-[40%] left-[40%]"></div>

      {/* Login Card */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.3)] p-10 w-[400px] text-white relative z-10">

        <h1 className="text-5xl font-bold text-center mb-3">
          HotelOps
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Smart Hotel Management Platform
        </p>

        <form onSubmit={handleSubmit}>

          {
            !isLogin && (

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            )
          }

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-6 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold p-4 rounded-xl hover:bg-gray-200 hover:scale-105 transition duration-300"
          >

            {
              isLogin
                ? "Sign In"
                : "Create Account"
            }

          </button>

        </form>

        <p className="text-center mt-8 text-gray-300">

          {
            isLogin
              ? "Don't have an account?"
              : "Already have an account?"
          }

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white font-bold hover:text-purple-300 transition"
          >

            {
              isLogin
                ? "Sign Up"
                : "Sign In"
            }

          </button>

        </p>

      </div>

    </div>

  );

};

export default Login;