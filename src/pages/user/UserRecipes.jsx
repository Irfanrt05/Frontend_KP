import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Flame, Loader2, Utensils, Clock, BookOpen } from "lucide-react";
import {
  getPublicRecipes,
  resolveImageUrl,
} from "../../services/contentService";
import { stripText } from "../../utils/text";

export default function UserRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await getPublicRecipes();
        setRecipes(res.data.data || res.data.recipes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter((r) =>
      `${r.title} ${r.category}`.toLowerCase().includes(q),
    );
  }, [recipes, keyword]);

  return (
    <section className="pt-3 w-full pb-20 px-2">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-[#10BB89] to-[#0d9b73] rounded-[2.5rem] p-10 md:p-12 mb-12 text-white shadow-2xl shadow-[#10BB89]/20 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Katalog Resep
          </h1>
          <p className="text-white/90 max-w-lg text-lg font-medium">
            Temukan ratusan inspirasi hidangan sehat yang dirancang khusus untuk
            mendukung gaya hidup seimbang Anda setiap hari.
          </p>
        </div>
        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 min-w-[200px] text-center border border-white/20 shadow-xl">
          <p className="text-white/70 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">
            Total Koleksi
          </p>
          <span className="text-6xl font-black">{recipes.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="h-[400px] flex flex-col items-center justify-center text-[#10BB89] gap-4">
          <Loader2 className="animate-spin w-12 h-12" />
          <p className="font-bold tracking-widest uppercase text-sm">
            Menyiapkan Resep...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes.map((recipe, index) => (
            <Link
              to={`/dashboard/recipes/${recipe.id}`}
              key={recipe.id}
              className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={resolveImageUrl(
                    recipe.image_url,
                    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
                  )}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/10">
                  <Utensils size={10} /> {recipe.category || "General"}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-slate-800 mb-3 group-hover:text-[#10BB89] transition-colors line-clamp-1">
                  {recipe.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2 flex-1">
                  {stripText(recipe.details)}
                </p>

                <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-3">
                    {recipe.calories && (
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">
                        <Flame size={12} /> {recipe.calories} kcal
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
                      <Clock size={12} /> 20m
                    </span>
                  </div>
                  <BookOpen
                    size={18}
                    className="text-slate-300 group-hover:text-[#10BB89] transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
