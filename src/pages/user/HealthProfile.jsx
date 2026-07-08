import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Edit3,
  HeartPulse,
  Trash2,
  UserRound,
  Wallet,
  X,
  Scale,
  Ruler,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import {
  createHealthProfile,
  deleteHealthProfile,
  getHealthProfiles,
  updateHealthProfile,
} from "../../services/userHealthService";

const initialForm = {
  age: "",
  gender: "male",
  weight: "",
  height: "",
  activity_level: "medium",
  goal_type: "maintain",
  budget_limit: "",
};

const goalLabels = {
  maintain: "Menjaga Berat",
  bulking: "Menaikkan Massa",
  cutting: "Menurunkan Berat",
  diet: "Diet Sehat",
};

const activityLabels = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
};

export default function HealthProfile() {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const selectedProfile = useMemo(() => profiles[0], [profiles]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await getHealthProfiles();
      setProfiles(res.data.data || []);
    } catch (error) {
      setMessage("Gagal memuat data profile");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      age: form.age ? Number(form.age) : null,
      gender: form.gender,
      weight: Number(form.weight),
      height: Number(form.height),
      activity_level: form.activity_level,
      goal_type: form.goal_type,
      budget_limit: form.budget_limit ? Number(form.budget_limit) : null,
    };

    if (!payload.weight || !payload.height || !payload.goal_type) {
      setMessage("Harap lengkapi data berat, tinggi, dan tujuan!");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await updateHealthProfile(editingId, payload);
        setMessage("Profile berhasil diperbarui");
      } else {
        await createHealthProfile(payload);
        setMessage("Profile berhasil dibuat");
      }
      setMessageType("success");
      resetForm();
      fetchProfiles();
    } catch (error) {
      setMessage("Gagal memproses data");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setForm({ ...profile });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus profile ini?")) return;
    try {
      setLoading(true);
      await deleteHealthProfile(id);
      setMessage("Profile berhasil dihapus");
      setMessageType("success");
      fetchProfiles();
    } catch (error) {
      setMessage("Gagal menghapus data");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const calculateBmi = (p) => {
    if (!p?.weight || !p?.height) return "0.0";
    const h = Number(p.height) / 100;
    return (Number(p.weight) / (h * h)).toFixed(1);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-6 md:p-12 space-y-10">
      {/* Header Section dengan Efek Abstrak */}
      <section className="relative w-full overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#10BB89] to-[#087f5d] p-12 text-white shadow-2xl shadow-emerald-500/30">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-100 uppercase tracking-[0.2em] text-[10px] font-black bg-white/20 w-fit px-5 py-2 rounded-full backdrop-blur-md">
              <Activity size={14} /> System Configuration
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              Health Profile
            </h1>
            <p className="text-emerald-50 text-lg opacity-90 max-w-lg leading-relaxed">
              Kelola data biometrik Anda untuk mendapatkan insight nutrisi dan
              progres yang lebih akurat.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[2.5rem] p-8 flex items-center gap-6 shadow-2xl">
            <div>
              <p className="text-emerald-100 text-sm font-semibold uppercase tracking-widest">
                BMI Saat Ini
              </p>
              <h2 className="text-6xl font-black">
                {calculateBmi(selectedProfile)}
              </h2>
            </div>
            <div className="h-16 w-px bg-white/20" />
            <div className="text-white/80">
              <p className="text-xs font-bold uppercase">Status</p>
              <p className="font-black text-lg">Optimal</p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full grid lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[80px] -mr-32 -mt-32" />

          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                {editingId ? "Edit Profile" : "Buat Baru"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="p-3 bg-slate-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-all"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Input
                label="Usia"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
              />
              <Select
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Input
                label="Berat (kg)"
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                icon={<Scale size={18} />}
              />
              <Input
                label="Tinggi (cm)"
                name="height"
                type="number"
                value={form.height}
                onChange={handleChange}
                icon={<Ruler size={18} />}
              />
            </div>

            <Select
              label="Level Aktivitas"
              name="activity_level"
              value={form.activity_level}
              onChange={handleChange}
            >
              {Object.entries(activityLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </Select>

            <Select
              label="Tujuan Kesehatan"
              name="goal_type"
              value={form.goal_type}
              onChange={handleChange}
            >
              {Object.entries(goalLabels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </Select>

            <Input
              label="Budget (Rp)"
              name="budget_limit"
              type="number"
              value={form.budget_limit}
              onChange={handleChange}
              icon={<Wallet size={18} />}
            />

            <button
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg transition-all hover:bg-[#10BB89] hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95"
            >
              {loading
                ? "Menyimpan..."
                : editingId
                  ? "Perbarui Profile"
                  : "Simpan Profile"}
            </button>
          </div>
        </form>

        {/* Dashboard Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={UserRound}
              title="Total"
              value={profiles.length}
              desc="Data Tersimpan"
            />
            <StatCard
              icon={TrendingUp}
              title="Goal"
              value={goalLabels[selectedProfile?.goal_type] || "-"}
              desc="Target Utama"
            />
            <StatCard
              icon={Wallet}
              title="Budget"
              value={
                selectedProfile?.budget_limit
                  ? `Rp ${Number(selectedProfile.budget_limit).toLocaleString()}`
                  : "-"
              }
              desc="Limit Bulanan"
            />
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <CalendarDays className="text-[#10BB89]" size={24} /> Riwayat Data
            </h3>

            <div className="space-y-6">
              {profiles.map((p, i) => (
                <div
                  key={p.id}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-[#10BB89]/20 hover:bg-white hover:shadow-2xl transition-all duration-500"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-[2rem] font-black text-2xl text-[#10BB89] border border-slate-100 shadow-inner">
                      {i + 1}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
                      <Info
                        label="Statistik"
                        value={`${p.weight}kg / ${p.height}cm`}
                      />
                      <Info
                        label="Aktivitas"
                        value={activityLabels[p.activity_level]}
                      />
                      <Info label="Tujuan" value={goalLabels[p.goal_type]} />
                      <Info
                        label="Budget"
                        value={
                          p.budget_limit
                            ? `Rp ${p.budget_limit.toLocaleString()}`
                            : "-"
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 md:mt-0">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-4 bg-white border border-slate-100 rounded-[1.5rem] hover:bg-[#10BB89] hover:text-white transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-4 bg-white border border-slate-100 rounded-[1.5rem] hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">
        {label}
      </label>
      <div className="relative flex items-center group">
        {icon && (
          <div className="absolute left-5 text-slate-400 group-focus-within:text-[#10BB89] transition-colors">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] py-4 px-6 outline-none focus:border-[#10BB89] focus:bg-white transition-all text-sm font-bold ${icon ? "pl-14" : ""}`}
        />
      </div>
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div className="space-y-3 relative group">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">
        {label}
      </label>
      <select
        {...props}
        className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] py-4 px-6 outline-none focus:border-[#10BB89] focus:bg-white transition-all cursor-pointer font-bold text-sm"
      >
        {children}
      </select>
      <ChevronDown
        className="absolute right-6 top-11 text-slate-400 pointer-events-none group-focus-within:text-[#10BB89]"
        size={18}
      />
    </div>
  );
}

function StatCard({ icon: Icon, title, value, desc }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex items-center gap-6 transition-all hover:scale-[1.02] hover:border-[#10BB89]/20">
      <div className="p-5 bg-emerald-50 text-[#10BB89] rounded-[1.8rem]">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          {title}
        </p>
        <h4 className="font-black text-slate-900 text-2xl">{value}</h4>
        <p className="text-[11px] font-semibold text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        {label}
      </p>
      <p className="font-bold text-slate-800 text-sm mt-1">{value}</p>
    </div>
  );
}
