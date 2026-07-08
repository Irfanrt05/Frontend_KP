import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Dumbbell,
  Flame,
  HeartPulse,
  Loader2,
  PlusCircle,
  RefreshCcw,
  Salad,
  Trash2,
  Wallet,
} from "lucide-react";
import {
  deleteGeneratedPlan,
  generateHealthPlan,
  getGeneratedPlans,
  getHealthProfiles,
} from "../../services/userHealthService";

const activityIcons = {
  meal: Salad,
  workout: Dumbbell,
  habit: HeartPulse,
  recovery: RefreshCcw,
};

export default function GenerateHealthPlan() {
  const [profiles, setProfiles] = useState([]);
  const [plans, setPlans] = useState([]);
  const [profileId, setProfileId] = useState("");
  const [planPeriod, setPlanPeriod] = useState("weekly");
  const [activePlan, setActivePlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const latestPlan = useMemo(() => activePlan || plans[0], [activePlan, plans]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, planRes] = await Promise.all([
        getHealthProfiles(),
        getGeneratedPlans(),
      ]);
      const profileData = profileRes.data.data || [];
      const planData = planRes.data.data || [];
      setProfiles(profileData);
      setPlans(planData);
      if (!profileId && profileData[0]) setProfileId(String(profileData[0].id));
    } catch (error) {
      setMessage(error.response?.data?.message || "Gagal mengambil data generate plan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = async (e) => {
  e.preventDefault();
  setMessage("");

  if (profiles.length === 0) {
    setMessage("Silahkan isi Health Profile terlebih dahulu");
    return;
  }

  if (!profileId) {
    setMessage("Pilih Health Profile terlebih dahulu");
    return;
  }

    try {
      setLoading(true);
      const res = await generateHealthPlan({
        profile_id: Number(profileId),
        plan_period: planPeriod,
      });
      setActivePlan(res.data.data);
      setMessage("Health plan berhasil dibuat");
      await fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || "Gagal membuat health plan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus rencana ini?")) return;
    try {
      setLoading(true);
      await deleteGeneratedPlan(id);
      setActivePlan(null);
      setMessage("Health plan berhasil dihapus");
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || "Gagal menghapus plan");
    } finally {
      setLoading(false);
    }
  };

  const selectedProfile = profiles.find((profile) => String(profile.id) === String(profileId));
  const planDetails = latestPlan?.plan_details || latestPlan?.plan_details || latestPlan?.planDetails || latestPlan?.plan_details || latestPlan?.PlanDetails || [];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#10BB89] to-[#0E9F75] p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-white/70 font-semibold uppercase tracking-[0.3em] text-xs">
              Generate Health Plan
            </p>
            <h1 className="text-4xl font-black mt-2">Buat Rencana Kesehatan</h1>
            <p className="mt-3 text-white/80 max-w-2xl">
              Pilih health profile, lalu sistem akan membuat rencana makanan, olahraga,
              dan aktivitas berdasarkan data kesehatan pengguna.
            </p>
          </div>
          <div className="bg-white/15 border border-white/20 rounded-3xl px-8 py-6 backdrop-blur-xl min-w-[220px]">
            <p className="text-sm text-white/70">Target Kalori</p>
            <h2 className="text-5xl font-black mt-2">
              {latestPlan?.daily_calories_target || "-"}
            </h2>
            <p className="text-sm text-white/80">kcal / hari</p>
          </div>
        </div>
      </div>

      {message && (
        <div className="rounded-2xl border border-[#10BB89]/20 bg-[#10BB89]/10 px-5 py-4 text-sm font-semibold text-slate-700">
          {message}
        </div>
      )}

      {profiles.length === 0 && (
  <div className="rounded-2xl border border-yellow-300 bg-yellow-50 px-5 py-4 text-sm font-semibold text-yellow-700">
    ⚠️ Silahkan isi Health Profile terlebih dahulu sebelum membuat Health Plan.
  </div>
)}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <form onSubmit={handleGenerate} className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-xl text-slate-800">Form Generate</h2>
              <div className="w-12 h-12 rounded-2xl bg-[#10BB89]/10 text-[#10BB89] flex items-center justify-center">
                <PlusCircle size={24} />
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-slate-600">Health Profile</span>
              <select
                value={profileId}
                onChange={(e) => setProfileId(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#10BB89] focus:bg-white transition"
              >
                <option value="">Pilih Profile</option>
                {profiles.map((profile, index) => (
                  <option key={profile.id} value={profile.id}>
                    Profile #{index + 1} - {profile.weight}kg / {profile.height}cm / {profile.goal_type}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-600">Periode Plan</span>
              <select
                value={planPeriod}
                onChange={(e) => setPlanPeriod(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#10BB89] focus:bg-white transition"
              >
                <option value="weekly">Mingguan</option>
                <option value="daily">Harian</option>
              </select>
            </label>

            {selectedProfile && (
              <div className="rounded-3xl bg-slate-50 p-5 space-y-3">
                <Info label="Goal" value={selectedProfile.goal_type} />
                <Info label="Aktivitas" value={selectedProfile.activity_level} />
                <Info label="Budget" value={selectedProfile.budget_limit ? `Rp ${Number(selectedProfile.budget_limit).toLocaleString("id-ID")}` : "-"} />
              </div>
            )}

            <button
              disabled={loading || !profileId || profiles.length === 0}
              className="w-full bg-[#10BB89] text-white rounded-2xl py-4 font-black hover:bg-[#0E9F75] transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <PlusCircle size={18} />
              )}

              {profiles.length === 0
                ? "Buat Health Profile Dulu"
                : "Generate Plan"}
            </button>
          </form>

          <div className="grid gap-4">
            <SmallStat icon={CalendarDays} title="Total Plan" value={plans.length} />
            <SmallStat icon={Flame} title="Kalori Terbaru" value={latestPlan?.daily_calories_target ? `${latestPlan.daily_calories_target} kcal` : "-"} />
            <SmallStat icon={Wallet} title="Estimasi Biaya" value={sumCost(planDetails)} />
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-black text-2xl text-slate-800">Rencana Aktif</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {latestPlan?.summary || "Belum ada rencana aktif. Buat rencana baru dari form di kiri."}
                </p>
              </div>
              {latestPlan && (
                <button onClick={() => handleDelete(latestPlan.id)} className="rounded-2xl bg-red-50 px-4 py-3 text-red-500 font-bold flex items-center gap-2 hover:bg-red-100 transition">
                  <Trash2 size={18} /> Hapus
                </button>
              )}
            </div>

            {latestPlan ? (
              <div className="grid md:grid-cols-3 gap-4">
                <PlanMeta title="Periode" value={latestPlan.plan_period} />
                <PlanMeta title="Kalori Target" value={latestPlan.daily_calories_target ? `${latestPlan.daily_calories_target} kcal/hari` : "-"} />
                <PlanMeta title="Dibuat" value={formatDate(latestPlan.createdAt || latestPlan.created_at)} />
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-50 p-10 text-center text-slate-500">
                Belum ada data generated plan.
              </div>
            )}
          </div>

          {latestPlan && (
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
              <h2 className="font-black text-xl text-slate-800 mb-5">Detail Rencana</h2>

              {planDetails.length === 0 ? (
                <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-500">
                  Detail plan belum tersedia.
                </div>
              ) : (
                <div className="space-y-4">
                  {planDetails.map((detail) => {
                    const Icon = activityIcons[detail.activity_type] || ActivityIcon;
                    return (
                      <div key={detail.id} className="rounded-3xl bg-slate-50 border border-slate-100 p-5 hover:shadow-md transition">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#10BB89]/10 text-[#10BB89] flex items-center justify-center flex-shrink-0">
                            <Icon size={26} />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div>
                                <p className="text-xs font-black text-[#10BB89] uppercase tracking-widest">
                                  {detail.day} • {detail.activity_type}
                                </p>
                                <h3 className="text-lg font-black text-slate-800 mt-1">
                                  {detail.title}
                                </h3>
                              </div>
                              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600">
                                {detail.estimated_cost ? `Rp ${Number(detail.estimated_cost).toLocaleString("id-ID")}` : "Rp 0"}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                              {detail.description || "Tidak ada deskripsi."}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
            <h2 className="font-black text-xl text-slate-800 mb-5">Riwayat Plan</h2>
            {plans.length === 0 ? (
              <p className="text-slate-500 text-sm">Belum ada riwayat plan.</p>
            ) : (
              <div className="space-y-3">
                {plans.map((plan, index) => (
                  <button
                    key={plan.id}
                    onClick={() => setActivePlan(plan)}
                    className={`w-full text-left rounded-2xl p-4 border transition ${latestPlan?.id === plan.id ? "bg-[#10BB89]/10 border-[#10BB89]/30" : "bg-slate-50 border-slate-100 hover:bg-slate-100"}`}
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-black text-slate-800">Plan #{index + 1}</p>
                        <p className="text-sm text-slate-500 line-clamp-1">{plan.summary}</p>
                      </div>
                      <p className="font-black text-[#10BB89] whitespace-nowrap">
                        {plan.daily_calories_target || "-"} kcal
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-400 font-bold">{label}</span>
      <span className="text-slate-700 font-black capitalize">{value}</span>
    </div>
  );
}

function SmallStat({ icon: Icon, title, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-lg flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-[#10BB89]/10 text-[#10BB89] flex items-center justify-center">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="font-black text-lg text-slate-800">{value}</h3>
      </div>
    </div>
  );
}

function PlanMeta({ title, value }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-5">
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{title}</p>
      <p className="font-black text-slate-800 mt-2 capitalize">{value || "-"}</p>
    </div>
  );
}

function ActivityIcon(props) {
  return <HeartPulse {...props} />;
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function sumCost(details) {
  if (!details?.length) return "Rp 0";
  const total = details.reduce((sum, detail) => sum + Number(detail.estimated_cost || 0), 0);
  return `Rp ${total.toLocaleString("id-ID")}`;
}
