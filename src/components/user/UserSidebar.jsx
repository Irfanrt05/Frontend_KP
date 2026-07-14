import { NavLink } from "react-router-dom";
import {
  Activity,
  BookOpenText,
  Heart,
  LayoutDashboard,
  Settings,
  Soup,
  ClipboardPlus,
  History,
  Menu,
  X,
} from "lucide-react";

export default function UserSidebar({ collapsed, setCollapsed, className = "" }) {
  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", end: true },
    {
      name: "Health Profile",
      icon: Activity,
      path: "/dashboard/health-profile",
    },
    {
      name: "Generate Plan",
      icon: ClipboardPlus,
      path: "/dashboard/generate-plan",
    },
    { name: "Resep", icon: Soup, path: "/dashboard/recipes" },
    { name: "Favorite", icon: Heart, path: "/dashboard/favorites" },
    { name: "Artikel", icon: BookOpenText, path: "/dashboard/articles" },
    { name: "Activity Log", icon: History, path: "/dashboard/activity-logs" },
  ];

  return (
    <aside
      className={`
        user-sidebar ${className}
        fixed left-0 top-0 bottom-0 z-50 h-screen bg-[#10BB89] text-white
        flex flex-col shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${collapsed ? "w-[90px]" : "w-[240px]"}
      `}
    >
      {/* CORAK BACKGROUND (Dot Pattern & Gradient) */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />

      {/* LOGO AREA */}
      <div className="relative z-10 h-[120px] flex items-center justify-between px-6">
        <div
          className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
        >
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <img src="/logo-probit_w.png" alt="PROBIT" className="w-7" />
          </div>
          <h1 className="font-black text-lg tracking-tight whitespace-nowrap">
            PROBIT
          </h1>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-90 border border-white/10"
        >
          {collapsed ? <Menu size={22} /> : <X size={22} />}
        </button>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="relative z-10 flex-1 flex flex-col gap-2 px-4 mt-4">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `
                h-14 flex items-center gap-4 px-4 rounded-2xl transition-all duration-300
                ${collapsed ? "justify-center" : "justify-start"}
                ${isActive ? "bg-white text-[#10BB89] shadow-lg shadow-black/10" : "hover:bg-white/10 text-white/80 hover:text-white"}
              `}
            >
              <Icon size={22} className="shrink-0" />
              <span
                className={`font-bold whitespace-nowrap transition-all duration-300 ${collapsed ? "hidden" : "block"}`}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER SETTINGS */}
      <div className="relative z-10 p-4 border-t border-white/10">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => `
            h-14 flex items-center gap-4 px-4 rounded-2xl transition-all duration-300
            ${collapsed ? "justify-center" : "justify-start"}
            ${isActive ? "bg-white text-[#10BB89]" : "hover:bg-white/10 text-white/80"}
          `}
        >
          <Settings size={22} className="shrink-0" />
          <span
            className={`font-bold whitespace-nowrap transition-all duration-300 ${collapsed ? "hidden" : "block"}`}
          >
            Pengaturan
          </span>
        </NavLink>
      </div>
    </aside>
  );
}
