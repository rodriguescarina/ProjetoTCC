import axios from "axios";

const resolveBaseURL = () => {
  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl) return envUrl;
  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    return isLocalhost ? "http://localhost:5000/api" : "/api";
  }
  return "/api";
};

const api = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-storage");
    if (token) {
      try {
        const authData = JSON.parse(token);
        if (authData.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`;
        }
      } catch (error) {
        console.error("Erro ao parsear token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  loginVolunteer: async (credentials) => {
    const response = await api.post("/auth/login/volunteer", credentials);
    return response.data;
  },

  loginONG: async (credentials) => {
    const response = await api.post("/auth/login/ong", credentials);
    return response.data;
  },

  registerVolunteer: async (userData) => {
    const response = await api.post("/auth/register/volunteer", userData);
    return response.data;
  },

  registerONG: async (ongData) => {
    const response = await api.post("/auth/register/ong", ongData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/auth/profile", userData);
    return response.data;
  },
};

export const actionsService = {
  getAll: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    const response = await api.get("/actions", { params: cleanParams });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/actions/${id}`);
    return response.data.action;
  },

  create: async (actionData) => {
    const response = await api.post("/actions", actionData);
    return response.data;
  },

  update: async (id, actionData) => {
    const response = await api.put(`/actions/${id}`, actionData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/actions/${id}`);
    return response.data;
  },

  getApplicationStatus: async (actionId) => {
    const response = await api.get(`/actions/${actionId}/application-status`);
    return response.data;
  },

  apply: async (actionId, applicationData) => {
    const response = await api.post(
      `/actions/${actionId}/apply`,
      applicationData
    );
    return response.data;
  },

  cancelApplication: async (actionId) => {
    const response = await api.delete(`/actions/${actionId}/apply`);
    return response.data;
  },
};

export const applicationsService = {
  getByAction: async (actionId) => {
    const response = await api.get(`/actions/${actionId}/applications`);
    return response.data;
  },

  getByVolunteer: async () => {
    const response = await api.get("/applications/volunteer");
    return response.data;
  },

  getByONG: async (params = {}) => {
    const response = await api.get("/applications/ong", { params });
    return response.data;
  },

  approve: async (applicationId) => {
    const response = await api.put(`/applications/${applicationId}/approve`);
    return response.data;
  },

  reject: async (applicationId, reason) => {
    const response = await api.put(`/applications/${applicationId}/reject`, {
      reason,
    });
    return response.data;
  },

  complete: async (applicationId) => {
    const response = await api.put(`/applications/${applicationId}/complete`);
    return response.data;
  },
};

export const usersService = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/users/profile/stats");
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await api.get("/users", { params });
    return response.data;
  },
};

export const ongsService = {
  getProfile: async () => {
    const response = await api.get("/ongs/profile");
    return response.data;
  },

  updateProfile: async (ongData) => {
    const response = await api.put("/ongs/profile", ongData);
    return response.data;
  },

  getMyActions: async (params = {}) => {
    const response = await api.get("/ongs/profile/actions", { params });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/ongs/profile/stats");
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await api.get("/ongs", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/ongs/${id}`);
    return response.data;
  },

  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append("logo", file);

    const response = await api.post("/ongs/profile/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  uploadBanner: async (file) => {
    const formData = new FormData();
    formData.append("banner", file);

    const response = await api.post("/ongs/profile/banner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export const contentService = {
  getArticles: async (params = {}) => {
    const response = await api.get("/content/articles", { params });
    return response.data;
  },

  getArticleById: async (id) => {
    const response = await api.get(`/content/articles/${id}`);
    return response.data;
  },

  getGuides: async (params = {}) => {
    const response = await api.get("/content/guides", { params });
    return response.data;
  },

  getTestimonials: async (params = {}) => {
    const response = await api.get("/content/testimonials", { params });
    return response.data;
  },
};

export const apiUtils = {
  handleError: (error) => {
    if (error.response?.status === 400 && error.response?.data?.errors) {
      const errors = error.response.data.errors;
      if (Array.isArray(errors)) {
        return errors[0].msg || errors[0];
      }

      const firstError = Object.values(errors)[0];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }

    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      return "Erro de conexão. Verifique se o servidor está rodando.";
    }

    if (error.code === "ECONNABORTED") {
      return "Tempo limite excedido. Tente novamente.";
    }

    if (error.message) {
      return error.message;
    }

    return "Erro desconhecido";
  },

  isValidationError: (error) => {
    return error.response?.status === 400;
  },

  isAuthError: (error) => {
    return error.response?.status === 401;
  },

  isForbiddenError: (error) => {
    return error.response?.status === 403;
  },
};

export const statsService = {
  getGeneral: async () => {
    const response = await api.get("/stats");
    return response.data;
  },

  getActions: async (period = "all") => {
    const response = await api.get("/stats/actions", { params: { period } });
    return response.data;
  },
};

export default api;
