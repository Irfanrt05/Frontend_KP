import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  AlertCircle,
  Users,
  Lock,
  RefreshCcw,
  Mail,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    icon: <FileText className="w-5 h-5" />,
    title: "1. Penerimaan Syarat",
    content: (
      <>
        <p>
          Dengan mengakses atau menggunakan platform <strong>Probit</strong> (
          <em>"Layanan"</em>), Anda menyatakan bahwa Anda telah membaca,
          memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini.
        </p>
        <p className="mt-3">
          Jika Anda tidak menyetujui syarat-syarat ini, harap tidak menggunakan
          Layanan kami.
        </p>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 font-medium">
            <strong>Batas Usia:</strong> Layanan Probit hanya diperuntukkan bagi
            pengguna yang <strong>berusia 13 tahun ke atas</strong>. Dengan
            mendaftar, Anda mengonfirmasi bahwa Anda memenuhi persyaratan usia
            ini. Kami berhak menangguhkan akun yang terbukti melanggar ketentuan
            usia.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "account",
    icon: <Users className="w-5 h-5" />,
    title: "2. Akun Pengguna",
    content: (
      <>
        <p>
          Untuk mengakses fitur lengkap Probit, Anda perlu membuat akun dengan
          memberikan informasi yang akurat, lengkap, dan terkini.
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            "Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda.",
            "Anda bertanggung jawab atas seluruh aktivitas yang terjadi di bawah akun Anda.",
            "Segera beritahu kami jika Anda mencurigai adanya penggunaan akun tanpa izin.",
            "Dilarang membuat lebih dari satu akun untuk satu individu tanpa persetujuan tertulis.",
            "Akun tidak dapat dipindahtangankan kepada pihak lain.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 mt-2" />
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "data",
    icon: <Lock className="w-5 h-5" />,
    title: "3. Data Profil & Informasi Kesehatan",
    content: (
      <>
        <p>
          Dalam menggunakan Probit, Anda mempercayakan kepada kami data pribadi
          berikut:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Nama Lengkap", desc: "Identitas dasar akun Anda" },
            { label: "Alamat Email", desc: "Untuk autentikasi & notifikasi" },
            { label: "Foto Profil", desc: "Avatar yang ditampilkan di profil" },
            { label: "Pekerjaan", desc: "Personalisasi rekomendasi aktivitas" },
            {
              label: "Profil Kesehatan",
              desc: "Data berat, tinggi, target kesehatan, dll.",
            },
          ].map((d, i) => (
            <div
              key={i}
              className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3"
            >
              <p className="text-xs font-black text-emerald-700">{d.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{d.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Anda memberikan data ini secara sukarela. Data kesehatan Anda
          diperlakukan sebagai informasi sensitif dan hanya digunakan untuk
          memberikan rekomendasi dan layanan yang relevan di dalam platform.
        </p>
      </>
    ),
  },
  {
    id: "storage",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "4. Penyimpanan Data di Perangkat Anda",
    content: (
      <>
        <p>
          Probit menggunakan mekanisme penyimpanan browser untuk meningkatkan
          pengalaman pengguna:
        </p>
        <div className="mt-4 space-y-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Local Storage
              </span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Token autentikasi (JWT) untuk menjaga sesi login</li>
              <li>• Data profil pengguna (username, email, role)</li>
              <li>• Token akses Google OAuth (jika login menggunakan Google)</li>
              <li>• Preferensi pengguna (tema, pengaturan tampilan)</li>
            </ul>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              Data persisten — tetap tersimpan hingga Anda logout atau
              membersihkan data browser.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Session Storage
              </span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Data sesi sementara selama kunjungan aktif</li>
              <li>• Status form dan preferensi halaman yang sedang dikunjungi</li>
              <li>• Data navigasi dan konteks fitur sementara</li>
            </ul>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              Data sesi — otomatis dihapus saat Anda menutup tab atau jendela
              browser.
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Anda dapat menghapus data ini kapan saja melalui pengaturan browser
          Anda. Penghapusan data Local Storage akan mengakibatkan Anda perlu
          login ulang.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    icon: <AlertCircle className="w-5 h-5" />,
    title: "5. Ketentuan Penggunaan",
    content: (
      <>
        <p>Anda menyetujui untuk TIDAK menggunakan Layanan ini untuk:</p>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            "Menyebarkan informasi kesehatan yang tidak akurat, menyesatkan, atau berbahaya.",
            "Melakukan tindakan yang melanggar hukum yang berlaku di wilayah Anda.",
            "Mencoba mengakses akun pengguna lain tanpa izin.",
            "Mengunggah konten yang mengandung malware, virus, atau kode berbahaya.",
            "Melakukan scraping, crawling, atau pengambilan data massal tanpa izin tertulis.",
            "Menyalahgunakan atau memanipulasi data profil kesehatan pengguna lain.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-4 h-4 bg-red-50 border border-red-200 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              </span>
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "termination",
    icon: <RefreshCcw className="w-5 h-5" />,
    title: "6. Penghentian Layanan",
    content: (
      <>
        <p>
          Probit berhak untuk menangguhkan atau menghentikan akses Anda ke
          Layanan, dengan atau tanpa pemberitahuan sebelumnya, jika:
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {[
            "Anda melanggar Syarat dan Ketentuan ini.",
            "Aktivitas akun Anda dianggap berbahaya atau merugikan pengguna lain.",
            "Anda memberikan informasi palsu saat pendaftaran, termasuk usia.",
            "Terdapat permintaan dari penegak hukum atau otoritas yang berwenang.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 mt-2" />
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          Anda juga dapat menghapus akun Anda kapan saja melalui halaman
          pengaturan profil.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    icon: <RefreshCcw className="w-5 h-5" />,
    title: "7. Perubahan Syarat",
    content: (
      <p>
        Kami dapat memperbarui Syarat dan Ketentuan ini dari waktu ke waktu.
        Perubahan signifikan akan diberitahukan melalui email atau notifikasi
        dalam platform. Penggunaan Layanan yang berkelanjutan setelah perubahan
        tersebut merupakan penerimaan Anda atas syarat yang diperbarui. Tanggal
        revisi terakhir tercantum di bagian bawah halaman ini.
      </p>
    ),
  },
  {
    id: "contact",
    icon: <Mail className="w-5 h-5" />,
    title: "8. Hubungi Kami",
    content: (
      <>
        <p>
          Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan
          hubungi kami:
        </p>
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-sm font-bold text-slate-800">Tim Probit</p>
          <p className="text-xs text-slate-500 mt-1">
            Email:{" "}
            <a
              href="mailto:support@probit.id"
              className="text-emerald-600 font-semibold hover:underline"
            >
              support@probit.id
            </a>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Jam operasional: Senin – Jumat, 09.00 – 17.00 WIB
          </p>
        </div>
      </>
    ),
  },
];

export default function TermsOfService() {
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
            <FileText className="w-3.5 h-3.5" />
            Dokumen Hukum
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Syarat &amp; Ketentuan
            <span className="text-emerald-500"> Layanan</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Harap baca syarat-syarat ini dengan saksama sebelum menggunakan
            platform Probit. Syarat ini mengatur hubungan antara Anda dan kami.
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
                  >
                    {s.title}
                  </span>
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
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[800px] border-t border-emerald-100/80" : "max-h-0"}`}
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
          <ShieldCheck className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-xl font-black tracking-tight mb-2">
            Privasi Anda, Prioritas Kami
          </h2>
          <p className="text-sm opacity-90 max-w-md mx-auto mb-6">
            Kami berkomitmen untuk melindungi data kesehatan Anda dengan standar
            keamanan tertinggi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/privacy"
              className="bg-white text-emerald-600 font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition"
            >
              Baca Privacy Policy
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
        <Link to="/terms" className="hover:text-emerald-600 transition font-semibold text-emerald-500">
          Terms of Service
        </Link>
        <span className="mx-3">·</span>
        <Link to="/privacy" className="hover:text-emerald-600 transition">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
