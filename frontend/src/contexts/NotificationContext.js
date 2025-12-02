import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuthStore } from "../stores/authStore";
import notificationsService from "../services/notificationsService";
import toast from "react-hot-toast";

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    archived: 0,
  });

  // Buscar notificações
  const fetchNotifications = useCallback(
    async (filters = {}) => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const response = await notificationsService.getNotifications(filters);
        setNotifications(response.notifications);
        return response;
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        toast.error("Erro ao carregar notificações");
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  // Buscar contagem de não lidas
  const fetchUnreadCount = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const count = await notificationsService.getUnreadCount();
      setUnreadCount(count);
      return count;
    } catch (error) {
      console.error("Erro ao contar notificações não lidas:", error);
    }
  }, [isAuthenticated]);

  // Buscar estatísticas
  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const notificationStats =
        await notificationsService.getNotificationStats();
      setStats(notificationStats);
      return notificationStats;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  }, [isAuthenticated]);

  // Marcar como lida
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationsService.markAsRead(notificationId);

      // Atualizar estado local
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: "read", readAt: new Date() }
            : notification
        )
      );

      // Atualizar contagem
      setUnreadCount((prev) => Math.max(0, prev - 1));

      // Atualizar estatísticas
      setStats((prev) => ({
        ...prev,
        unread: Math.max(0, prev.unread - 1),
        read: prev.read + 1,
      }));

      return true;
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
      toast.error("Erro ao marcar notificação como lida");
      return false;
    }
  }, []);

  // Marcar múltiplas como lidas
  const markMultipleAsRead = useCallback(
    async (notificationIds = null) => {
      try {
        const result = await notificationsService.markMultipleAsRead(
          notificationIds
        );

        // Atualizar estado local
        if (notificationIds) {
          setNotifications((prev) =>
            prev.map((notification) =>
              notificationIds.includes(notification._id)
                ? { ...notification, status: "read", readAt: new Date() }
                : notification
            )
          );
        } else {
          setNotifications((prev) =>
            prev.map((notification) => ({
              ...notification,
              status: "read",
              readAt: new Date(),
            }))
          );
        }

        // Atualizar contagem e estatísticas
        const newUnreadCount = Math.max(0, unreadCount - result.modifiedCount);
        setUnreadCount(newUnreadCount);
        setStats((prev) => ({
          ...prev,
          unread: newUnreadCount,
          read: prev.read + result.modifiedCount,
        }));

        toast.success(
          `${result.modifiedCount} notificação(ões) marcada(s) como lida(s)`
        );
        return true;
      } catch (error) {
        console.error("Erro ao marcar notificações como lidas:", error);
        toast.error("Erro ao marcar notificações como lidas");
        return false;
      }
    },
    [unreadCount]
  );

  // Arquivar notificação
  const archiveNotification = useCallback(async (notificationId) => {
    try {
      await notificationsService.archiveNotification(notificationId);

      // Atualizar estado local
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: "archived", archivedAt: new Date() }
            : notification
        )
      );

      // Atualizar estatísticas
      setStats((prev) => ({
        ...prev,
        archived: prev.archived + 1,
        total: prev.total,
      }));

      toast.success("Notificação arquivada");
      return true;
    } catch (error) {
      console.error("Erro ao arquivar notificação:", error);
      toast.error("Erro ao arquivar notificação");
      return false;
    }
  }, []);

  // Deletar notificação
  const deleteNotification = useCallback(
    async (notificationId) => {
      try {
        await notificationsService.deleteNotification(notificationId);

        // Atualizar estado local
        setNotifications((prev) =>
          prev.filter((n) => n._id !== notificationId)
        );

        // Atualizar estatísticas
        const notification = notifications.find(
          (n) => n._id === notificationId
        );
        if (notification) {
          setStats((prev) => ({
            ...prev,
            total: prev.total - 1,
            [notification.status]: Math.max(0, prev[notification.status] - 1),
          }));
        }

        toast.success("Notificação removida");
        return true;
      } catch (error) {
        console.error("Erro ao deletar notificação:", error);
        toast.error("Erro ao deletar notificação");
        return false;
      }
    },
    [notifications]
  );

  // Limpar notificações antigas
  const clearOldNotifications = useCallback(
    async (daysOld = 90) => {
      try {
        const result = await notificationsService.clearOldNotifications(
          daysOld
        );

        // Recarregar notificações e estatísticas
        await fetchNotifications();
        await fetchStats();

        toast.success(
          `${result.deletedCount} notificação(ões) antiga(s) removida(s)`
        );
        return true;
      } catch (error) {
        console.error("Erro ao limpar notificações antigas:", error);
        toast.error("Erro ao limpar notificações antigas");
        return false;
      }
    },
    [fetchNotifications, fetchStats]
  );

  // Criar notificação de teste (apenas em desenvolvimento)
  const createTestNotification = useCallback(async (notificationData) => {
    try {
      const result = await notificationsService.createTestNotification(
        notificationData
      );

      // Adicionar à lista de notificações
      setNotifications((prev) => [result.notification, ...prev]);

      // Atualizar contagem e estatísticas
      setUnreadCount((prev) => prev + 1);
      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        unread: prev.unread + 1,
      }));

      toast.success("Notificação de teste criada");
      return result.notification;
    } catch (error) {
      console.error("Erro ao criar notificação de teste:", error);
      toast.error("Erro ao criar notificação de teste");
      return null;
    }
  }, []);

  // Atualizar notificações quando autenticação mudar
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      fetchUnreadCount();
      fetchStats();
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setStats({ total: 0, unread: 0, read: 0, archived: 0 });
    }
  }, [isAuthenticated, fetchNotifications, fetchUnreadCount, fetchStats]);

  // Polling para notificações em tempo real (a cada 30 segundos)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, fetchUnreadCount]);

  const value = {
    // Estado
    notifications,
    unreadCount,
    loading,
    stats,

    // Ações
    fetchNotifications,
    fetchUnreadCount,
    fetchStats,
    markAsRead,
    markMultipleAsRead,
    archiveNotification,
    deleteNotification,
    clearOldNotifications,
    createTestNotification,

    // Utilitários
    hasUnread: unreadCount > 0,
    totalNotifications: stats.total,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
