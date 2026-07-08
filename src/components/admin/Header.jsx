import { Bell, Search, User, LogOut, ChevronDown } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../../services/api";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminData, setAdminData] = useState({
    username: "Loading...",
    role: "...",
    avatar: null,
  });
  const menuRef = useRef(null);

  const fetchUserData = async () => {
    try {
      const res = await api.get("/auth/me");
      // Mengambil data yang tepat berdasarkan respons API Anda
      setAdminData(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal memuat profil admin");
    }
  };

  useEffect(() => {
    fetchUserData();
    window.addEventListener("profileUpdated", fetchUserData);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("profileUpdated", fetchUserData);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/users": "Pengguna",
    "/admin/blogs": "Blog",
    "/admin/recipes": "Resep",
    "/admin/profile": "Profil Saya",
    "/admin/reports": "Laporan",
    "/admin/activity-logs": "Activity Log",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  // Fungsi untuk membersihkan path gambar
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    // Jika sudah ada http, langsung kembalikan
    if (avatarPath.startsWith("http")) return avatarPath;
    // Pastikan diawali /uploads/
    const cleanPath = avatarPath.startsWith("/")
      ? avatarPath
      : `/${avatarPath}`;
    return `http://localhost:5000${cleanPath}?t=${new Date().getTime()}`;
  };

  return (
    <header className="sticky top-4 z-50 px-6">
      <div className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] flex items-center justify-between px-6 py-3 transition-all">
        <div className="flex-shrink-0">
          <h2 className="text-lg font-black text-slate-800">{currentTitle}</h2>
          <p className="text-[9px] font-bold text-[#10BB89] uppercase tracking-widest">
            {currentTitle} Panel
          </p>
        </div>

        <div className="flex-1 max-w-sm mx-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search
                size={16}
                className="text-slate-400 group-focus-within:text-[#10BB89] transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Cari data..."
              className="w-full bg-slate-100/50 border border-transparent focus:bg-white focus:border-[#10BB89]/30 focus:ring-4 focus:ring-[#10BB89]/10 text-sm py-2.5 pl-11 pr-4 rounded-full outline-none transition-all duration-300 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3" ref={menuRef}>
          <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition text-slate-500">
            <Bell size={16} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-[#10BB89] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-emerald-200/50 overflow-hidden border border-white">
                {adminData.avatar ? (
                  <img
                    src={getAvatarUrl(adminData.avatar)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  adminData.username?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                <div className="px-5 py-2 border-b border-slate-50 mb-2">
                  <p className="font-bold text-xs truncate">
                    {adminData.username}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize">
                    {adminData.role}
                  </p>
                </div>
                <Link
                  to="/admin/profile"
                  className="flex items-center gap-3 px-5 py-2.5 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <User size={14} /> Profil
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
