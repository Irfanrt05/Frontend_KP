import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import {
  getPublicBlogById,
  resolveImageUrl,
} from "../../services/contentService";
import { logArticleVisit } from "../../services/visitService";
import { formatDateIndonesia } from "../../utils/dateTime";

export default function UserArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const detailRes = await getPublicBlogById(id);
        setArticle(
          detailRes.data.data || detailRes.data.blog || detailRes.data,
        );
        logArticleVisit(id).catch(() => null);
      } catch (err) {
        console.error("Gagal mengambil detail artikel:", err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const calculateReadTime = (text) => {
    if (!text) return "1 menit";
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} menit`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Mengubah teks mentah atau teks HTML bermasalah menjadi struktur paragraf
   * yang mempertahankan enter (\n atau \r\n) dengan jarak spasi yang lebar.
   */
  const formatArticleContent = (content) => {
    if (!content) return "";

    // Jika konten sudah mengandung struktur HTML kompleks, biarkan aslinya
    if (content.includes("<p>") || content.includes("<br")) {
      return content;
    }

    // 1. Standarisasi baris baru (mengubah format Windows \r\n menjadi \n)
    const normalizedContent = content.replace(/\r\n/g, "\n");

    // 2. Pecah paragraf berdasarkan double enter atau lebih, bersihkan sisa spasi
    return normalizedContent
      .split(/\n{2,}/)
      .map((paragraph) => {
        const trimmedParagraph = paragraph.trim();
        if (!trimmedParagraph) return "";

        // Ubah single enter yang tersisa di dalam paragraf menjadi baris baru (<br />)
        const cleanText = trimmedParagraph.replace(/\n/g, "<br />");

        // Bungkus menggunakan div dengan margin bawah (mb-8) eksplisit agar tidak dirapatkan oleh Tailwind prose
        return `<div class="mb-8 leading-[1.9] text-slate-800 tracking-normal text-justify sm:text-left">${cleanText}</div>`;
      })
      .filter(Boolean) // Membuang bagian kosong
      .join("");
  };

  // Loader dengan gaya Glassmorphism Shimmer
  if (loading) {
    return (
      <section className="pt-12 pb-24 max-w-[900px] mx-auto px-4 animate-pulse">
        <div className="h-4 w-64 bg-slate-200/60 rounded-md mb-8"></div>
        <div className="h-6 w-24 bg-slate-200/60 rounded-full mb-6"></div>
        <div className="h-12 w-full bg-slate-200/60 rounded-xl mb-4"></div>
        <div className="h-12 w-3/4 bg-slate-200/60 rounded-xl mb-8"></div>
        <div className="h-20 w-full bg-slate-200/40 rounded-2xl mb-8"></div>
        <div className="w-full h-[440px] bg-slate-200/60 rounded-[32px] mb-8"></div>
      </section>
    );
  }

  if (!article) {
    return (
      <div className="max-w-md mx-auto my-24 bg-white/70 backdrop-blur-xl rounded-[32px] p-10 text-center shadow-xl border border-white/40">
        <h1 className="text-2xl font-black text-slate-800 mb-3">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Maaf, artikel mungkin telah diarsipkan atau dipindahkan oleh admin.
        </p>
        <Link
          to="/dashboard/articles"
          className="inline-flex justify-center items-center px-6 py-3 bg-[#10BB89] hover:bg-[#0da67a] text-white font-bold rounded-xl shadow-lg shadow-[#10BB89]/20 transition-all text-sm"
        >
          Kembali ke Jelajah Artikel
        </Link>
      </div>
    );
  }

  return (
    // Latar belakang dekoratif (Blob gradasi) untuk memperkuat efek Glassmorphism
    <div className="relative min-h-screen overflow-hidden px-4 pt-4 pb-24">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#10BB89]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <section className="max-w-[900px] mx-auto relative z-10">
        {/* Atas: Navigasi & Breadcrumbs Kombinasi */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#10BB89] font-semibold transition-all text-sm group bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-sm"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Kembali
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
            <Link
              to="/dashboard"
              className="hover:text-slate-600 transition-colors"
            >
              Dashboard
            </Link>
            <ChevronRight size={12} />
            <Link
              to="/dashboard/articles"
              className="hover:text-slate-600 transition-colors"
            >
              Artikel
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-600 max-w-[150px] truncate">
              {article.title}
            </span>
          </nav>
        </div>

        {/* CARD UTAMA: Full Glassmorphism Premium */}
        <article className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 md:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.03)] border border-white/80">
          {/* Tag Kategori Atas */}
          <span className="inline-block text-[11px] font-extrabold tracking-widest text-[#10BB89] mb-6 uppercase bg-[#10BB89]/10 px-4 py-1.5 rounded-full border border-[#10BB89]/20">
            {article.category || "Inovasi"}
          </span>

          {/* Judul Artikel Magnifikan */}
          <h1 className="text-2xl md:text-[42px] leading-[1.15] font-black text-slate-900 mb-6 tracking-tight">
            {article.title}
          </h1>

          {/* Bar Metadata & Action Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/50 pb-6 mb-8 text-xs md:text-sm text-slate-500">
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#10BB89]/10 flex items-center justify-center">
                  <User size={13} className="text-[#10BB89]" />
                </div>
                <span className="font-semibold text-slate-800">
                  {article.author || "Tim Analis"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                <span>
                  {formatDateIndonesia(
                    article.published_at || article.createdAt,
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                <span>{calculateReadTime(article.content)} baca</span>
              </div>
            </div>

            {/* Tombol Interaksi Kanan */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-xl border transition-all ${
                  isBookmarked
                    ? "bg-amber-50 border-amber-200 text-amber-500"
                    : "bg-white/80 hover:bg-slate-50 border-slate-200/60 text-slate-400 hover:text-slate-600"
                }`}
              >
                <Bookmark
                  size={16}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#10BB89] hover:bg-[#0da67a] text-white rounded-xl transition-all font-bold text-xs shadow-md shadow-[#10BB89]/10"
              >
                {copied ? (
                  <>
                    <Check size={14} /> Tersalin
                  </>
                ) : (
                  <>
                    <Share2 size={14} /> Bagikan
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hero Image dengan Kontainer Bingkai Floating */}
          <div className="overflow-hidden rounded-[24px] mb-10 shadow-[0_16px_40px_rgba(0,0,0,0.04)] border border-white/60 p-1.5 bg-white/40 backdrop-blur-sm">
            <img
              src={resolveImageUrl(article.image_url)}
              alt={article.title}
              className="w-full max-h-[460px] object-cover rounded-[18px] bg-slate-100 hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
          </div>

          {/* Isi Konten Utama dengan Penanganan Paragraf Enter Eksplisit */}
          <div
            className="prose prose-slate max-w-none text-slate-800 text-[16px] md:text-[18px] selection:bg-[#10BB89]/20 tracking-normal font-normal
              prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
              prose-strong:font-bold prose-strong:text-slate-900
              prose-a:text-[#10BB89] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{
              __html: formatArticleContent(article.content),
            }}
          />

          {/* Tambahan: Glassmorphism Footer Author Card */}
          <div className="mt-14 pt-8 border-t border-slate-200/50 flex items-center gap-4 bg-slate-50/50 backdrop-blur-sm p-5 rounded-2xl border border-white/60">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#10BB89] to-emerald-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#10BB89]/20">
              {(article.author || "T").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Diterbitkan Oleh
              </p>
              <h4 className="text-sm font-bold text-slate-800">
                {article.author || "Tim Redaksi Utama"}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Spesialis Konten & Edukasi Platform
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
