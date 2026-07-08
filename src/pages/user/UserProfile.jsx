import {
  Camera,
  ArrowLeft,
  LogOut,
  MapPin,
  Briefcase,
  Calendar,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getStoredUser,
  getUserAvatar,
  saveStoredUser,
} from "../../utils/userStorage";
import { useState } from "react";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    () =>
      getStoredUser() || {
        username: "",
        bio: "",
        age: "",
        job: "",
        location: "",
        avatar: null,
      },
  );
  const [message, setMessage] = useState("");

  const handleChange = (key, value) => {
    const updatedUser = { ...user, [key]: value };
    setUser(saveStoredUser(updatedUser));
    setMessage("Profil berhasil diperbarui!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Navigation: Tanpa Box */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold shadow-sm border border-slate-200 transition-all"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-red-50 text-red-600 font-semibold shadow-sm border border-slate-200 transition-all"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Main Form Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Informasi Profil
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ProfileRow label="Username">
                <input
                  value={user.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </ProfileRow>
              <ProfileRow label="Usia">
                <input
                  type="number"
                  value={user.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </ProfileRow>
              <ProfileRow label="Pekerjaan">
                <input
                  value={user.job}
                  onChange={(e) => handleChange("job", e.target.value)}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </ProfileRow>
              <ProfileRow label="Lokasi">
                <input
                  value={user.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </ProfileRow>
            </div>
            <div className="mt-6">
              <ProfileRow label="Bio Singkat">
                <textarea
                  value={user.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none h-32 resize-none transition-all"
                />
              </ProfileRow>
            </div>
          </section>

          {/* Sidebar Preview */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center">
              <div className="relative inline-block">
                <img
                  src={getUserAvatar(user)}
                  className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-md object-cover"
                />
                <label className="absolute bottom-0 right-0 p-2 bg-emerald-500 text-white rounded-full cursor-pointer hover:bg-emerald-600 shadow-lg">
                  <Camera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const reader = new FileReader();
                      reader.onload = () =>
                        handleChange("avatar", reader.result);
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                @{user.username || "User"}
              </h3>

              {/* Tambahan: Menampilkan Bio di Sidebar */}
              <p className="text-sm text-slate-500 mt-2 italic px-2 break-words">
                {user.bio ? `"${user.bio}"` : "Belum ada bio"}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <DetailItem
                  icon={Calendar}
                  label="Usia"
                  value={user.age || "-"}
                />
                <DetailItem
                  icon={Briefcase}
                  label="Pekerjaan"
                  value={user.job || "-"}
                />
                {/* CSS break-words memastikan teks panjang tidak keluar dari card */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl text-left border border-slate-100">
                  <div className="p-2 bg-white rounded-lg text-emerald-500 shadow-sm shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Lokasi
                    </div>
                    <div className="text-sm font-semibold text-slate-700 break-words">
                      {user.location || "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {message && (
              <div className="flex items-center gap-2 justify-center text-emerald-700 bg-emerald-50 py-3 rounded-xl font-medium text-sm">
                <Save size={16} /> {message}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl text-left border border-slate-100">
      <div className="p-2 bg-white rounded-lg text-emerald-500 shadow-sm shrink-0">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          {label}
        </div>
        <div className="text-sm font-semibold text-slate-700 truncate">
          {value}
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
        {label}
      </label>
      {children}
    </div>
  );
}
