import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  Archive,
  Trash2,
  Settings,
  Search,
  X,
  AlertCircle,
} from "lucide-react";
import { useNotifications } from "../contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const Notifications = () => {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    stats,
    markAsRead,
    markMultipleAsRead,
    archiveNotification,
    deleteNotification,
    clearOldNotifications,
    createTestNotification,
  } = useNotifications();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("date");

  const filteredNotifications = notifications
    .filter((notification) => {
      // Filtro por status
      if (filter !== "all" && notification.status !== filter) {
        return false;
      }

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          notification.title.toLowerCase().includes(searchLower) ||
          notification.message.toLowerCase().includes(searchLower) ||
          notification.type.toLowerCase().includes(searchLower)
        );
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "type":
          return a.type.localeCompare(b.type);
        case "date":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const toggleNotificationSelection = (notificationId) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const selectAllVisible = () => {
    const visibleIds = filteredNotifications.map((n) => n._id);
    setSelectedNotifications(visibleIds);
  };

  const deselectAll = () => {
    setSelectedNotifications([]);
  };

  const markSelectedAsRead = async () => {
    if (selectedNotifications.length === 0) return;

    await markMultipleAsRead(selectedNotifications);
    setSelectedNotifications([]);
    setShowActions(false);
  };

  const archiveSelected = async () => {
    if (selectedNotifications.length === 0) return;

    for (const id of selectedNotifications) {
      await archiveNotification(id);
    }
    setSelectedNotifications([]);
    setShowActions(false);
  };

  const deleteSelected = async () => {
    if (selectedNotifications.length === 0) return;

    if (
      window.confirm(
        `Tem certeza que deseja deletar ${selectedNotifications.length} notificação(ões)?`
      )
    ) {
      for (const id of selectedNotifications) {
        await deleteNotification(id);
      }
      setSelectedNotifications([]);
      setShowActions(false);
    }
  };

  const handleClearOld = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja limpar notificações antigas (mais de 90 dias)?"
      )
    ) {
      await clearOldNotifications(90);
    }
  };

  const handleCreateTest = async () => {
    const testData = {
      type: "system_announcement",
      title: "Notificação de Teste",
      message: "Esta é uma notificação de teste criada pelo sistema.",
      priority: "normal",
    };

    await createTestNotification(testData);
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      application_status_change: "📋",
      new_application: "👤",
      application_approved: "✅",
      application_rejected: "❌",
      action_reminder: "⏰",
      action_cancelled: "🚫",
      action_updated: "📝",
      new_message: "💬",
      system_announcement: "📢",
      welcome_message: "👋",
      achievement_unlocked: "🏆",
      volunteer_hours_milestone: "⭐",
      ong_verification: "🔍",
      reminder_24h: "⏰",
      reminder_1h: "⏰",
    };
    return iconMap[type] || "📌";
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      low: "text-gray-500",
      normal: "text-blue-500",
      high: "text-orange-500",
      urgent: "text-red-500",
    };
    return colorMap[priority] || "text-blue-500";
  };

  const getStatusColor = (status) => {
    const colorMap = {
      unread: "bg-blue-100 text-blue-800",
      read: "bg-gray-100 text-gray-800",
      archived: "bg-yellow-100 text-yellow-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type) => {
    const colorMap = {
      application_status_change: "bg-purple-100 text-purple-800",
      new_application: "bg-green-100 text-green-800",
      action_reminder: "bg-orange-100 text-orange-800",
      system_announcement: "bg-blue-100 text-blue-800",
      achievement_unlocked: "bg-yellow-100 text-yellow-800",
      new_message: "bg-indigo-100 text-indigo-800",
    };
    return colorMap[type] || "bg-gray-100 text-gray-800";
  };

  const formatType = (type) => {
    const typeMap = {
      application_status_change: "Status da Candidatura",
      new_application: "Nova Candidatura",
      application_approved: "Candidatura Aprovada",
      application_rejected: "Candidatura Rejeitada",
      action_reminder: "Lembrete de Ação",
      action_cancelled: "Ação Cancelada",
      action_updated: "Ação Atualizada",
      new_message: "Nova Mensagem",
      system_announcement: "Anúncio do Sistema",
      welcome_message: "Boas-vindas",
      achievement_unlocked: "Conquista Desbloqueada",
      volunteer_hours_milestone: "Marco de Horas",
      ong_verification: "Verificação da ONG",
      reminder_24h: "Lembrete 24h",
      reminder_1h: "Lembrete 1h",
    };
    return typeMap[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Central de Notificações</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Notificações</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Importantes
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-blue-100 leading-relaxed">
            Mantenha-se atualizado com as últimas informações sobre suas
            candidaturas, ações e novidades da plataforma.
          </p>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">
                {stats.total}
              </div>
              <div className="text-sm text-blue-200">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">
                {stats.unread}
              </div>
              <div className="text-sm text-blue-200">Não Lidas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">
                {stats.read}
              </div>
              <div className="text-sm text-blue-200">Lidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <Bell className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Notificações
                </h1>
                {stats.unread > 0 && (
                  <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                    {stats.unread} nova(s)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setViewMode(viewMode === "list" ? "grid" : "list")
                }
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title={viewMode === "list" ? "Modo grade" : "Modo lista"}
              >
                {viewMode === "list" ? (
                  <div className="grid grid-cols-2 gap-1 w-5 h-5">
                    <div className="bg-gray-400 rounded"></div>
                    <div className="bg-gray-400 rounded"></div>
                    <div className="bg-gray-400 rounded"></div>
                    <div className="bg-gray-400 rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-1 w-5 h-5">
                    <div className="bg-gray-400 rounded h-1"></div>
                    <div className="bg-gray-400 rounded h-1"></div>
                    <div className="bg-gray-400 rounded h-1"></div>
                  </div>
                )}
              </button>

              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Ações em lote"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e pesquisa */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filtros */}
            <div className="flex items-center space-x-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas ({stats.total})</option>
                <option value="unread">Não lidas ({stats.unread})</option>
                <option value="read">Lidas ({stats.read})</option>
                <option value="archived">Arquivadas ({stats.archived})</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Mais recentes</option>
                <option value="priority">Por prioridade</option>
                <option value="type">Por tipo</option>
              </select>
            </div>

            {/* Pesquisa */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar notificações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Ações em lote */}
            {showActions && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={selectAllVisible}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1 border border-blue-200 rounded-lg hover:bg-blue-50"
                >
                  Selecionar todas
                </button>
                <button
                  onClick={deselectAll}
                  className="text-xs text-gray-600 hover:text-gray-700 font-medium px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Limpar seleção
                </button>
                {selectedNotifications.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {selectedNotifications.length} selecionada(s)
                    </span>
                    <button
                      onClick={markSelectedAsRead}
                      className="p-1 text-green-600 hover:text-green-700 transition-colors"
                      title="Marcar como lidas"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={archiveSelected}
                      className="p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                      title="Arquivar"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="p-1 text-red-600 hover:text-red-700 transition-colors"
                      title="Deletar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Não lidas</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.unread}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lidas</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.read}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Arquivadas</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.archived}
                </p>
              </div>
              <Archive className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Lista de notificações */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando notificações...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma notificação encontrada
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filter !== "all"
                ? "Tente ajustar os filtros ou a pesquisa."
                : "Você está em dia com suas notificações!"}
            </p>
            {process.env.NODE_ENV === "development" && (
              <button onClick={handleCreateTest} className="btn-primary">
                Criar Notificação de Teste
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md ${
                  notification.status === "unread" ? "ring-2 ring-blue-200" : ""
                }`}
              >
                {/* Header da notificação */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                              notification.type
                            )}`}
                          >
                            {formatType(notification.type)}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                              notification.status
                            )}`}
                          >
                            {notification.status === "unread"
                              ? "Nova"
                              : notification.status === "read"
                              ? "Lida"
                              : "Arquivada"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Checkbox para seleção */}
                    {showActions && (
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(
                          notification._id
                        )}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleNotificationSelection(notification._id);
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>

                {/* Conteúdo da notificação */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs ${getPriorityColor(
                          notification.priority
                        )}`}
                      >
                        {notification.priority === "urgent"
                          ? "🔥 Urgente"
                          : notification.priority === "high"
                          ? "⚡ Alta"
                          : notification.priority === "low"
                          ? "💤 Baixa"
                          : "Normal"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>

                    {/* Ações individuais */}
                    <div className="flex items-center space-x-1">
                      {notification.status === "unread" && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="p-1 text-green-600 hover:text-green-700 transition-colors"
                          title="Marcar como lida"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => archiveNotification(notification._id)}
                        className="p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                        title="Arquivar"
                      >
                        <Archive className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer com ações */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleClearOld}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpar antigas (90+ dias)
            </button>

            {process.env.NODE_ENV === "development" && (
              <button
                onClick={handleCreateTest}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors px-4 py-2 border border-blue-300 rounded-lg hover:bg-blue-50"
              >
                Criar teste
              </button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            {filteredNotifications.length} de {stats.total} notificação(ões)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
