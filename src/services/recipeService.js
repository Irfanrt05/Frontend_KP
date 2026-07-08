// src/services/recipeService.js
import api from "./api";

// 1. Ambil data: Request ke GET http://localhost:5000/api/recipes
export const getRecipes = () => api.get("/recipes");

// 2. Buat data: Request ke POST http://localhost:5000/api/admin/recipes
export const createRecipe = (data) => api.post("/admin/recipes", data);

// 3. Hapus data: Request ke DELETE http://localhost:5000/api/admin/recipes/:id
export const deleteRecipe = (id) => api.delete(`/admin/recipes/${id}`);
export const updateRecipe = (id, data) => api.put(`/admin/recipes/${id}`, data);

export const getRecipeById = (id) => api.get(`/recipes/${id}`);
