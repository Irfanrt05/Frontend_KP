import api from "./api";

export const logArticleVisit = (id) => api.post(`/user/articles/${id}/visit`);
export const logRecipeVisit = (id) => api.post(`/user/recipes/${id}/visit`);
