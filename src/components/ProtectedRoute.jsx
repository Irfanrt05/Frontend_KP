// import { Navigate, Outlet } from "react-router-dom";

// export default function ProtectedRoute({ adminOnly = false }) {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   if (!token || !user || !user.email) return <Navigate to="/login" replace />;

//   if (adminOnly && user.email !== "admin@Probits.com") return <Navigate to="/dashboard" replace />;

//   return <Outlet />;
// }
