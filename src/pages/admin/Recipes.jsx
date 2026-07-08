import { useEffect, useRef, useState } from "react";
import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../services/recipeService";
import {
  Eye,
  Edit3,
  Trash2,
  PlusCircle,
  X,
  Upload,
  Save,
  Loader2,
  Flame,
} from "lucide-react";
import { resolveImageUrl } from "../../services/contentService";
import { stripText } from "../../utils/text";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    calories: "",
    details: "",
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await getRecipes();
      setRecipes(res.data?.data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      editingId
        ? await updateRecipe(editingId, formData)
        : await createRecipe(formData);
      alert("Berhasil disimpan!");
      resetForm();
      fetchRecipes();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menyimpan resep!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus resep ini?")) return;
    await deleteRecipe(id);
    fetchRecipes();
  };

  const startEdit = (recipe) => {
    setEditingId(recipe.id);
    setForm({
      title: recipe.title || "",
      category: recipe.category || "",
      calories: recipe.calories || "",
      details: recipe.details || "",
    });
    setPreview(resolveImageUrl(recipe.image_url));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", category: "", calories: "", details: "" });
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Manajemen Resep
        </h1>
        <p className="text-gray-500 mt-2">
          Kelola resep, gambar, kalori, dan detail resep panjang.
        </p>
      </header>

      {/* FORM SECTION */}
      <section className="bg-white p-8 rounded-3xl border-l-4 border-emerald-500 shadow-sm mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          {editingId ? (
            <Edit3 className="text-amber-500" />
          ) : (
            <PlusCircle className="text-emerald-500" />
          )}
          {editingId ? "Edit Resep" : "Tambah Resep Baru"}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div
              onClick={() => fileInputRef.current.click()}
              className="group relative h-64 w-full border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 overflow-hidden hover:border-emerald-500 transition-all"
            >
              {preview ? (
                <img
                  src={preview}
                  className="h-full w-full object-cover"
                  alt="preview"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-emerald-500">
                  <Upload size={32} />
                  <span className="text-sm font-medium mt-2">
                    Upload Gambar
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                const nextFile = e.target.files?.[0];
                if (!nextFile) return;
                setFile(nextFile);
                setPreview(URL.createObjectURL(nextFile));
              }}
              accept="image/*"
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Judul Resep"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Kategori"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <input
              className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Kalori (kcal)"
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
            />
            <textarea
              className="w-full p-4 bg-gray-50 border rounded-2xl h-44 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Detail resep..."
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 font-semibold text-gray-500"
            >
              Batal
            </button>
          )}
          <button
            type="button"
            onClick={handleCreateOrUpdate}
            className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-200"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={18} />
            )}{" "}
            {editingId ? "Update" : "Simpan"}
          </button>
        </div>
      </section>

      {/* GRID RECIPES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recipes.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl p-3 shadow-sm border hover:shadow-xl transition-all"
          >
            <div className="relative overflow-hidden rounded-2xl h-52">
              <img
                src={resolveImageUrl(item.image_url)}
                className="w-full h-full object-cover"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setViewRecipe(item)}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40"
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => startEdit(item)}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-red-500/80 backdrop-blur-md rounded-xl text-white hover:bg-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                {item.category}
              </span>
              <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                {stripText(item.details, 100)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MINIMALIST PREMIUM POP-UP */}
      {viewRecipe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[85vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setViewRecipe(null)}
              className="absolute top-4 right-4 z-20 p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <div className="w-full md:w-[40%] bg-gray-100 flex-shrink-0">
              <img
                src={resolveImageUrl(viewRecipe.image_url)}
                className="w-full h-64 md:h-full object-cover"
                alt={viewRecipe.title}
              />
            </div>
            <div className="w-full md:w-[60%] p-6 md:p-8 overflow-y-auto">
              <div className="flex gap-2 mb-3">
                <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-lg">
                  {viewRecipe.category}
                </span>
                {viewRecipe.calories && (
                  <span className="flex items-center gap-1 text-amber-700 text-[10px] font-bold uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-lg">
                    <Flame size={12} /> {viewRecipe.calories} kcal
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
                {viewRecipe.title}
              </h2>
              <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line break-words border-t pt-4">
                {viewRecipe.details}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
