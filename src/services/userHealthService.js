import api from "./api";

export const getHealthProfiles = () => api.get("/user/health-profiles");
export const createHealthProfile = (data) => api.post("/user/health-profiles", data);
export const updateHealthProfile = (id, data) => api.put(`/user/health-profiles/${id}`, data);
export const deleteHealthProfile = (id) => api.delete(`/user/health-profiles/${id}`);

export const generateHealthPlan = (data) => api.post("/user/generated-plans", data);
export const getGeneratedPlans = () => api.get("/user/generated-plans");
export const getGeneratedPlanById = (id) => api.get(`/user/generated-plans/${id}`);
export const deleteGeneratedPlan = (id) => api.delete(`/user/generated-plans/${id}`);
