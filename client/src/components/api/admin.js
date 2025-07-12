// src/api/admin.js
import axios from "../utils/axios";

export const getItemsForModeration = () => axios.get("/admin/items");
export const approveItem = (id) => axios.patch(`/admin/items/${id}/approve`);
export const rejectItem = (id) => axios.patch(`/admin/items/${id}/reject`);
export const deleteItem = (id) => axios.delete(`/admin/items/${id}`);
