import api from "./api";

export const getMyActivityLogs = () => api.get("/user/activity-logs");
export const getAdminActivityLogs = () => api.get("/admin/activity-logs");
