import api from "./api";

const applicationsService = {
  async createApplication(applicationData) {
    try {
      const response = await api.post("/applications", applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao criar candidatura" };
    }
  },

  async getVolunteerApplications(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.status) params.append("status", filters.status);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);

      const response = await api.get(
        `/applications/volunteer?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao buscar candidaturas" };
    }
  },

  async getONGApplications(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.status) params.append("status", filters.status);
      if (filters.actionId) params.append("actionId", filters.actionId);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);

      const response = await api.get(`/applications/ong?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao buscar candidaturas" };
    }
  },

  async getApplicationDetails(applicationId) {
    try {
      const response = await api.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao buscar detalhes da candidatura",
        }
      );
    }
  },

  async approveApplication(applicationId, ongResponse = "") {
    try {
      const response = await api.put(`/applications/${applicationId}/approve`, {
        ongResponse,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao aprovar candidatura" };
    }
  },

  async rejectApplication(applicationId, rejectionReason, ongResponse = "") {
    try {
      const response = await api.put(`/applications/${applicationId}/reject`, {
        rejectionReason,
        ongResponse,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao rejeitar candidatura" };
    }
  },

  async withdrawApplication(applicationId) {
    try {
      const response = await api.put(`/applications/${applicationId}/withdraw`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao cancelar candidatura" };
    }
  },

  async completeApplication(applicationId) {
    try {
      const response = await api.put(`/applications/${applicationId}/complete`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao marcar candidatura como concluída",
        }
      );
    }
  },

  async markNotificationsAsRead(applicationId) {
    try {
      const response = await api.put(
        `/applications/${applicationId}/notifications/read`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao marcar notificações" };
    }
  },

  async getApplicationStats(ongId = null) {
    try {
      const url = ongId
        ? `/applications/stats/${ongId}`
        : "/applications/stats";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao buscar estatísticas" };
    }
  },
};

export default applicationsService;
