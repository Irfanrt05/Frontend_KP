import {
  LayoutDashboard,
  Users,
  Newspaper,
  FileBarChart,
  Utensils,
  Activity,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { useState } from "react";
import Toast from "../Toast";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Pengguna", icon: Users, path: "/admin/users" },
    { name: "Blog", icon: Newspaper, path: "/admin/blogs" },
    { name: "Laporan", icon: FileBarChart, path: "/admin/reports" },
    { name: "Activity Log", icon: Activity, path: "/admin/activity-logs" },
    { name: "Resep", icon: Utensils, path: "/admin/recipes" },
    { name: "Pengaturan", icon: Settings, path: "/admin/profile" },
  ];


  function handleToastAction(action) {
    if (action === "confirm") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }

    setToast(null);
  }

  return (
    <>
      <aside
        className={`
          user-sidebar
          fixed left-0 top-0 bottom-0 z-50 h-screen
          bg-[#10BB89] text-white flex flex-col shadow-2xl
          transition-all duration-300 ease-in-out
          w-[240px]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-[90px]" : "lg:w-[240px]"}
        `}
      >
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />

        <div className="relative z-10 h-[100px] flex items-center justify-between px-6">
          <div
            className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${collapsed ? "lg:opacity-0 lg:w-0 opacity-100 w-auto" : "opacity-100 w-auto"
              }`}
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
              <img src="/logo-probit_w.png" alt="PROBIT" className="w-7" />
            </div>
            <h1 className="font-black text-lg tracking-tight whitespace-nowrap">PROBIT</h1>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-90 border border-white/10"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <Menu size={22} /> : <X size={22} />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-90 border border-white/10"
            aria-label="Tutup sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="relative z-10 flex-1 flex flex-col gap-1 px-3 mt-4 overflow-y-auto custom-scrollbar">
          {menus.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `h-13 flex items-center gap-3 px-3 rounded-xl transition-all duration-300
                  ${collapsed ? "lg:justify-center" : "justify-start"}
                  ${isActive
                    ? "bg-white text-[#10BB89] shadow-lg shadow-black/10"
                    : "hover:bg-white/10 text-white/80 hover:text-white"
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                <span
                  className={`font-medium whitespace-nowrap transition-all duration-300
                    ${collapsed ? "block lg:hidden" : "block"}`}
                >
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className="relative z-10 p-4 border-t border-white/10">
          <NavLink
            to="/login"
            onClick={() => {
              setMobileOpen(false);
              handleToastAction("confirm");
            }}
            className={`h-14 flex items-center gap-4 px-4 rounded-2xl transition-all duration-300 hover:bg-white/10 text-white/80
              ${collapsed ? "lg:justify-center" : "justify-start"}`}
          >
            <LogOut size={22} className="shrink-0" />
            <span
              className={`font-bold whitespace-nowrap transition-all duration-300
                ${collapsed ? "block lg:hidden" : "block"}`}
            >
              logout
            </span>
          </NavLink>
        </div>
      </aside>

      <Toast toast={toast} onClose={() => setToast(null)} onAction={handleToastAction} />
    </>
  );
}
