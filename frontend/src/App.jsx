import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";

import WorkerDashboard from "./pages/WorkerDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
      path="/dashboard"
      element={<Navigate to="/" />}
      />

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>

              <AdminDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute>

              <WorkerDashboard />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;