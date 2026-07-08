import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Dumbbell,
  Plus,
  Heart,
  Zap,
  Target,
  Award,
  Loader2,
  Activity,
  Flame,
  Clock,
  TrendingUp,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getDisplayName,
  getStoredUser,
  getUserAvatar,
} from "../utils/userStorage";
import {
  getHealthProfiles,
  getGeneratedPlans,
} from "../services/userHealthService";
import { getMyActivityLogs } from "../services/activityLogService";
import { getFavoriteRecipes } from "../services/favoriteService";

export default function Dashboard() {
  const [user, setUser] = useState(() => getStoredUser() || {});
  const [profiles, setProfiles] = useState([]);
  const [plans, setPlans] = useState([]);
  const [logs, setLogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = () => setUser(getStoredUser() || {});
    window.addEventListener("user-updated", sync);
    return () => window.removeEventListener("user-updated", sync);
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [profileRes, planRes, logRes, favoriteRes] = await Promise.all([
          getHealthProfiles().catch(() => ({ data: { data: [] } })),
          getGeneratedPlans().catch(() => ({ data: { data: [] } })),
          getMyActivityLogs().catch(() => ({ data: { data: [] } })),
          getFavoriteRecipes().catch(() => ({ data: { data: [] } })),
        ]);
        setProfiles(profileRes.data.data || []);
        setPlans(planRes.data.data || []);
        setLogs(logRes.data.data || []);
        setFavorites(favoriteRes.data.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const name = getDisplayName(user);
  const latestProfile = profiles[0];
  const activePlan = plans[0];
  const activePlanDetails = activePlan?.plan_details || [];

  const bmi = useMemo(() => {
    if (!latestProfile?.weight || !latestProfile?.height) return "-";
    const meter = Number(latestProfile.height) / 100;
    return (Number(latestProfile.weight) / (meter * meter)).toFixed(1);
  }, [latestProfile]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#10BB89]" size={48} />
          <p className="text-slate-400 font-medium animate-pulse">
            Memuat data kesehatan...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 space-y-8 animate-in fade-in duration-1000">
      {/* --- Header Section --- */}
      <header className="relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] -mr-20 -mt-20 opacity-50" />
        <div className="flex items-center gap-6 z-10">
          <div className="p-1 bg-gradient-to-br from-[#10BB89] to-emerald-400 rounded-[1.8rem] shadow-lg shadow-emerald-200">
            <img
              src={getUserAvatar(user)}
              alt="User"
              className="w-20 h-20 rounded-[1.6rem] object-cover bg-white"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-[#10BB89] uppercase tracking-[0.2em]">
              Dashboard Utama
            </p>
            <h1 className="text-4xl font-extrabold text-slate-900 mt-1">
              Halo, {name.split(" ")[0]}!
            </h1>
          </div>
        </div>
        <Link
          to="/dashboard/generate-plan"
          className="group z-10 bg-slate-900 hover:bg-[#10BB89] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all duration-500 active:scale-95 shadow-xl hover:shadow-[#10BB89]/30"
        >
          <Plus className="group-hover:rotate-90 transition-transform duration-500" />{" "}
          Buat Rencana Baru
        </Link>
      </header>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<Activity className="text-emerald-500" />}
          title="Aktivitas"
          value={`${logs.length}`}
          sub="Total Sesi"
        />
        <StatCard
          icon={<Heart className="text-rose-500" />}
          title="Favorit"
          value={`${favorites.length}`}
          sub="Resep Disimpan"
        />
        <StatCard
          icon={<Flame className="text-orange-500" />}
          title="Kalori"
          value={activePlan?.daily_calories_target || "0"}
          sub="Target Harian"
        />
        <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl relative overflow-hidden">
          <div className="z-10">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              BMI Terakhir
            </p>
            <h3 className="text-4xl font-black mt-2">{bmi}</h3>
          </div>
          <Target
            className="text-white/10 absolute right-4 bottom-4"
            size={64}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Jadwal Hari Ini */}
        <section className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
          <h2 className="text-xl font-bold flex items-center gap-3 text-slate-900 mb-8">
            <Zap className="text-[#10BB89]" /> Jadwal Hari Ini
          </h2>
          {activePlanDetails[0] ? (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#10BB89]">
                  <Dumbbell size={32} />
                </div>
                <h3 className="text-3xl font-black">
                  {activePlanDetails[0].title}
                </h3>
                <p className="text-slate-500">
                  {activePlanDetails[0].description}
                </p>
              </div>
              <button className="w-full py-5 bg-slate-900 hover:bg-[#10BB89] text-white font-bold rounded-2xl transition-all duration-300">
                Mulai Sesi
              </button>
            </div>
          ) : (
            <p className="text-slate-400 italic">Belum ada jadwal hari ini.</p>
          )}
        </section>

        {/* --- Planning Hari ke-2 dan ke-3 --- */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CalendarDays className="text-[#10BB89]" /> Upcoming Plan
            </h2>
            <div className="space-y-4">
              {[2, 3].map((day) => (
                <div
                  key={day}
                  className="group p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-[#10BB89] uppercase">
                      Hari ke-{day}
                    </span>
                    <Clock size={14} className="text-slate-400" />
                  </div>
                  <h4 className="font-bold text-slate-900">
                    {activePlanDetails[day - 1]?.title || "Istirahat Aktif"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {activePlanDetails[day - 1]?.description ||
                      "Pemulihan otot & stretching."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <footer className="text-center pb-10 text-slate-400 text-sm">
        © 2026 Health ProBit Dashboard.
      </footer>
    </div>
  );
}

function StatCard({ icon, title, value, sub }) {
  return (
    <div className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            {title}
          </p>
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-400 italic">→ {sub}</p>
    </div>
  );
}
