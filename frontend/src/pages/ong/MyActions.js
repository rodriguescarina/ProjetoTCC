import React, { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  Users,
  Eye,
  Edit,
  Trash2,
  Pause,
  Play,
} from "lucide-react";
import { ongsService } from "../../services/api";
import CreateActionModal from "../../components/actions/CreateActionModal";
import { useAuthStore } from "../../stores/authStore";

const MyActions = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [actions, setActions] = useState({
    active: [],
    draft: [],
    in_progress: [],
    completed: [],
    cancelled: [],
  });
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    loadActions();
  }, []);

  const loadActions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await ongsService.getMyActions();
      const allActions = response.actions || [];

      const organizedActions = {
        active: allActions.filter((action) => action.status === "active"),
        draft: allActions.filter((action) => action.status === "draft"),
        in_progress: allActions.filter(
          (action) => action.status === "in_progress"
        ),
        completed: allActions.filter((action) => action.status === "completed"),
        cancelled: allActions.filter((action) => action.status === "cancelled"),
      };

      setActions(organizedActions);
    } catch (err) {
      console.error("Erro ao carregar ações:", err);
      setError("Erro ao carregar suas ações");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-success-100 text-success-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "in_progress":
        return "bg-warning-100 text-warning-700";
      case "completed":
        return "bg-primary-100 text-primary-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "draft":
        return "Rascunho";
      case "in_progress":
        return "Em Andamento";
      case "completed":
        return "Concluída";
      case "cancelled":
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  const tabs = [
    { id: "active", name: "Ativas", count: actions.active.length },
    {
      id: "in_progress",
      name: "Em Andamento",
      count: actions.in_progress.length,
    },
    { id: "completed", name: "Concluídas", count: actions.completed.length },
    { id: "cancelled", name: "Canceladas", count: actions.cancelled.length },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando suas ações...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Erro ao carregar ações
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={loadActions} className="btn-primary px-6 py-2">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Minhas Ações
          </h1>
          <p className="text-gray-600">
            Gerencie todas as suas ações voluntárias e acompanhe o engajamento
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Ação</span>
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {Object.values(actions).reduce(
              (total, arr) => total + arr.length,
              0
            )}
          </div>
          <div className="text-sm text-gray-600">Total de Ações</div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-success-600" />
          </div>
          <div className="text-2xl font-bold text-success-600">
            {Object.values(actions).reduce(
              (total, arr) =>
                total +
                arr.reduce(
                  (sum, action) => sum + (action.currentVolunteers || 0),
                  0
                ),
              0
            )}
          </div>
          <div className="text-sm text-gray-600">Total de Voluntários</div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-secondary-600">
            {Object.values(actions).reduce(
              (total, arr) =>
                total +
                arr.reduce(
                  (sum, action) => sum + (action.maxVolunteers || 0),
                  0
                ),
              0
            )}
          </div>
          <div className="text-sm text-gray-600">Total de Vagas</div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-warning-600" />
          </div>
          <div className="text-2xl font-bold text-warning-600">
            {actions.active.length}
          </div>
          <div className="text-sm text-gray-600">Ações Ativas</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-secondary-500 text-secondary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
              <span
                className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${
                  activeTab === tab.id
                    ? "bg-secondary-100 text-secondary-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {actions[activeTab].length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma ação encontrada
            </h3>
            <p className="text-gray-500">
              {activeTab === "active" && "Você ainda não tem ações ativas."}
              {activeTab === "draft" && "Nenhum rascunho de ação encontrado."}
              {activeTab === "in_progress" &&
                "Nenhuma ação em andamento no momento."}
              {activeTab === "completed" && "Nenhuma ação concluída ainda."}
              {activeTab === "cancelled" && "Nenhuma ação cancelada."}
            </p>
          </div>
        ) : (
          actions[activeTab].map((action) => (
            <div
              key={action._id || action.id}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        action.status
                      )}`}
                    >
                      {getStatusText(action.status)}
                    </span>
                    <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {action.area}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                    {action.title}
                  </h3>

                  {/* Informações */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">
                        Data da Ação:
                      </span>
                      <p className="font-medium">{formatDate(action.date)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Horário:</span>
                      <p className="font-medium">
                        {action.time || "A combinar"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Vagas:</span>
                      <p className="font-medium">
                        {action.maxVolunteers
                          ? `${
                              (action.maxVolunteers || 0) -
                              (action.currentVolunteers || 0)
                            }/${action.maxVolunteers}`
                          : "Ilimitadas"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Inscritos:</span>
                      <p className="font-medium">
                        {action.currentVolunteers || 0}
                      </p>
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {action.currentVolunteers || 0} voluntários inscritos
                      </span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>
                        {action.location?.city && action.location?.state
                          ? `${action.location.city}, ${action.location.state}`
                          : "Local a definir"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="ml-6 flex flex-col space-y-2">
                  <button className="btn-secondary text-sm px-4 py-2 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Ver</span>
                  </button>

                  {action.status === "active" && (
                    <button className="btn-warning text-sm px-4 py-2 flex items-center space-x-2">
                      <Pause className="w-4 h-4" />
                      <span>Iniciar</span>
                    </button>
                  )}

                  {action.status === "in_progress" && (
                    <button className="btn-success text-sm px-4 py-2 flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Finalizar</span>
                    </button>
                  )}

                  {action.status === "draft" && (
                    <button className="btn-primary text-sm px-4 py-2 flex items-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                  )}

                  <button className="btn-error text-sm px-4 py-2 flex items-center space-x-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal de Criação de Ação */}
      <CreateActionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          loadActions();
        }}
      />
    </div>
  );
};

export default MyActions;
