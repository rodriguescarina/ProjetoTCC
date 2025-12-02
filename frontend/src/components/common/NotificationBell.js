import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, Archive, Trash2, Settings, Filter } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    loading,
    stats,
    markAsRead,
    markMultipleAsRead,
    archiveNotification,
    deleteNotification,
    clearOldNotifications,
    createTestNotification
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, read, archived
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedNotifications([]);
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrar notificações baseado no filtro selecionado
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return notification.status === 'unread';
      case 'read':
        return notification.status === 'read';
      case 'archived':
        return notification.status === 'archived';
      default:
        return true;
    }
  });

  // Selecionar/deselecionar notificação
  const toggleNotificationSelection = (notificationId) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  // Selecionar todas as notificações visíveis
  const selectAllVisible = () => {
    const visibleIds = filteredNotifications.map(n => n._id);
    setSelectedNotifications(visibleIds);
  };

  // Deselecionar todas
  const deselectAll = () => {
    setSelectedNotifications([]);
  };

  // Marcar selecionadas como lidas
  const markSelectedAsRead = async () => {
    if (selectedNotifications.length === 0) return;
    
    await markMultipleAsRead(selectedNotifications);
    setSelectedNotifications([]);
    setShowActions(false);
  };

  // Arquivar selecionadas
  const archiveSelected = async () => {
    if (selectedNotifications.length === 0) return;
    
    for (const id of selectedNotifications) {
      await archiveNotification(id);
    }
    setSelectedNotifications([]);
    setShowActions(false);
  };

  // Deletar selecionadas
  const deleteSelected = async () => {
    if (selectedNotifications.length === 0) return;
    
    if (window.confirm(`Tem certeza que deseja deletar ${selectedNotifications.length} notificação(ões)?`)) {
      for (const id of selectedNotifications) {
        await deleteNotification(id);
      }
      setSelectedNotifications([]);
      setShowActions(false);
    }
  };

  // Limpar notificações antigas
  const handleClearOld = async () => {
    if (window.confirm('Tem certeza que deseja limpar notificações antigas (mais de 90 dias)?')) {
      await clearOldNotifications(90);
    }
  };

  // Criar notificação de teste
  const handleCreateTest = async () => {
    const testData = {
      type: 'system_announcement',
      title: 'Notificação de Teste',
      message: 'Esta é uma notificação de teste criada pelo sistema.',
      priority: 'normal'
    };
    
    await createTestNotification(testData);
  };

  // Obter ícone baseado no tipo
  const getNotificationIcon = (type) => {
    const iconMap = {
      application_status_change: '📋',
      new_application: '👤',
      application_approved: '✅',
      application_rejected: '❌',
      action_reminder: '⏰',
      action_cancelled: '🚫',
      action_updated: '📝',
      new_message: '💬',
      system_announcement: '📢',
      welcome_message: '👋',
      achievement_unlocked: '🏆',
      volunteer_hours_milestone: '⭐',
      ong_verification: '🔍',
      reminder_24h: '⏰',
      reminder_1h: '⏰'
    };
    return iconMap[type] || '📌';
  };

  // Obter cor baseada na prioridade
  const getPriorityColor = (priority) => {
    const colorMap = {
      low: 'text-gray-500',
      normal: 'text-blue-500',
      high: 'text-orange-500',
      urgent: 'text-red-500'
    };
    return colorMap[priority] || 'text-blue-500';
  };

  // Obter cor baseada no status
  const getStatusColor = (status) => {
    const colorMap = {
      unread: 'bg-blue-100 text-blue-800',
      read: 'bg-gray-100 text-gray-800',
      archived: 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do sino */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 group"
      >
        <Bell className="w-6 h-6" />
        
        {/* Badge de notificações não lidas */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Notificações
        </div>
      </button>

      {/* Dropdown de notificações */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Notificações
                {unreadCount > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount} nova(s)
                  </span>
                )}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas ({stats.total})</option>
                <option value="unread">Não lidas ({stats.unread})</option>
                <option value="read">Lidas ({stats.read})</option>
                <option value="archived">Arquivadas ({stats.archived})</option>
              </select>

              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Ações em lote"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Ações em lote */}
            {showActions && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={selectAllVisible}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Selecionar todas
                </button>
                <button
                  onClick={deselectAll}
                  className="text-xs text-gray-600 hover:text-gray-700 font-medium"
                >
                  Limpar seleção
                </button>
                {selectedNotifications.length > 0 && (
                  <>
                    <span className="text-xs text-gray-500">
                      {selectedNotifications.length} selecionada(s)
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={markSelectedAsRead}
                        className="p-1 text-green-600 hover:text-green-700 transition-colors"
                        title="Marcar como lidas"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={archiveSelected}
                        className="p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                        title="Arquivar"
                      >
                        <Archive className="w-3 h-3" />
                      </button>
                      <button
                        onClick={deleteSelected}
                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Lista de notificações */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-500">Carregando notificações...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Nenhuma notificação encontrada</p>
                <p className="text-sm text-gray-400 mt-1">
                  {filter === 'all' ? 'Você está em dia!' : `Nenhuma notificação ${filter === 'unread' ? 'não lida' : filter === 'read' ? 'lida' : 'arquivada'}`}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      notification.status === 'unread' ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      if (notification.status === 'unread') {
                        markAsRead(notification._id);
                      }
                    }}
                  >
                    {/* Checkbox para seleção */}
                    {showActions && (
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification._id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleNotificationSelection(notification._id);
                        }}
                        className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    )}

                    <div className="flex items-start gap-3">
                      {/* Ícone */}
                      <div className="text-2xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium text-gray-900 leading-tight">
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(notification.status)}`}>
                              {notification.status === 'unread' ? 'Nova' : 
                               notification.status === 'read' ? 'Lida' : 'Arquivada'}
                            </span>
                            <span className={`text-xs ${getPriorityColor(notification.priority)}`}>
                              {notification.priority === 'urgent' ? '🔥' : 
                               notification.priority === 'high' ? '⚡' : 
                               notification.priority === 'low' ? '💤' : ''}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(notification.createdAt), {
                              addSuffix: true,
                              locale: ptBR
                            })}
                          </span>
                          
                          {/* Ações individuais */}
                          <div className="flex items-center gap-1">
                            {notification.status === 'unread' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification._id);
                                }}
                                className="p-1 text-green-600 hover:text-green-700 transition-colors"
                                title="Marcar como lida"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                archiveNotification(notification._id);
                              }}
                              className="p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                              title="Arquivar"
                            >
                              <Archive className="w-3 h-3" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification._id);
                              }}
                              className="p-1 text-red-600 hover:text-red-700 transition-colors"
                              title="Deletar"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearOld}
                  className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Limpar antigas
                </button>
                
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={handleCreateTest}
                    className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Criar teste
                  </button>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                {stats.total} notificação(ões) no total
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
