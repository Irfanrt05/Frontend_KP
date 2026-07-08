import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Clock3,
  Loader2,
  Activity,
  Search,
  User,
  Sparkles,
  FileText,
  Utensils,
  Bell,
  Heart,
  ChevronRight,
} from "lucide-react";
import { getMyActivityLogs } from "../../services/activityLogService";
import { formatDateTimeIndonesia } from "../../utils/dateTime";
import { formatAction } from "../../utils/text";

export default function UserActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getMyActivityLogs();
        setLogs(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil activity log user:", err);
        setError(
          "Activity log belum bisa dimuat. Pastikan backend berjalan dan token login masih valid.",
        );
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return logs;
    return logs.filter((log) =>
      String(log.action_description || "")
        .toLowerCase()
        .includes(q),
    );
  }, [logs, keyword]);

  const getActivityConfig = (description) => {
    const desc = String(description || "").toLowerCase();

    if (
      desc.includes("profile") ||
      desc.includes("akun") ||
      desc.includes("health")
    ) {
      return {
        icon: User,
        bg: "bg-blue-50 text-blue-600 border-blue-100",
        badge: "Profil Kesehatan",
      };
    }
    if (desc.includes("plan") || desc.includes("generate")) {
      return {
        icon: Sparkles,
        bg: "bg-purple-50 text-purple-600 border-purple-100",
        badge: "AI Plan",
      };
    }
    if (desc.includes("artikel") || desc.includes("blog")) {
      return {
        icon: FileText,
        bg: "bg-amber-50 text-amber-600 border-amber-100",
        badge: "Edukasi",
      };
    }
    if (
      desc.includes("resep") &&
      (desc.includes("favorit") || desc.includes("favorite"))
    ) {
      return {
        icon: Heart,
        bg: "bg-rose-50 text-rose-600 border-rose-100",
        badge: "Favorit",
      };
    }
    if (desc.includes("resep") || desc.includes("makan")) {
      return {
        icon: Utensils,
        bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
        badge: "Kuliner",
      };
    }
    if (desc.includes("reminder") || desc.includes("ingat")) {
      return {
        icon: Bell,
        bg: "bg-cyan-50 text-cyan-600 border-cyan-100",
        badge: "Pengingat",
      };
    }

    return {
      icon: Activity,
      bg: "bg-emerald-50 text-[#10BB89] border-emerald-100",
      badge: "Aktivitas",
    };
  };

  const groupedLogs = useMemo(() => {
    const groups = { Today: [], Yesterday: [], Older: [] };

    const todayStr = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    filteredLogs.forEach((log) => {
      const logDate = new Date(log.createdAt || log.created_at);
      const logDateStr = logDate.toDateString();

      if (logDateStr === todayStr) {
        groups.Today.push(log);
      } else if (logDateStr === yesterdayStr) {
        groups.Yesterday.push(log);
      } else if (!isNaN(logDate.getTime())) {
        groups.Older.push(log);
      } else {
        groups.Older.push(log);
      }
    });

    return groups;
  }, [filteredLogs]);

  return (
    <div className="relative min-h-screen overflow-hidden pt-4 pb-16 px-1">
      {/* Ambient Background Blobs */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#10BB89]/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-emerald-500/4 blur-[100px] pointer-events-none" />

      <section className="w-full relative z-10">
        {/* MODIFIKASI HEADER: Blok Hijau Tema Premium */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center mb-10 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.01)]">
          <div className="flex gap-4 items-start">
            {/* Blok Vertikal Hijau Tema */}
            <div className="w-2 h-16 md:h-20 bg-[#10BB89] rounded-full shrink-0 shadow-[0_0_12px_rgba(16,187,137,0.4)]" />

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-[38px] font-black tracking-tight text-slate-900 leading-none">
                  Activity Log
                </h1>
                <span className="bg-[#10BB89]/10 text-[#10BB89] border border-[#10BB89]/20 font-bold px-2.5 py-0.5 rounded-lg text-xs tracking-wider uppercase">
                  System Tracking
                </span>
              </div>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-slate-500 max-w-[720px]">
                Riwayat aktivitas akun kamu seperti membuat health profile,
                generate plan, membuka artikel, membuka resep, reminder, dan
                favorite resep.
              </p>
            </div>
          </div>

          {/* Card Total Ringkasan */}
          <div className="flex justify-start lg:justify-end shrink-0 w-full lg:w-auto">
            <div className="bg-white rounded-2xl p-4.5 shadow-[0_12px_30px_rgba(0,0,0,0.02)] border border-slate-100 min-w-[240px] w-full lg:w-auto flex items-center justify-between gap-6 transition-all hover:shadow-[0_16px_35px_rgba(0,0,0,0.04)] duration-300">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                  Total Aktivitas
                </p>
                <h2 className="text-3xl font-black text-slate-900 mt-0.5">
                  {logs.length}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#10BB89] flex items-center justify-center text-white shadow-md shadow-[#10BB89]/20">
                <Activity size={20} className="animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifikasi Pencarian */}
        {keyword && (
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-full px-4 py-1.5 mb-8 shadow-sm text-xs md:text-sm text-slate-600">
            <Search size={14} className="text-slate-400" />
            <span>
              Hasil pencarian untuk:{" "}
              <b className="text-slate-900 font-bold">"{keyword}"</b>
            </span>
          </div>
        )}

        {/* KONDISI 1: Loading Skeleton */}
        {loading ? (
          <div className="space-y-6 w-full">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 space-y-4 animate-pulse w-full"
              >
                <div className="h-4 w-28 bg-slate-200 rounded"></div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
                    <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // KONDISI 2: Error State
          <div className="bg-red-50/60 backdrop-blur-md rounded-2xl border border-red-100 p-5 text-red-600 flex items-start gap-3 shadow-sm w-full">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <span className="text-sm font-semibold leading-relaxed">
              {error}
            </span>
          </div>
        ) : filteredLogs.length === 0 ? (
          // KONDISI 3: Empty State
          <div className="bg-white/60 backdrop-blur-xl rounded-[32px] p-16 text-center border border-white/80 shadow-md max-w-xl mx-auto my-10">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">
              Riwayat Tidak Ditemukan
            </h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Tidak ada log aktivitas yang cocok dengan kriteria pencarian saat
              ini.
            </p>
          </div>
        ) : (
          // KONDISI 4: UI UTAMA LOGS (W-FULL DESKTOP)
          <div className="space-y-10 w-full">
            {Object.entries(groupedLogs).map(([label, groupLogs]) => {
              if (groupLogs.length === 0) return null;

              const labelMap = {
                Today: "Hari Ini",
                Yesterday: "Kemarin",
                Older: "Riwayat Terdahulu",
              };

              return (
                <div key={label} className="space-y-4 w-full">
                  {/* Sticky Header Hari */}
                  <div className="inline-flex items-center gap-2 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.01)] border border-slate-100 px-4 py-1.5 rounded-xl">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-600">
                      {labelMap[label]}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10BB89]"></span>
                    <span className="text-xs font-bold text-slate-400">
                      {groupLogs.length} Aktivitas
                    </span>
                  </div>

                  {/* Wrapper Timeline Box Full Desktop */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.015)] border border-white/80 relative w-full">
                    {/* Alur Garis Vertikal */}
                    <div className="absolute top-8 bottom-8 left-[34px] md:left-[42px] w-[2px] bg-gradient-to-b from-slate-100 via-slate-200/50 to-transparent" />

                    <div className="space-y-1.5">
                      {groupLogs.map((log) => {
                        const config = getActivityConfig(
                          log.action_description,
                        );
                        const LogIcon = config.icon;

                        return (
                          <div
                            key={log.id}
                            className="flex gap-4 md:gap-5 p-3.5 rounded-2xl hover:bg-white border-l-4 border-transparent hover:border-l-[#10BB89] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.02)] transition-all duration-200 group relative z-10 items-center w-full"
                          >
                            {/* Titik Custom Ikon Dinamis */}
                            <div
                              className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${config.bg} border shadow-xs flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm`}
                            >
                              <LogIcon
                                size={20}
                                className="transition-transform duration-300 group-hover:rotate-[8deg]"
                              />
                            </div>

                            {/* Konten Log */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase bg-slate-50 border border-slate-100 text-slate-500">
                                  {config.badge}
                                </span>
                              </div>
                              <h3 className="font-bold text-slate-700 text-sm md:text-base tracking-tight group-hover:text-slate-900 transition-colors truncate">
                                {formatAction(log.action_description)}
                              </h3>
                              <div className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5 font-medium">
                                <Clock3 size={12} className="text-slate-300" />
                                <span>
                                  {formatDateTimeIndonesia(
                                    log.createdAt || log.created_at,
                                  )}{" "}
                                  WIB
                                </span>
                              </div>
                            </div>

                            {/* Indikator Panah Kanan */}
                            <div className="text-slate-300 group-hover:text-[#10BB89] transition-colors pl-2 hidden sm:block">
                              <ChevronRight
                                size={16}
                                className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
