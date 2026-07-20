import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  FileText,
  Calendar,
  CheckSquare,
  Heart,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import api from "../services/api";

export default function LandingPage() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/blogs");
        setArticles(response.data.data || []);
      } catch (error) {
        console.error("Gagal ambil data:", error);
        setArticles([]);
      }
    };

    fetchData();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Data Dummy untuk FAQ
  const faqs = [
    {
      q: "Apa itu platform PROBIT dan bagaimana cara kerjanya?",
      a: "PROBIT adalah platform manajemen kesehatan digital yang membantu Anda mencatat rencana aktivitas, mengotomatisasi penjadwalan harian, dan melacak nutrisi harian demi mencapai keseimbangan hidup optimal.",
    },
    {
      q: "Apakah data rencana aktivitas dan kesehatan saya di PROBIT aman?",
      a: "Tentu saja. PROBIT diarsiteki dengan fokus keamanan tinggi, mengimplementasikan sistem manajemen hak akses yang ketat (RBAC) serta enkripsi end-to-end untuk melindungi privasi data medis Anda.",
    },
    {
      q: "Bagaimana cara menyusun jadwal otomatis di fitur utama?",
      a: "Anda cukup memasukkan target minggu atau harian Anda pada menu dashboard, dan sistem AI pintar kami akan menyusun rekomendasi alokasi waktu terbaik agar produktivitas Anda tetap terjaga tanpa kelelahan.",
    },
    {
      q: "Apakah artikel dan resep makanan di platform ini diverifikasi oleh ahli?",
      a: "Ya, seluruh artikel kesehatan, tips olahraga, dan panduan resep nutrisi yang dipublikasikan di PROBIT dikurasi dan ditinjau secara berkala oleh ahli gizi dan tenaga medis mitra kami.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans antialiased">
      {/* 1. NAVBAR SECTION */}
      <nav className="fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md border border-slate-200/50 px-6 py-3.5 flex items-center justify-between max-w-7xl mx-auto rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Probit Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-black tracking-tight text-slate-900">
            Probit
          </span>

          {/* Menu Links dengan Smooth Scroll */}
          <div className="hidden md:flex items-center gap-6 ml-10 text-xs font-bold text-slate-500">
            <a
              href="#produk"
              onClick={(e) => handleScroll(e, "produk")}
              className="hover:text-[#10b981] transition"
            >
              Produk
            </a>
            <a
              href="#fitur"
              onClick={(e) => handleScroll(e, "fitur")}
              className="hover:text-[#10b981] transition"
            >
              Fitur Utama
            </a>
            <a
              href="#blog"
              onClick={(e) => handleScroll(e, "blog")}
              className="hover:text-[#10b981] transition"
            >
              Blog
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScroll(e, "faq")}
              className="hover:text-[#10b981] transition"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <Link
            to="/login"
            className="text-slate-600 hover:text-[#10b981] transition px-3 py-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#10b981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl shadow-md shadow-emerald-500/10 transition transform active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="pt-32 px-4 md:px-8 max-w-7xl mx-auto mb-16">
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 items-center min-h-[460px]">
          <div className="p-8 md:p-16 flex flex-col justify-center items-start z-10 bg-gradient-to-r from-white via-white to-transparent">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#10b981] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
              <Activity className="w-3 h-3" /> Ekosistem Kesehatan Digital
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-[1.15] text-slate-900">
              Kesehatamu hari ini <br />
              adalah <span className="text-[#10b981]">investasimu</span> <br />
              di masa depan.
            </h1>
            <p className="text-xs md:text-sm font-medium mt-4 text-slate-500 max-w-md leading-relaxed">
              Buat pola hidup sehatmu menjadi lebih terukur, teratur, dan
              seimbang bersama ekosistem cerdas Probit.
            </p>
            <Link
              to="/register"
              className="mt-8 bg-[#10b981] text-white font-extrabold text-xs px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-[#059669] transition transform active:scale-95 flex items-center gap-2 group"
            >
              Buat Sekarang
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative w-full h-64 md:h-full min-h-[300px] overflow-hidden bg-slate-50">
            <img
              src="/bg_jeruk.png"
              alt="Fresh healthy fruits"
              className="w-full h-full object-cover md:object-center select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden md:block" />
          </div>
        </div>
      </header>

      {/* 3. SECTION 3 LANGKAH PRODUKTIF */}
      <section className="px-4 max-w-7xl mx-auto text-center mb-24" id="produk">
        <h3 className="text-xs font-black uppercase tracking-widest text-[#10b981] mb-2">
          Workflow Alami
        </h3>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-12 uppercase tracking-tight">
          BUAT PRODUKTIVITASMU DENGAN 3 LANGKAH
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start justify-center text-left aspect-square hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-50 text-[#10b981] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#10b981] group-hover:text-white transition-colors duration-300">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-3">
              Catat Rencanamu
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tulis seluruh aktivitas harian yang ingin kamu eksekusi agar tidak
              ada satu pun komitmen yang terlewatkan.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start justify-center text-left aspect-square hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-50 text-[#10b981] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#10b981] group-hover:text-white transition-colors duration-300">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-3">
              Kami Atur Penjadwalan
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sistem pintar Probit akan menyusun alokasi waktu optimal secara
              otomatis demi menjaga ritme energi tubuh Anda.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start justify-center text-left aspect-square hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-12 h-12 bg-[#10b981] text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-emerald-500/10 group-hover:bg-[#059669] transition-colors duration-300">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-3">
              Siap Produktif !
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rencana terstruktur membuat fokus meningkat tajam, sehingga Anda
              bisa beraktivitas tanpa khawatir kelelahan fisik.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECTION FITUR UTAMA */}
      <section className="px-4 max-w-5xl mx-auto text-center mb-24" id="fitur">
        <h3 className="text-xs font-black uppercase tracking-widest text-[#10b981] mb-2">
          Eksplorasi Fitur
        </h3>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-12 uppercase tracking-tight">
          FITUR UTAMA DASHBOARD
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between min-h-[400px] md:h-[430px] hover:shadow-md transition-all duration-300">
            <div className="p-6 bg-gradient-to-b from-slate-50 to-white flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-xs font-extrabold text-slate-700 tracking-wide uppercase">
                  Mei 2026
                </span>
                <div className="flex gap-2 text-[10px] font-bold text-slate-400">
                  <span className="cursor-pointer hover:text-slate-600">
                    &lt;
                  </span>
                  <span className="cursor-pointer hover:text-slate-600">
                    &gt;
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-400 border-b border-slate-100 pb-2 mb-2">
                <span>S</span>
                <span>S</span>
                <span>R</span>
                <span>K</span>
                <span>J</span>
                <span className="text-emerald-500">S</span>
                <span className="text-emerald-500">M</span>
              </div>

              <div className="grid grid-cols-7 gap-y-2 gap-x-2 text-center text-xs font-bold text-slate-400 items-center flex-1 py-1">
                <span className="text-slate-300">27</span>
                <span className="text-slate-300">28</span>
                <span className="text-slate-300">29</span>
                <span className="text-slate-300">30</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span className="relative flex items-center justify-center">
                  <span className="w-7 h-7 bg-emerald-50 text-[#10b981] border border-emerald-200 rounded-full flex items-center justify-center font-black">
                    11
                  </span>
                  <span className="absolute -top-2 -right-1 text-[10px]">
                    📌
                  </span>
                </span>
                <span className="text-slate-800">12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
                <span>16</span>
                <span className="relative flex items-center justify-center">
                  <span className="w-7 h-7 bg-emerald-50 text-[#10b981] border border-emerald-200 rounded-full flex items-center justify-center font-black">
                    17
                  </span>
                  <span className="absolute -top-2 -right-1 text-[10px]">
                    📌
                  </span>
                </span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>24</span>
                <span>25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
                <span>29</span>
                <span className="relative flex items-center justify-center">
                  <span className="w-7 h-7 bg-emerald-50 text-[#10b981] border border-emerald-200 rounded-full flex items-center justify-center font-black">
                    30
                  </span>
                  <span className="absolute -top-2 -right-1 text-[10px]">
                    📌
                  </span>
                </span>
                <span>31</span>
              </div>
            </div>
            <button className="w-full bg-[#10b981] text-white p-4 flex items-center justify-between font-extrabold text-sm px-8 hover:bg-[#059669] transition shadow-md">
              <span>Buat Rencana Terjadwal</span>
              <ArrowRight className="w-5 h-5 border-2 border-white rounded-full p-0.5" />
            </button>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between min-h-[400px] md:h-[430px] hover:shadow-md transition-all duration-300">
            <div className="flex-1 overflow-hidden h-full bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80"
                alt="Running shoes session"
                className="w-full h-full object-cover hover:scale-102 transition duration-500"
              />
            </div>
            <button className="w-full bg-white text-slate-800 p-4 flex items-center justify-between font-extrabold text-sm px-8 border-t border-slate-100 hover:bg-slate-50 transition">
              <span>Susun Kegiatan Sekarang !</span>
              <ArrowRight className="w-5 h-5 text-[#10b981] border-2 border-[#10b981] rounded-full p-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SECTION MENGAPA HARUS PROBIT */}
      <section className="bg-[#10b981] text-white py-20 px-6 md:px-16 mb-24 rounded-[40px] max-w-7xl mx-auto shadow-sm relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-52 h-52 bg-slate-100 rounded-3xl overflow-hidden shadow-md border-4 border-white/20 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
              alt="Professional health expert"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-black mb-6 tracking-tight uppercase">
              Mengapa Harus Probit?
            </h3>
            <div className="grid grid-cols-1 gap-6 text-xs md:text-sm font-medium opacity-95">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <p>
                  <strong>Dashboard Terstruktur:</strong> Didesain khusus untuk
                  melacak seluruh metrik aktivitas fisik secara real-time.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <p>
                  <strong>Rekomendasi Terverifikasi:</strong> Katalog resep
                  sehat yang dikurasi berkala mengikuti standar medis.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p>
                  <strong>Privasi & Keamanan:</strong> Dilengkapi manajemen hak
                  akses berbasis peran (RBAC) ketat.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 text-white/5 font-black text-[200px] select-none pointer-events-none">
          P
        </div>
      </section>

      {/* 6. SECTION ARTIKEL TERBARU */}
      <section className="px-4 max-w-7xl mx-auto mb-24" id="blog">
        <h3 className="text-center text-xs font-black uppercase tracking-widest text-[#10b981] mb-2">
          Edukasi & Tips
        </h3>
        <h2 className="text-center text-xl md:text-2xl font-black text-slate-900 mb-12 uppercase tracking-tight">
          ARTIKEL TERBARU !
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.length === 0 ? (
            <div className="col-span-3 text-center text-slate-500">
              Belum ada artikel tersedia.
            </div>
          ) : (
            articles.map((item) => {
              const PROJECT_ID = "dczckwmdqqxgvhtruyok";
              const BUCKET_NAME = "blogs";

              const getImageUrl = (url) => {
                if (!url)
                  return "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80";
                if (url.startsWith("http")) return url;
                return `https://dczckwmdqqxgvhtruyok.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${url}`;
              };

              return (
                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.12)] hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="h-44 overflow-hidden bg-slate-50 relative">
                    <img
                      src={getImageUrl(item.image_url)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <span className="absolute top-3 left-3 bg-[#10b981] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                      Artikel
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">
                        {item.published_at
                          ? new Date(item.published_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )
                          : "-"}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-[#10b981] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 mb-4">
                        {item.content?.substring(0, 120)}...
                      </p>
                    </div>
                    <div>
                      <hr className="border-slate-100 mb-3" />
                      <span className="text-[11px] font-extrabold text-[#10b981] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Baca Selengkapnya <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      {/* 7. SECTION FAQ ACCORDION */}
      <section className="px-4 max-w-3xl mx-auto mb-28 relative" id="faq">
        <div className="absolute -top-10 -left-20 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none select-none z-0" />
        <div className="absolute -bottom-10 -right-20 w-60 h-60 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none select-none z-0" />

        <h2 className="text-center text-xl md:text-2xl font-black text-slate-900 mb-12 uppercase tracking-tight relative z-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 relative z-10">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`w-full rounded-2xl overflow-hidden border transition-all duration-300 transform hover:-translate-y-0.5
                  ${isOpen
                    ? "bg-emerald-50/40 border-emerald-300/70 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.15)]"
                    : "bg-white border-emerald-100 shadow-sm shadow-emerald-950/5 hover:border-emerald-300 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)]"
                  }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left transition-colors duration-200 group"
                >
                  <span
                    className={`font-bold text-xs tracking-wide transition-colors duration-200 ${isOpen ? "text-[#10b981]" : "text-slate-800 group-hover:text-[#10b981]"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? "bg-[#10b981] text-white rotate-180 shadow-sm shadow-emerald-500/20" : "bg-emerald-50 text-[#10b981] group-hover:bg-[#10b981] group-hover:text-white"}`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 border-t border-emerald-100/80" : "max-h-0"}`}
                >
                  <p className="p-6 text-xs text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer className="bg-[#10b981] text-white pt-16 pb-6 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-12 text-xs">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-black tracking-tight">Probit</span>
            </div>
            <p className="opacity-80 leading-relaxed">
              Platform ekosistem kesehatan digital terbaik untuk menjaga
              keselarasan produktivitas harian dan kebugaran tubuh Anda.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-medium">
            <a
              href="#produk"
              onClick={(e) => handleScroll(e, "produk")}
              className="hover:underline opacity-90"
            >
              Home
            </a>
            <Link to="/health-plan" className="hover:underline opacity-90">
              Health Plan
            </Link>
            <Link to="/recipes" className="hover:underline opacity-90">
              Resep Makanan
            </Link>
            <a
              href="#blog"
              onClick={(e) => handleScroll(e, "blog")}
              className="hover:underline opacity-90"
            >
              Blog
            </a>
          </div>

          <div className="flex flex-col gap-2 font-medium">
            <span className="font-bold opacity-100 text-slate-100 mb-1">
              Company
            </span>
            <Link to="/about" className="hover:underline opacity-90">
              About
            </Link>
            <Link to="/contact" className="hover:underline opacity-90">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-[10px] opacity-75">
          <span>
            &copy; {new Date().getFullYear()} Probit Ecosystem. All rights
            reserved.
          </span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
