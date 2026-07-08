import api from "./api";

export const API_ORIGIN = api.defaults.baseURL.replace(/\/api\/?$/, "");

export const resolveImageUrl = (imageUrl, fallback = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80") => {
  if (!imageUrl) return fallback;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("data:")) {
    return imageUrl;
  }
  return `${API_ORIGIN}/${imageUrl.replace(/^\/+/, "")}`;
};

export const getPublicBlogs = () => api.get("/blogs");
export const getPublicBlogById = (id) => api.get(`/blogs/${id}`);

export const getPublicRecipes = () => api.get("/recipes");
export const getPublicRecipeById = (id) => api.get(`/recipes/${id}`);
