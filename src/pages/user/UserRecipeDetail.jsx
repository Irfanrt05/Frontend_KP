import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  Flame,
  Heart,
  Loader2,
  Info,
  BookOpen,
  Layers,
} from "lucide-react";
import {
  getPublicRecipeById,
  resolveImageUrl,
} from "../../services/contentService";
import { addFavoriteRecipe } from "../../services/favoriteService";
import { logRecipeVisit } from "../../services/visitService";

export default function UserRecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const detailRes = await getPublicRecipeById(id);
        setRecipe(
          detailRes.data.data || detailRes.data.recipe || detailRes.data,
        );
        logRecipeVisit(id).catch(() => null);
      } catch (err) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="h-[400px] flex items-center justify-center text-[#10BB89]">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );

  if (!recipe)
    return (
      <div className="text-center p-10 font-bold text-slate-500">
        Resep tidak ditemukan.
      </div>
    );

  return (
    <section className="pt-2 max-w-[1100px] mx-auto pb-20 px-4">
      {/* TOMBOL BACK SOLID */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 hover:border-[#10BB89] hover:text-[#10BB89] text-slate-600 font-bold transition-all text-sm"
      >
        <ArrowLeft size={18} /> Kembali ke Katalog
      </button>

      <article className="bg-white rounded-[3rem] p-6 md:p-10 shadow-xl shadow-slate-100 border border-slate-50 grid md:grid-cols-2 gap-12">
        {/* SISI KIRI: IMAGE 4:4 */}
        <div className="space-y-6">
          <div className="w-full aspect-square overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-lg">
            <img
              src={resolveImageUrl(
                recipe.image_url,
                "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
              )}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* SISI KANAN: DETAIL */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#10BB89] bg-[#10BB89]/10 px-4 py-1.5 rounded-full">
              <ChefHat size={14} /> {recipe.category || "General"}
            </span>
            <button
              onClick={async () => {
                await addFavoriteRecipe(recipe.id);
                setMessage("Resep disimpan ke favorit!");
              }}
              className="p-3 bg-slate-50 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all border border-slate-100"
            >
              <Heart size={20} />
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1]">
            {recipe.title}
          </h1>

          {/* METADATA BAR */}
          <div className="flex flex-wrap gap-4 mb-8">
            {recipe.calories && (
              <div className="flex items-center gap-2 text-orange-600 font-black bg-orange-50 px-5 py-2.5 rounded-2xl text-sm border border-orange-100">
                <Flame size={18} /> {recipe.calories} kcal
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-600 font-black bg-slate-50 px-5 py-2.5 rounded-2xl text-sm border border-slate-100">
              <Layers size={18} /> Resep Sehat
            </div>
          </div>

          {/* KONTEN DETAIL */}
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-6">
            <h4 className="font-black text-slate-900 flex items-center gap-2 mb-3">
              <Info size={18} className="text-[#10BB89]" /> Deskripsi Resep
            </h4>
            <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
              {recipe.details}
            </p>
          </div>

          {message && (
            <div className="mt-2 text-[#10BB89] font-black text-sm bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
              {message}
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
