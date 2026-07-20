import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  Database,
  Lock,
  UserCheck,
  Trash2,
  RefreshCcw,
  Mail,
  ChevronDown,
  ArrowLeft,
  Cookie,
  Globe,
} from "lucide-react";

const sections = [
  {
    id: "intro",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "1. Pendahuluan",
    content: (
      <>
        <p>
          Selamat datang di <strong>Probit</strong> – platform manajemen
          kesehatan digital. Kebijakan Privasi ini menjelaskan bagaimana kami
          mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi
          Anda saat menggunakan layanan kami.
        </p>
        <p className="mt-3">
          Dengan menggunakan Probit, Anda menyetujui praktik privasi yang
          dijelaskan dalam kebijakan ini. Kebijakan ini berlaku untuk semua
          pengguna yang berusia <strong>13 tahun ke atas</strong>.
        </p>
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 items-start">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-700 font-medium">
            Kami berkomitmen untuk menjaga privasi Anda dan tidak pernah menjual
            data pribadi Anda kepada pihak ketiga untuk tujuan komersial.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "collected",
    icon: <Database className="w-5 h-5" />,
    title: "2. Data yang Kami Kumpulkan",
    content: (
      <>
        <p className="mb-4">
          Kami mengumpulkan beberapa kategori data berikut saat Anda menggunakan
          Probit:
        </p>
        <div className="space-y-3">
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 text-xs font-black text-slate-700 uppercase tracking-wider">
              Data Identitas &amp; Profil
            </div>
            <div className="px-4 py-3 space-y-2">
              {[
                ["Nama Lengkap / Username", "Wajib – untuk identifikasi akun"],
                ["Alamat Email", "Wajib – login, notifikasi, keamanan"],
                ["Foto Profil", "Opsional – ditampilkan di halaman profil"],
                ["Pekerjaan / Profesi", "Opsional – personalisasi rekomendasi"],
              ].map(([label, desc], i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold text-slate-700 flex-shrink-0">
                    {label}
                  </span>
                  <span className="text-xs text-slate-400 text-right">
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-emerald-100 rounded-xl overflow-hidden">
            <div className="bg-emerald-50 px-4 py-2.5 text-xs font-black text-emerald-700 uppercase tracking-wider">
              Data Kesehatan (Sensitif)
            </div>
            <div className="px-4 py-3 space-y-2">
              {[
                ["Berat &amp; Tinggi Badan", "Personalisasi health plan"],
                ["Usia &amp; Jenis Kelamin", "Kalkulasi kebutuhan kalori"],
                ["Target Kesehatan", "Rekomendasi program kebugaran"],
                ["Riwayat Aktivitas", "Evaluasi progres kesehatan"],
                ["Catatan Nutrisi", "Panduan diet dan resep"],
              ].map(([label, desc], i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <span
                    className="text-xs font-semibold text-slate-700 flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                  <span className="text-xs text-slate-400 text-right">
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 text-xs font-black text-slate-700 uppercase tracking-wider">
              Data Teknis
            </div>
            <div className="px-4 py-3 text-xs text-slate-600 space-y-1">
              <p>• Jenis perangkat dan browser yang digunakan</p>
              <p>• Alamat IP (untuk keamanan dan pencegahan penipuan)</p>
              <p>• Log aktivitas dan halaman yang dikunjungi</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "usage",
    icon: <Eye className="w-5 h-5" />,
    title: "3. Bagaimana Kami Menggunakan Data Anda",
    content: (
      <>
        <p className="mb-3">
          Kami menggunakan data yang dikumpulkan untuk tujuan-tujuan berikut:
        </p>
        <ul className="space-y-2.5">
          {[
            {
              title: "Penyediaan Layanan",
              desc: "Membuat dan mengelola akun Anda, menyediakan fitur health plan, resep, dan artikel.",
            },
            {
              title: "Personalisasi",
              desc: "Menyesuaikan rekomendasi kesehatan, aktivitas, dan nutrisi berdasarkan profil Anda.",
            },
            {
              title: "Keamanan Akun",
              desc: "Mendeteksi aktivitas mencurigakan, mencegah akses tidak sah, dan melindungi data Anda.",
            },
            {
              title: "Komunikasi",
              desc: "Mengirim notifikasi penting, pembaruan layanan, dan reset password melalui email.",
            },
            {
              title: "Peningkatan Platform",
              desc: "Menganalisis pola penggunaan (secara agregat dan anonim) untuk memperbaiki fitur.",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-[10px] font-black">
                  {i + 1}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "storage",
    icon: <Cookie className="w-5 h-5" />,
    title: "4. Penyimpanan Lokal (Local &amp; Session Storage)",
    content: (
      <>
        <p className="mb-4">
          Probit menggunakan teknologi penyimpanan browser untuk memberikan
          pengalaman pengguna yang mulus. Tidak ada cookie pelacak iklan yang
          digunakan.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Local Storage
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Persisten
              </span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-blue-100">
                  <th className="text-left pb-2 font-bold">Key</th>
                  <th className="text-left pb-2 font-bold">Konten</th>
                  <th className="text-left pb-2 font-bold">Tujuan</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 space-y-1">
                {[
                  ["token", "JWT Token", "Menjaga sesi login"],
                  ["user", "Objek data user (JSON)", "Profil cepat tanpa API call"],
                  [
                    "googleAccessToken",
                    "OAuth Token",
                    "Autentikasi via Google",
                  ],
                ].map(([key, val, purpose], i) => (
                  <tr key={i} className="border-b border-blue-50 last:border-0">
                    <td className="py-1.5 font-mono text-blue-700 font-bold">
                      {key}
                    </td>
                    <td className="py-1.5">{val}</td>
                    <td className="py-1.5 text-slate-400">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-blue-400 mt-3 font-medium">
              ⓘ Data dihapus otomatis saat Anda logout. Dapat dihapus manual
              melalui DevTools browser.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Session Storage
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Sementara (per-sesi)
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Digunakan untuk menyimpan data sementara seperti status form,
              preferensi halaman aktif, dan data navigasi. Semua data ini
              dihapus <strong>otomatis</strong> begitu Anda menutup tab atau
              jendela browser — tidak ada data yang tersisa.
            </p>
          </div>
        </div>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 items-start">
          <span className="text-amber-500 font-black text-xs flex-shrink-0">⚠</span>
          <p className="text-xs text-amber-700">
            Data yang tersimpan di browser Anda <strong>tidak dienkripsi</strong>{" "}
            oleh sistem kami. Hindari menggunakan Probit di perangkat publik atau
            bersama.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "sharing",
    icon: <Globe className="w-5 h-5" />,
    title: "5. Berbagi Data dengan Pihak Ketiga",
    content: (
      <>
        <p className="mb-3">
          Kami <strong>tidak menjual</strong> data pribadi Anda. Data Anda hanya
          dapat dibagikan dalam kondisi terbatas berikut:
        </p>
        <ul className="space-y-2.5 text-sm">
          {[
            {
              label: "Penyedia Infrastruktur",
              desc: "Supabase (database &amp; storage), digunakan untuk menyimpan data profil dan gambar.",
            },
            {
              label: "Autentikasi Google",
              desc: "Jika Anda memilih login dengan Google, token OAuth diproses melalui Google OAuth 2.0.",
            },
            {
              label: "Kewajiban Hukum",
              desc: "Data dapat diungkapkan jika diwajibkan oleh hukum atau otoritas yang berwenang.",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 mt-2" />
              <div>
                <p className="font-bold text-slate-800">{item.label}</p>
                <p
                  className="text-xs text-slate-500 mt-0.5"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
              </div>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "rights",
    icon: <UserCheck className="w-5 h-5" />,
    title: "6. Hak-Hak Anda",
    content: (
      <>
        <p className="mb-4">
          Sebagai pengguna Probit, Anda memiliki hak-hak berikut terkait data
          pribadi Anda:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              icon: "👁️",
              title: "Hak Akses",
              desc: "Melihat data apa saja yang kami simpan tentang Anda.",
            },
            {
              icon: "✏️",
              title: "Hak Koreksi",
              desc: "Memperbarui atau memperbaiki data profil Anda yang tidak akurat.",
            },
            {
              icon: "🗑️",
              title: "Hak Penghapusan",
              desc: "Meminta penghapusan akun dan seluruh data terkait Anda.",
            },
            {
              icon: "📤",
              title: "Hak Portabilitas",
              desc: "Meminta salinan data Anda dalam format yang dapat dibaca.",
            },
            {
              icon: "🚫",
              title: "Hak Keberatan",
              desc: "Menolak pemrosesan data untuk tujuan tertentu seperti analitik.",
            },
            {
              icon: "🔕",
              title: "Hak Berhenti Langganan",
              desc: "Berhenti menerima email pemasaran kapan saja.",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex gap-3 items-start"
            >
              <span className="text-lg">{r.icon}</span>
              <div>
                <p className="text-xs font-black text-slate-800">{r.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Untuk menggunakan hak-hak ini, hubungi kami melalui halaman profil
          atau email di{" "}
          <a
            href="mailto:support@probit.id"
            className="text-emerald-600 font-semibold hover:underline"
          >
            support@probit.id
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "security",
    icon: <Lock className="w-5 h-5" />,
    title: "7. Keamanan Data",
    content: (
      <>
        <p className="mb-3">
          Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk
          melindungi data Anda, meliputi:
        </p>
        <ul className="space-y-2 text-sm">
          {[
            "Enkripsi password menggunakan algoritma bcrypt",
            "Autentikasi berbasis token JWT dengan masa berlaku terbatas",
            "Koneksi HTTPS terenkripsi untuk semua komunikasi data",
            "Sistem manajemen hak akses berbasis peran (RBAC)",
            "Penyimpanan file media di layanan cloud aman (Supabase Storage)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-[9px] font-black">
                  ✓
                </span>
              </div>
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Meskipun demikian, tidak ada sistem yang 100% aman. Kami mendorong
          Anda untuk menggunakan password yang kuat dan unik untuk akun Probit
          Anda.
        </p>
      </>
    ),
  },
  {
    id: "deletion",
    icon: <Trash2 className="w-5 h-5" />,
    title: "8. Retensi &amp; Penghapusan Data",
    content: (
      <>
        <p>
          Kami menyimpan data Anda selama akun Anda aktif atau selama diperlukan
          untuk menyediakan layanan. Jika Anda menghapus akun:
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            "Data profil (nama, email, foto) dihapus dalam 30 hari.",
            "Data kesehatan dan aktivitas dihapus secara permanen.",
            "Token di Local Storage dan Session Storage dihapus saat logout.",
            "Beberapa data dapat dipertahankan selama diperlukan oleh kewajiban hukum.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0 mt-2" />
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    icon: <RefreshCcw className="w-5 h-5" />,
    title: "9. Perubahan Kebijakan",
    content: (
      <p>
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
        Perubahan material akan diinformasikan melalui notifikasi dalam aplikasi
        atau email setidaknya <strong>7 hari sebelum</strong> berlaku efektif.
        Penggunaan Layanan setelah pembaruan berarti Anda menerima kebijakan
        yang direvisi. Selalu periksa tanggal pembaruan di bagian bawah halaman
        ini.
      </p>
    ),
  },
  {
    id: "contact",
    icon: <Mail className="w-5 h-5" />,
    title: "10. Hubungi Kami",
    content: (
      <>
        <p>
          Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait
          privasi dan data Anda, jangan ragu untuk menghubungi kami:
        </p>
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-sm font-bold text-slate-800">
            Tim Privasi Probit
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Email:{" "}
            <a
              href="mailto:privacy@probit.id"
              className="text-emerald-600 font-semibold hover:underline"
            >
              privacy@probit.id
            </a>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Jam operasional: Senin – Jumat, 09.00 – 17.00 WIB
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Kami berkomitmen merespons permintaan Anda dalam{" "}
            <strong>5 hari kerja</strong>.
          </p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (id) => setOpenSection(openSection === id ? null : id);

  return (
    <div
      className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md border border-slate-200/50 px-6 py-3.5 flex items-center justify-between max-w-7xl mx-auto rounded-2xl transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Probit Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
            Probit
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Beranda
        </Link>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-5">
            <Lock className="w-3.5 h-3.5" />
            Keamanan &amp; Privasi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Kebijakan <span className="text-emerald-500">Privasi</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Kami menjaga data kesehatan dan informasi pribadi Anda dengan serius.
            Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindunginya.
          </p>
          <div className="mt-6 inline-flex items-center gap-4 text-[11px] text-slate-400 font-medium">
            <span>
              Berlaku efektif:{" "}
              <strong className="text-slate-600">1 Juli 2025</strong>
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>
              Terakhir diperbarui:{" "}
              <strong className="text-slate-600">20 Juli 2026</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "🔒", label: "Data Dienkripsi", sub: "Password & token aman" },
            { icon: "🚫", label: "Tidak Dijual", sub: "Data bukan produk kami" },
            { icon: "🗑️", label: "Hapus Kapanpun", sub: "Kontrol penuh di tangan Anda" },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="text-2xl mb-1.5">{c.icon}</div>
              <p className="text-xs font-black text-slate-800">{c.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-20 space-y-3">
        {sections.map((s) => {
          const isOpen = openSection === s.id;
          return (
            <div
              key={s.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-emerald-300/70 bg-white shadow-[0_15px_30px_-10px_rgba(16,185,129,0.12)]"
                  : "border-slate-100 bg-white shadow-sm hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <button
                onClick={() => toggle(s.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isOpen
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`font-bold text-sm transition-colors ${isOpen ? "text-emerald-600" : "text-slate-800 group-hover:text-emerald-600"}`}
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                </div>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-emerald-500 text-white rotate-180"
                      : "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[900px] border-t border-emerald-100/80" : "max-h-0"}`}
              >
                <div className="px-6 py-5 text-sm text-slate-600 leading-relaxed">
                  {s.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Bottom */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <div className="bg-[#10b981] text-white rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 text-white/5 font-black text-[120px] select-none pointer-events-none">
            P
          </div>
          <Lock className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-xl font-black tracking-tight mb-2">
            Data Anda Aman Bersama Kami
          </h2>
          <p className="text-sm opacity-90 max-w-md mx-auto mb-6">
            Probit dirancang dengan prinsip privacy-by-design untuk melindungi
            informasi kesehatan pribadi Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/terms"
              className="bg-white text-emerald-600 font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition"
            >
              Baca Terms of Service
            </Link>
            <Link
              to="/register"
              className="bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-800 transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Footer mini */}
      <footer className="border-t border-slate-100 py-6 px-4 text-center text-[11px] text-slate-400">
        <span>© {new Date().getFullYear()} Probit Ecosystem. All rights reserved.</span>
        <span className="mx-3">·</span>
        <Link to="/terms" className="hover:text-emerald-600 transition">
          Terms of Service
        </Link>
        <span className="mx-3">·</span>
        <Link to="/privacy" className="hover:text-emerald-600 transition font-semibold text-emerald-500">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
