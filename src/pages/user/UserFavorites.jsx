import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, Trash2, Heart, ChefHat, ExternalLink } from "lucide-react";
import { getFavorites, deleteFavorite } from "../../services/favoriteService";
import { resolveImageUrl } from "../../services/contentService";
import { stripText } from "../../utils/text";

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const fetchFavorites = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getFavorites();
      const data = (res.data?.data || []).filter(
        (f) => f.recipe_id && f.recipe,
      );
      setFavorites(data);
    } catch (err) {
      setError("Gagal memuat data. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const filteredFavorites = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return favorites;
    return favorites.filter((f) =>
      `${f.recipe?.title} ${f.recipe?.category}`.toLowerCase().includes(q),
    );
  }, [favorites, keyword]);

  const handleDeleteFavorite = async (e, id) => {
    e.preventDefault();
    if (!confirm("Hapus dari resep favorit?")) return;
    try {
      await deleteFavorite(id);
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      alert("Gagal menghapus.");
    }
  };

  return (
    <section className="pt-3 w-full animate-in fade-in duration-700">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-tr from-[#10BB89] to-[#059669] rounded-[2rem] p-8 md:p-12 mb-10 text-white shadow-2xl shadow-emerald-500/20">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Resep Favorit
          </h1>
          <p className="text-emerald-50 opacity-90 text-lg">
            Koleksi kuliner terbaik pilihanmu.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <ChefHat size={150} />
        </div>
      </div>

      {loading ? (
        <div className="h-[300px] flex flex-col items-center justify-center text-emerald-600">
          <Loader2 className="animate-spin mb-4" size={40} />
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <Heart size={40} className="text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Kosong</h3>
          <p className="text-slate-500 mt-2">
            Belum ada resep yang kamu simpan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFavorites.map((f) => (
            <Link
              key={f.id}
              to={`/dashboard/recipes/${f.recipe?.id}`}
              className="group relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5">
                <img
                  src={resolveImageUrl(f.recipe?.image_url)}
                  alt={f.recipe?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <button
                  onClick={(e) => handleDeleteFavorite(e, f.id)}
                  className="absolute top-3 right-3 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-slate-700 hover:text-red-600 hover:bg-red-50 transition-all shadow-lg z-10 hover:scale-110 active:scale-95"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="px-2 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-lg bg-[#10BB89]/10 text-[#10BB89] text-[11px] font-bold uppercase tracking-widest">
                    {f.recipe?.category || "Resep"}
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-slate-300 group-hover:text-[#10BB89] transition-colors"
                  />
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 mb-2 line-clamp-1 group-hover:text-[#10BB89] transition-colors">
                  {f.recipe?.title}
                </h3>

                <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed mb-5">
                  {stripText(f.recipe?.details || "")}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center text-slate-400 text-[11px] font-semibold">
                    <ChefHat size={14} className="mr-1.5" />
                    Lihat Resep
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
