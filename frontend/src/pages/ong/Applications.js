import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { applicationsService } from "../../services/api";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await applicationsService.getByONG({ limit: 100 });
      setApplications(res.applications || []);
    } catch (err) {
      console.error("Erro ao carregar candidaturas:", err);
      setError("Não foi possível carregar as candidaturas.");
    } finally {
      setLoading(false);
    }
  };

  const grouped = useMemo(() => {
    const groups = {
      pending: [],
      approved: [],
      rejected: [],
      completed: [],
      withdrawn: [],
    };
    for (const app of applications) {
      const status = app.status || "pending";
      if (groups[status]) groups[status].push(app);
    }
    return groups;
  }, [applications]);

  const tabs = [
    { id: "pending", name: "Pendentes", count: grouped.pending.length },
    { id: "approved", name: "Aprovadas", count: grouped.approved.length },
    { id: "rejected", name: "Rejeitadas", count: grouped.rejected.length },
    { id: "completed", name: "Concluídas", count: grouped.completed.length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning-100 text-warning-700";
      case "approved":
        return "bg-success-100 text-success-700";
      case "rejected":
        return "bg-error-100 text-error-700";
      case "completed":
        return "bg-primary-100 text-primary-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const approve = async (id) => {
    try {
      setActionLoadingId(id);
      await applicationsService.approve(id);
      await loadApplications();
    } catch (err) {
      console.error("Erro ao aprovar candidatura:", err);
      alert("Não foi possível aprovar a candidatura.");
    } finally {
      setActionLoadingId("");
    }
  };

  const reject = async (id) => {
    try {
      const reason = window.prompt(
        "Informe o motivo da rejeição:",
        "Perfil não adequado"
      );
      if (reason === null) return;
      setActionLoadingId(id);
      await applicationsService.reject(id, reason);
      await loadApplications();
    } catch (err) {
      console.error("Erro ao rejeitar candidatura:", err);
      alert("Não foi possível rejeitar a candidatura.");
    } finally {
      setActionLoadingId("");
    }
  };

  const complete = async (id) => {
    try {
      setActionLoadingId(id);
      await applicationsService.complete(id);
      await loadApplications();
    } catch (err) {
      console.error("Erro ao concluir candidatura:", err);
      alert("Não foi possível marcar como concluída.");
    } finally {
      setActionLoadingId("");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando candidaturas...</p>
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
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Erro ao carregar candidaturas
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={loadApplications} className="btn-primary px-6 py-2">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Candidaturas Recebidas
        </h1>
        <p className="text-gray-600">
          Gerencie todas as candidaturas dos voluntários para suas ações
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-warning-600" />
          </div>
          <div className="text-2xl font-bold text-warning-600">
            {grouped.pending.length}
          </div>
          <div className="text-sm text-gray-600">Pendentes</div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-success-600" />
          </div>
          <div className="text-2xl font-bold text-success-600">
            {grouped.approved.length}
          </div>
          <div className="text-sm text-gray-600">Aprovadas</div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {grouped.completed.length}
          </div>
          <div className="text-sm text-gray-600">Concluídas</div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
          <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-6 h-6 text-error-600" />
          </div>
          <div className="text-2xl font-bold text-error-600">
            {grouped.rejected.length}
          </div>
          <div className="text-sm text-gray-600">Rejeitadas</div>
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
        {grouped[activeTab].length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma candidatura encontrada
            </h3>
            <p className="text-gray-500">Nada a exibir nesta aba.</p>
          </div>
        ) : (
          grouped[activeTab].map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Candidatura em {formatDate(application.createdAt)}
                    </span>
                  </div>

                  {/* Informações do Voluntário */}
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                    {application.volunteer?.name || "Voluntário"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    <strong>Ação:</strong> {application.action?.title || "Ação"}
                  </p>

                  {/* Contato */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{application.volunteer?.phone || "-"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{application.volunteer?.email || "-"}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Local:</strong>{" "}
                      {application.action?.location?.city &&
                      application.action?.location?.state
                        ? `${application.action.location.city}, ${application.action.location.state}`
                        : "-"}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Disponibilidade:</strong>{" "}
                      {application.availability?.label || "-"}
                    </div>
                  </div>

                  {/* Observações */}
                  {application.message && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <span className="text-sm text-gray-600 font-medium">
                        Mensagem do voluntário:
                      </span>
                      <p className="text-gray-700 mt-1">
                        {application.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="ml-6 flex flex-col space-y-2">
                  {application.status === "pending" && (
                    <>
                      <button
                        disabled={actionLoadingId === application._id}
                        onClick={() => approve(application._id)}
                        className="btn-success text-sm px-4 py-2"
                      >
                        {actionLoadingId === application._id
                          ? "Aprovando..."
                          : "Aprovar"}
                      </button>
                      <button
                        disabled={actionLoadingId === application._id}
                        onClick={() => reject(application._id)}
                        className="btn-error text-sm px-4 py-2"
                      >
                        {actionLoadingId === application._id
                          ? "Rejeitando..."
                          : "Rejeitar"}
                      </button>
                    </>
                  )}

                  {application.status === "approved" && (
                    <button
                      disabled={actionLoadingId === application._id}
                      onClick={() => complete(application._id)}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      {actionLoadingId === application._id
                        ? "Concluindo..."
                        : "Marcar como Concluída"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Applications;
