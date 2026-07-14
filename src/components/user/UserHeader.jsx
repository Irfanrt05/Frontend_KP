import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import api from "../../services/api";
import {
  getDisplayName,
  getStoredUser,
  getUserAvatar,
  saveStoredUser,
} from "../../utils/userStorage";

export default function UserHeader() {
  const [user, setUser] = useState(() => getStoredUser());
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser());
    window.addEventListener("user-updated", syncUser);
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        const me = res.data.data || res.data.user || res.data;
        if (me?.id) setUser(saveStoredUser(me));
      } catch {
        syncUser();
      }
    };
    fetchMe();
    return () => window.removeEventListener("user-updated", syncUser);
  }, []);

  const keyword = searchParams.get("q") || "";
  const handleSearch = (value) => {
    const next = new URLSearchParams(searchParams);
    value ? next.set("q", value) : next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const searchPlaceholder = location.pathname.includes("recipes")
    ? "Cari resep sehat..."
    : location.pathname.includes("articles")
      ? "Cari artikel menarik..."
      : "Cari data...";

  return (
    <header className="user-header sticky top-0 z-40 px-8 py-6 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="user-header__inner max-w-[1600px] mx-auto flex items-center justify-between gap-8">
        {/* Profile Greeting */}
        <div className="user-header__greeting hidden lg:block">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Selamat Pagi,
          </h2>
          <p className="text-xl font-black text-slate-800">
            {getDisplayName(user)}
          </p>
        </div>

        {/* Search Bar */}
        <div className="user-header__search flex-1 max-w-xl">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#10BB89] transition-colors"
              size={20}
            />
            <input
              value={keyword}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 py-3.5 pl-12 pr-6 rounded-2xl outline-none focus:border-[#10BB89] focus:ring-4 focus:ring-[#10BB89]/10 transition-all text-sm font-medium"
              placeholder={searchPlaceholder}
            />
          </div>
        </div>

        {/* Navigation & User */}
        <div className="user-header__actions flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-bold text-slate-400 hover:text-[#10BB89] transition-colors"
          >
            About
          </Link>

          <button className="relative p-2.5 bg-emerald-50 text-[#10BB89] rounded-xl hover:bg-emerald-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-[#10BB89] transition-all">
              <img
                src={getUserAvatar(user)}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
