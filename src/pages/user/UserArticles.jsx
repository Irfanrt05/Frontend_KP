import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  FileText,
  Calendar,
  Heart,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { getPublicBlogs, resolveImageUrl } from "../../services/contentService";
import { formatDateIndonesia } from "../../utils/dateTime";
import { stripText } from "../../utils/text";

export default function UserArticles() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getPublicBlogs();
        setBlogs(res.data.data || res.data.blogs || []);
      } catch (err) {
        console.error("Gagal mengambil artikel user:", err);
        setError("Artikel belum bisa dimuat. Pastikan koneksi aman.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((blog) =>
      `${blog.title || ""} ${blog.category || ""} ${blog.content || ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [blogs, keyword]);

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const gridBlogs = useMemo(() => {
    return filteredBlogs.slice(0, 12);
  }, [filteredBlogs]);

  return (
    <section className="w-full min-h-screen bg-slate-50/50 pb-24 antialiased selection:bg-[#10BB89]/20 selection:text-[#10BB89]">
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#10BB89]/12 via-[#10BB89]/3 to-transparent pt-24 pb-20 px-4">
        <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4 w-[650px] h-[650px] bg-[#10BB89]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 -z-10 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-white text-[#10BB89] shadow-md shadow-emerald-900/5 border border-slate-100 mb-8">
            <Sparkles size={14} className="text-[#10BB89]" /> Edukasi Medis &
            Gaya Hidup
          </span>

          {/* leading-[1.3] membuat baris teks judul sedikit lebih renggang */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.3] mb-8 max-w-3xl">
            Ruang Baca &{" "}
            <span className="relative inline-block bg-[#10BB89] text-white px-6 py-2 rounded-2xl transform -rotate-1 shadow-xl shadow-[#10BB89]/20 font-black tracking-wide">
              Kabar Kesehatan
            </span>
          </h1>

          <p className="max-w-2xl text-slate-600/90 text-base sm:text-lg leading-relaxed font-medium tracking-wide">
            Dapatkan wawasan kesehatan mendalam dari para ahli medis demi
            menjaga kualitas hidup Anda dan keluarga tercinta.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {loading ? (
          <SkeletonLoading />
        ) : error ? (
          <div className="bg-white rounded-3xl border border-red-100 p-8 text-center max-w-xl mx-auto shadow-sm">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={32} />
            <p className="text-red-600 font-bold tracking-wide">{error}</p>
          </div>
        ) : gridBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 max-w-xl mx-auto shadow-sm">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-800 tracking-wide">
              Belum Ada Artikel yang Diterbitkan
            </h3>
          </div>
        ) : (
          /* 2. PREMIUM MEDIUM-LARGE GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridBlogs.map((blog) => (
              <Link
                to={`/dashboard/articles/${blog.id}`}
                key={blog.id}
                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#10BB89]/40 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                {/* Media Image Section */}
                <div className="relative aspect-[16/9.5] overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={resolveImageUrl(blog.image_url)}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-70" />

                  {/* Tombol Favorit */}
                  <button
                    onClick={(e) => toggleFavorite(e, blog.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-300 z-10"
                  >
                    <Heart
                      size={18}
                      fill={favorites[blog.id] ? "#ef4444" : "none"}
                      className={favorites[blog.id] ? "text-red-500" : ""}
                    />
                  </button>

                  {/* Badge Lapisan Atas Gambar */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="bg-white/80 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.15em] text-[#10BB89] px-3.5 py-1.5 rounded-xl shadow-sm border border-white/40 flex items-center gap-2">
                      <FileText size={12} /> {blog.category || "Kesehatan"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 bg-white">
                  {/* General Info Tag */}
                  <div className="inline-flex items-center w-max px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-3">
                    Informasi Umum
                  </div>

                  {/* Judul Artikel dengan Jarak Baris Lebih Rapat */}
                  <h3 className="text-xl font-extrabold text-slate-800 leading-snug mb-3 group-hover:text-[#10BB89] transition-colors duration-300 tracking-wide line-clamp-2 min-h-[56px]">
                    {blog.title}
                  </h3>

                  {/* Deskripsi Singkat */}
                  <p className="text-slate-500/95 text-sm leading-relaxed mb-6 tracking-wide font-medium line-clamp-2">
                    {stripText(blog.content)}
                  </p>

                  {/* Footer Card */}
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 tracking-wide">
                      <Calendar size={14} />
                      {formatDateIndonesia(blog.published_at || blog.createdAt)}
                    </div>

                    {/* Action Circle Arrow */}
                    <div className="w-9 h-9 rounded-xl bg-slate-50 text-[#10BB89] group-hover:bg-[#10BB89] group-hover:text-white group-hover:scale-105 shadow-sm flex items-center justify-center transition-all duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

{
  /* Skeleton Loader Versi Besar Sesuai Grid */
}
function SkeletonLoading() {
  return (
    <div className="w-full animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden flex flex-col h-[420px]"
          >
            <div className="bg-slate-200 w-full h-[220px]" />
            <div className="p-6 flex-1 space-y-4">
              <div className="h-3 bg-slate-200 rounded w-1/4" />
              <div className="h-6 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-3 bg-slate-200 rounded w-1/2 pt-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
