import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Users,
  Newspaper,
  Utensils,
  Activity,
  Loader2,
  RefreshCw,
  ChevronRight,
  BarChart3,
  Clock,
  HelpCircle,
  X,
  CheckCircle,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false); // State untuk Popup
  const [data, setData] = useState({
    users: [],
    blogs: [],
    recipes: [],
    logs: [],
  });

  const fetchData = useCallback(async () => {
    try {
      const [u, b, r, l] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/blogs"),
        api.get("/recipes"),
        api.get("/admin/activity-logs"),
      ]);
      setData({
        users: u.data.data || [],
        blogs: b.data.data || [],
        recipes: r.data.data || [],
        logs: l.data.data || l.data || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-[#10BB89]" size={40} />
      </div>
    );

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* Welcome Card & Help Button */}
      <div className="bg-[#10BB89] rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2">Halo, Admin Probit! 👋</h1>
          <p className="text-emerald-50 max-w-md">
            Kelola konten, pantau pengguna, dan analisa performa aplikasi Anda
            dari satu dashboard terpusat.
          </p>
        </div>
        <button
          onClick={() => setShowHelp(true)}
          className="relative z-10 flex items-center gap-2 bg-white/20 hover:bg-white hover:text-[#10BB89] transition px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm"
        >
          <HelpCircle size={18} /> Panduan Admin
        </button>
        <div className="absolute right-0 top-0 opacity-10">
          <Activity size={200} />
        </div>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: "User",
            val: data.users.length,
            icon: Users,
            color: "#10BB89",
          },
          {
            title: "Blog",
            val: data.blogs.length,
            icon: Newspaper,
            color: "#6366f1",
          },
          {
            title: "Resep",
            val: data.recipes.length,
            icon: Utensils,
            color: "#f59e0b",
          },
          {
            title: "Sistem",
            val: data.logs.length,
            icon: BarChart3,
            color: "#ec4899",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3"
          >
            <div
              className="p-2.5 rounded-xl text-white"
              style={{ backgroundColor: s.color }}
            >
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                {s.title}
              </p>
              <p className="font-black text-lg">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
            <Clock size={16} className="text-[#10BB89]" /> Aktivitas Terbaru
          </h2>
          <div className="space-y-3">
            {data.logs.slice(0, 5).map((log, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#10BB89]" />
                <p className="text-xs font-medium text-slate-600 truncate flex-1">
                  {log.activity || log.action_description}
                </p>
                <span className="text-[10px] text-slate-400">
                  {new Date(log.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#10BB89] text-white rounded-2xl p-6 shadow-lg shadow-emerald-200 flex flex-col justify-between">
          <div>
            <h2 className="font-bold mb-1">Butuh Bantuan?</h2>
            <p className="text-[11px] text-emerald-50 mb-4">
              Akses cepat ke laporan dan manajemen konten utama.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/reports")}
            className="w-full bg-white/20 backdrop-blur-sm text-white py-2.5 rounded-xl text-xs font-bold hover:bg-white hover:text-[#10BB89] transition flex items-center justify-center gap-2"
          >
            Lihat Detail <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* PopUp Help */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg">Panduan Admin</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                "Kelola User: Lihat dan atur hak akses pengguna.",
                "Manajemen Blog: Buat, edit, dan hapus artikel.",
                "Database Resep: Update katalog resep masakan.",
                "Log Sistem: Pantau setiap aktivitas perubahan.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle size={18} className="text-[#10BB89] shrink-0" />{" "}
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full mt-8 bg-[#10BB89] text-white py-3 rounded-xl font-bold"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
