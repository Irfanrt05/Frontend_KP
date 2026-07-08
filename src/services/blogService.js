import api from "./api";

export const getBlogs = () => api.get("/blogs");
export const createBlog = (data) => api.post("/admin/blogs", data);
export const updateBlog = (id, data) => api.put(`/admin/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/admin/blogs/${id}`);
