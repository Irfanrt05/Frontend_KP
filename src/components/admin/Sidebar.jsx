import {
  LayoutDashboard,
  Users,
  Newspaper,
  FileBarChart,
  Utensils,
  Activity,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      // Tambahkan logika hapus token di sini
      navigate("/login");
    }
  };

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Pengguna", icon: Users, path: "/admin/users" },
    { name: "Blog", icon: Newspaper, path: "/admin/blogs" },
    { name: "Laporan", icon: FileBarChart, path: "/admin/reports" },
    { name: "Activity Log", icon: Activity, path: "/admin/activity-logs" },
    { name: "Resep", icon: Utensils, path: "/admin/recipes" },
  ];

  return (
    <aside className="w-[280px] h-screen bg-[#10BB89] text-white flex flex-col flex-shrink-0 shadow-xl">
      <div className="px-8 py-7 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <img
              src="/logo-probit_w.png"
              alt="PROBIT"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="font-black text-2xl tracking-wide">PROBIT</h1>
            <p className="text-xs text-white/70">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#10BB89] shadow-lg font-bold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <div className="border-t border-white/10 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-white/90 hover:bg-white hover:text-[#10BB89] font-bold"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
