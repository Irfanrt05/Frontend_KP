import api from "./api";

export const addFavoriteRecipe = (recipeId) =>
  api.post("/user/favorites", { recipe_id: recipeId });

export const getFavoriteRecipes = () =>
  api.get("/user/favorites");

export const deleteFavoriteRecipe = (favoriteId) =>
  api.delete(`/user/favorites/${favoriteId}`);


// Favorite
export const getFavorites = () =>
  api.get("/user/favorites");

export const deleteFavorite = (favoriteId) =>
  api.delete(`/user/favorites/${favoriteId}`);

export const deleteFavoriteBlog = (favoriteId) =>
  api.delete(`/user/favorites/blogs/${favoriteId}`);