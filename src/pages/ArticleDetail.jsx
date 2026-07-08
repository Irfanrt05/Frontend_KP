import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import {
  Search,
  Bell,
  LogIn,
  UserPlus,
  X,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- STATE INTEGRASI ADMIN/API ---
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- STATE LIVE SEARCH ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // --- STATE INTERAKTIF LAINNYA ---
  const [showNotification, setShowNotification] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const notifRef = useRef(null);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Pastikan URL-nya sudah benar sesuai backend
        const response = await api.get(`/blogs/${id}`);

        // Berdasarkan kode controller Anda, data dibungkus dalam properti 'data'
        setArticle(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);
  const searchRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlogDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/blogs/${id}`);
        // Pastikan struktur response.data.data sesuai dengan isi DB Anda
        setArticle(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil detail blog:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  // Efek logika Live Search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = articles.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filtered);
  }, [searchQuery, articles]);

  // Efek klik di luar komponen untuk menutup dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotification(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <h2 className="text-sm font-bold mb-4">Artikel tidak ditemukan</h2>
        {/* Diubah ke /blog atau halaman utama blog kamu */}
        <Link
          to="/blog"
          className="text-[#10b981] font-bold flex items-center gap-2 text-xs"
        >
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#0f172a] font-sans antialiased flex flex-col justify-between relative">
      {/* --- NAVBAR SECTION --- */}
      <nav className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between sticky top-0 z-50 h-16 shadow-sm shadow-slate-100/40">
        {/* Sisi Kiri: Logo Asli */}
        <div className="flex items-center gap-2.5 z-10 select-none cursor-default">
          <img
            src="/logo.png"
            alt="Probit Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="text-base font-black tracking-tight text-slate-900">
            Probit
          </span>
        </div>

        {/* Sisi Tengah: Fungsional Live Search Bar */}
        <div
          className="absolute left-1/2 -translate-x-1/2 max-w-sm w-full hidden md:block"
          ref={searchRef}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Cari artikel kesehatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-lg pl-4 pr-10 py-1.5 text-xs focus:outline-none focus:border-[#10b981] focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Dropdown Live Hasil Pencarian */}
          {showSearchDropdown && searchQuery && (
            <div className="absolute left-0 mt-2 w-full bg-white border border-slate-200 shadow-xl rounded-xl py-2 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {searchResults.length > 0 ? (
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        // FIX: Diubah ke /blog/:id agar sesuai dengan rute aslimu
                        navigate(`/blog/${item.id}`);
                        setShowSearchDropdown(false);
                      }}
                      className="p-3 hover:bg-slate-50 transition cursor-pointer flex items-start gap-2.5 text-left"
                    >
                      <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-normal">
                          {item.title}
                        </p>
                        <p className="text-[9px] text-[#10b981] font-medium mt-0.5">
                          Blog Kesehatan
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-slate-400 text-[11px] flex flex-col items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-slate-300" />
                  <span>Artikel tidak ditemukan</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sisi Kanan: Navigasi Aktif */}
        <div className="flex items-center gap-6 z-10">
          <Link
            to="/"
            className="text-xs font-bold text-slate-500 hover:text-[#10b981] transition-colors duration-200"
          >
            Home
          </Link>

          {/* Lonceng Notifikasi */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotification(!showNotification)}
              className={`hover:text-[#10b981] relative transition-colors duration-200 p-1 rounded-full hover:bg-slate-50 ${showNotification ? "text-[#10b981]" : "text-slate-400"}`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#10b981] rounded-full border-2 border-white animate-pulse" />
            </button>

            {/* Dropdown Notifikasi */}
            {showNotification && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 shadow-xl rounded-xl py-3 text-left overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                    Notifikasi
                  </h4>
                  <span className="text-[10px] bg-emerald-50 text-[#10b981] px-2 py-0.5 rounded-full font-bold">
                    Baru
                  </span>
                </div>
                <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                  <div className="p-3.5 hover:bg-slate-50 transition cursor-pointer flex gap-3">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 leading-normal">
                        Pencatatan Rekam Medis Berhasil
                      </p>
                      <p className="text-[9px] text-slate-400 mt-0.5">
                        Data cek kesehatan gratis Anda telah disinkronkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Avatar User */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="focus:outline-none transition-transform active:scale-95 duration-100"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="User Avatar"
              className="w-7 h-7 rounded-full object-cover border-2 border-transparent hover:border-[#10b981] transition-all cursor-pointer"
            />
          </button>
        </div>
      </nav>

      {/* --- KONTEN UTAMA ARTIKEL --- */}
      <main className="max-w-3xl mx-auto px-6 py-10 flex-1 w-full bg-white my-6 shadow-sm rounded-lg sm:px-12">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-2">
          {article.title}
        </h1>
        <p className="text-[10px] font-bold text-slate-400 mb-6">
          {new Date(article.published_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="w-full rounded-lg overflow-hidden mb-8 aspect-[16/9] bg-slate-100 shadow-sm">
          <img
            // GANTI BAGIAN INI:
            src={
              article.image_url
                ? article.image_url.startsWith("http")
                  ? article.image_url
                  : `https://dczckwmdqqxgvhtruyok.supabase.co/storage/v1/object/public/[NAMA_BUCKET]/${article.image_url}`
                : "https://via.placeholder.com/800x450?text=No+Image"
            }
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/800x450?text=No+Image";
            }}
          />
        </div>

        <div className="text-xs text-slate-700 leading-relaxed space-y-5 whitespace-pre-line font-normal tracking-wide">
          {article.content}
        </div>
      </main>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-[#10b981] text-white pt-12 pb-6 px-8 text-[11px]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/logo.png"
                alt="Probit Logo White"
                className="w-5 h-5 object-contain brightness-0 invert"
              />
              <span className="text-sm font-black tracking-tight">Probit</span>
            </div>
            <p className="opacity-80 max-w-xs leading-relaxed text-[10px]">
              Platform ekosistem kesehatan digital terbaik untuk menjaga
              keselarasan produktivitas harian dan kebugaran tubuh Anda.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:underline opacity-90">
              Home
            </Link>
            <Link to="/health-plan" className="hover:underline opacity-90">
              Health Plan
            </Link>
            <Link to="/recipes" className="hover:underline opacity-90">
              Resep makanan
            </Link>
            <Link to="/blog" className="hover:underline opacity-90">
              Blog
            </Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-4 border-t border-white/20 text-[9px] opacity-70">
          <span>
            © {new Date().getFullYear()} Probit Ecosystem. All rights reserved.
          </span>
        </div>
      </footer>

      {/* --- INTERACTIVE GATE MODAL --- */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-center transform animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-sm font-black text-slate-900 mb-1">
              Akses Terbatas
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed px-4 mb-6">
              Anda belum masuk ke sistem dashboard PROBIT. Silakan melakukan
              pendaftaran akun baru atau login terlebih dahulu.
            </p>
            <div className="space-y-2.5">
              <Link
                to="/register"
                className="w-full bg-[#10b981] text-white font-black text-xs py-2.5 rounded-xl hover:bg-[#059669] shadow-md shadow-emerald-500/10 transition flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Daftar Akun Baru
              </Link>
              <Link
                to="/login"
                className="w-full bg-slate-100 text-slate-700 font-bold text-xs py-2.5 rounded-xl hover:bg-slate-200 transition flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Masuk ke Akun
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
