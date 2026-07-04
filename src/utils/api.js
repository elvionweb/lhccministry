import axios from "axios";

/* ================= BASE CONFIGURATION ================= */
// Updated to VITE_API_BASE_URL to match your .env
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "") + "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased to 15s for slower mobile uploads
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= INTERCEPTORS ================= */

// Request Interceptor: Attach Auth Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Global Error & Auth Handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized (Expired Token)
    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out...");
      // Updated keys to match your storage names
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    }

    // Normalize Error Object for the frontend
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected network error occurred";

    return Promise.reject({ ...error, message });
  },
);

/* ================= REUSABLE HELPER ================= */
/**
 * @param {Function} request - An axios request function
 */
const handleRequest = async (request) => {
  try {
    const res = await request();
    return res.data;
  } catch (err) {
    // ✅ ADDED: Silently handle AbortController cancellations to clean up console
    if (axios.isCancel(err) || err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
      return null;
    }

    // Production logging
    console.error(
      `[API ${err.config?.method?.toUpperCase()}] ${err.config?.url}:`,
      err.message,
    );
    throw err; // Rethrow normalized error
  }
};

/* ================= API ENDPOINTS ================= */

/* DASHBOARD */
export const fetchDashboardStats = (signal) =>
  handleRequest(() => API.get("/dashboard/stats", { signal }));

/* EVENTS */
export const fetchEvents = (signal) =>
  handleRequest(() => API.get("/events", { signal }));
export const getEventById = (id) =>
  handleRequest(() => API.get(`/events/${id}`));
export const addEvent = (formData) =>
  handleRequest(() =>
    API.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
export const updateEvent = (id, formData) =>
  handleRequest(() =>
    API.put(`/events/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
export const deleteEvent = (id) =>
  handleRequest(() => API.delete(`/events/${id}`));

/* BLOGS */
export const fetchBlogs = (signal) =>
  handleRequest(() => API.get("/blogs", { signal }));
export const getBlogById = (id) => handleRequest(() => API.get(`/blogs/${id}`));
export const addBlog = (formData) =>
  handleRequest(() =>
    API.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
export const updateBlog = (id, formData) =>
  handleRequest(() =>
    API.put(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
export const deleteBlog = (id) =>
  handleRequest(() => API.delete(`/blogs/${id}`));

/* SERMONS */
export const fetchSermons = (signal) =>
  handleRequest(() => API.get("/sermons", { signal }));
export const getSermonById = (id) =>
  handleRequest(() => API.get(`/sermons/${id}`));
export const addSermon = (data) =>
  handleRequest(() => API.post("/sermons", data));
export const updateSermon = (id, data) =>
  handleRequest(() => API.put(`/sermons/${id}`, data));
export const deleteSermon = (id) =>
  handleRequest(() => API.delete(`/sermons/${id}`));

/* PRAYERS */
export const submitPrayer = (formData) =>
  handleRequest(() =>
    API.post("/prayers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

export const fetchPrayers = (page = 1, type = "", signal) =>
  handleRequest(() => API.get("/prayers", { params: { page, type }, signal }));

export const deletePrayer = (id) =>
  handleRequest(() => API.delete(`/prayers/${id}`));

export const updatePrayerStatus = (id, status) =>
  handleRequest(() => API.put(`/prayers/${id}`, { status }));

/* CONTACT */
export const sendContactMessage = (data) =>
  handleRequest(() => API.post("/contact", data));

/* LIVESTREAM SETTINGS */
export const fetchLiveSettings = () =>
  handleRequest(() => API.get("/settings/live"));
export const updateLiveSettings = (data) =>
  handleRequest(() => API.put("/settings/live", data));

/* GALLERY */
export const fetchGallery = (category, signal) =>
  handleRequest(() =>
    API.get("/gallery", { params: { category }, signal })
  );

export const uploadGalleryImages = (formData) =>
  handleRequest(() =>
    API.post("/admin/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

export const deleteGalleryImage = (id) =>
  handleRequest(() => API.delete(`/admin/gallery/${id}`));

export const updateGalleryImage = (id, data) =>
  handleRequest(() => API.put(`/admin/gallery/${id}`, data));

/* IMAGE UPLOAD */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
      formData,
    );

    return res.data.secure_url;
  } catch (err) {
    // Enhanced error logging for Cloudinary
    console.error("Cloudinary Upload Error:", err.response?.data || err.message);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export default API;
