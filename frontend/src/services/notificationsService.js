import api from "./api";

const notificationsService = {
  async getNotifications(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.status) params.append("status", filters.status);
      if (filters.type) params.append("type", filters.type);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);

      const response = await api.get(`/notifications?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao buscar notificações" };
    }
  },

  async getUnreadCount() {
    try {
      const response = await api.get("/notifications/unread/count");
      return response.data.unreadCount;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao contar notificações não lidas",
        }
      );
    }
  },

  async getNotificationDetails(notificationId) {
    try {
      const response = await api.get(`/notifications/${notificationId}`);
      return response.data.notification;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao buscar detalhes da notificação",
        }
      );
    }
  },

  async markAsRead(notificationId) {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao marcar notificação como lida",
        }
      );
    }
  },

  async archiveNotification(notificationId) {
    try {
      const response = await api.put(
        `/notifications/${notificationId}/archive`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao arquivar notificação" };
    }
  },

  async markMultipleAsRead(notificationIds = null) {
    try {
      const response = await api.put("/notifications/read-all", {
        notificationIds,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao marcar notificações como lidas",
        }
      );
    }
  },

  async archiveMultipleNotifications(notificationIds = null) {
    try {
      const response = await api.put("/notifications/archive-all", {
        notificationIds,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Erro ao arquivar notificações" }
      );
    }
  },

  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erro ao deletar notificação" };
    }
  },

  async clearOldNotifications(daysOld = 90) {
    try {
      const response = await api.delete("/notifications/clear-old", {
        data: { daysOld },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao limpar notificações antigas",
        }
      );
    }
  },

  async getNotificationStats() {
    try {
      const response = await api.get("/notifications/stats/summary");
      return response.data.stats;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao buscar estatísticas das notificações",
        }
      );
    }
  },

  async createTestNotification(notificationData) {
    try {
      const response = await api.post("/notifications/test", notificationData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Erro ao criar notificação de teste",
        }
      );
    }
  },
};

export default notificationsService;
