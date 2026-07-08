import { useEffect, useState } from "react";
import api from "../../services/api";
import { Trash2, ShieldCheck, User, Loader2, AlertCircle } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/admin/users");
      // Menangani berbagai kemungkinan struktur data dari backend
      const data = response.data.data || response.data || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      setError(
        "Gagal memuat data pengguna. Pastikan Anda login sebagai Admin.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)),
      );
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Gagal update role"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus pengguna ini secara permanen?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(
        "Error: " + (err.response?.data?.message || "Gagal menghapus user"),
      );
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 text-emerald-600 gap-2">
        <Loader2 className="animate-spin w-8 h-8" />
        <span className="text-sm font-medium">Memuat data...</span>
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Manajemen Pengguna
          </h2>
          <p className="text-slate-500 text-sm">
            Kelola akses dan data pengguna sistem
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
          Total: {users.length} User
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* TABEL DENGAN TEMA EMERALD */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden border-l-4 border-l-emerald-500">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-50/50 border-b border-emerald-100">
              <th className="px-8 py-5 text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                Pengguna
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                Email
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                Role
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-emerald-800 uppercase tracking-widest text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-emerald-50/30`}
                >
                  <td className="px-8 py-5 text-sm font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <User size={16} />
                    </div>
                    {user.username}
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                    {user.email}
                  </td>
                  <td className="px-8 py-5">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleUpdateRole(user.id, e.target.value)
                      }
                      className={`text-[11px] font-black px-4 py-1.5 rounded-xl cursor-pointer outline-none transition-all border border-emerald-100 ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <option value="user">USER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-slate-400 text-sm italic"
                >
                  Belum ada pengguna terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
