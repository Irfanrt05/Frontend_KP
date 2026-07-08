import { useEffect, useMemo, useState } from "react";
import { Activity, AlertCircle, Clock3, Loader2, Search } from "lucide-react";
import { getAdminActivityLogs } from "../../services/activityLogService";
import { formatDateTimeIndonesia } from "../../utils/dateTime";

const formatAction = (text = "") => {
  const value = String(text).replaceAll("_", " ").replaceAll(":", " - ").toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getAdminActivityLogs();
        setLogs(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil activity log admin:", err);
        setError("Activity log belum bisa dimuat. Pastikan kamu login sebagai admin.");
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
      `${log.action_description || ""} ${log.User?.username || ""} ${log.User?.email || ""}`.toLowerCase().includes(q),
    );
  }, [logs, keyword]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Activity Logs</h1>
          <p className="text-sm text-slate-500">Riwayat aktivitas user dan admin pada sistem PROBIT.</p>
        </div>
        <div className="relative w-[360px] max-w-full">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari log"
            className="w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 pr-11 outline-none text-sm focus:border-[#10BB89]"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        {loading ? (
          <div className="h-[260px] flex items-center justify-center text-slate-500 gap-3">
            <Loader2 className="animate-spin" /> Memuat activity log...
          </div>
        ) : error ? (
          <div className="p-5 rounded-2xl bg-red-50 text-red-500 flex gap-3">
            <AlertCircle /> {error}
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-10 text-center text-slate-500">Belum ada activity log.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-4">Aktivitas</th>
                  <th className="pb-4">User</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#10BB89] flex items-center justify-center">
                          <Activity size={20} />
                        </div>
                        <span className="font-bold text-slate-700">{formatAction(log.action_description)}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      <div className="font-bold text-slate-800">{log.User?.username || "User"}</div>
                      <div className="text-xs text-slate-400">{log.User?.email || "-"}</div>
                    </td>
                    <td className="py-4 text-sm">
                      <span className="px-3 py-1 bg-emerald-50 text-[#10BB89] rounded-full text-[10px] font-bold uppercase">
                        {log.User?.role || "-"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2"><Clock3 size={15} /> {formatDateTimeIndonesia(log.createdAt || log.created_at)} WIB</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
