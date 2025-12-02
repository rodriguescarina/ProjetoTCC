import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Calendar, Users, Award, Building2, Heart } from "lucide-react";
import CreateActionModal from "../../components/actions/CreateActionModal";
import { ongsService, applicationsService } from "../../services/api";

const ONGDashboard = () => {
  const { ong } = useAuthStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statsData, setStatsData] = useState(null);
  const [myActions, setMyActions] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [statsRes, actionsRes, appsRes] = await Promise.all([
          ongsService.getStats(),
          ongsService.getMyActions({ limit: 6 }),
          applicationsService.getByONG({ limit: 6 }),
        ]);
        if (!isMounted) return;
        setStatsData(statsRes?.stats || null);
        setMyActions(actionsRes?.actions || []);
        setReceivedApplications(appsRes?.applications || []);
      } catch (err) {
        console.error("Erro ao carregar dashboard da ONG:", err);
        if (!isMounted) return;
        setError("Não foi possível carregar os dados agora.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const s = statsData || {};
    return {
      totalActions: s.totalActions || 0,
      activeActions: s.activeActions || 0,
      totalVolunteers: s.totalVolunteers || 0,
      totalHours: s.totalHours || 0,
      completionRate: s.completionRate || 0,
      satisfactionRate: s.rating || 0,
      pendingApplications: s.pendingApplications || 0,
    };
  }, [statsData]);

  const recentActions = useMemo(() => {
    return (myActions || []).slice(0, 6).map((a) => ({
      id: String(a._id || Math.random()),
      title: a.title || "Ação",
      date: a.date ? new Date(a.date).toLocaleDateString("pt-BR") : "-",
      volunteers: Math.max(0, a.currentVolunteers || 0),
      status: a.status || "active",
      area: a.area || "",
    }));
  }, [myActions]);

  const recentApplications = useMemo(() => {
    return (receivedApplications || []).slice(0, 6).map((app) => ({
      id: String(app._id || Math.random()),
      volunteerName: app.volunteer?.name || "Voluntário",
      actionTitle: app.action?.title || "Ação",
      appliedAt: app.createdAt
        ? new Date(app.createdAt).toLocaleDateString("pt-BR")
        : "-",
      status: app.status || "pending",
    }));
  }, [receivedApplications]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100 border-green-200";
      case "completed":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "pending":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "approved":
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "completed":
        return "Concluída";
      case "pending":
        return "Pendente";
      case "approved":
        return "Aprovada";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando seu painel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => {
              setLoading(true);
              setError("");
              Promise.resolve().then(() => setLoading(false));
            }}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white py-16 overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Dashboard Ativo</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                Bem-vindo,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  {ong?.name || "ONG"}
                </span>
              </h1>

              <p className="text-base text-indigo-100 max-w-2xl leading-relaxed">
                Acompanhe o progresso das suas ações sociais e gerencie seus
                voluntários de forma eficiente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="group relative px-6 py-3 text-base font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-lg hover:from-yellow-300 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Criar Ação
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <Link
                to="/ong/profile"
                className="px-6 py-3 text-base font-semibold border-2 border-white/30 text-white rounded-lg hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Perfil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Actions */}
            <div className="group text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
                {stats.totalActions}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Total de Ações
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Criadas desde o início
              </div>
            </div>

            {/* Active Actions */}
            <div className="group text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors">
                {stats.activeActions}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Ações Ativas
              </div>
              <div className="text-xs text-gray-500 mt-1">Em andamento</div>
            </div>

            {/* Total Volunteers */}
            <div className="group text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
                {stats.totalVolunteers}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Voluntários
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Participaram das ações
              </div>
            </div>

            {/* Completion Rate */}
            <div className="group text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-700 transition-colors">
                {stats.completionRate}%
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Taxa de Conclusão
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Ações finalizadas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Ações Recentes
                </h3>
                <Link
                  to="/ong/actions"
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  Ver todas
                </Link>
              </div>

              <div className="space-y-4">
                {recentActions.length === 0 ? (
                  <p className="text-sm text-gray-500">Sem ações recentes.</p>
                ) : (
                  recentActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {action.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>{action.date}</span>
                          <span>•</span>
                          <span>{action.volunteers} voluntários</span>
                          {action.area && (
                            <>
                              <span>•</span>
                              <span className="text-xs">{action.area}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          action.status
                        )}`}
                      >
                        {getStatusText(action.status)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Candidaturas Recentes
                </h3>
                <Link
                  to="/ong/applications"
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  Ver todas
                </Link>
              </div>

              <div className="space-y-4">
                {recentApplications.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Sem candidaturas recentes.
                  </p>
                ) : (
                  recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {application.volunteerName}
                        </h4>
                        <div className="text-xs text-gray-600">
                          {application.actionTitle}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {application.appliedAt}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatusText(application.status)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ações Rápidas
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Acesse rapidamente as funcionalidades mais utilizadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Criar Ação",
                icon: "🚀",
                color: "from-blue-500 to-blue-600",
                action: () => setIsCreateModalOpen(true),
              },
              {
                title: "Gerenciar Ações",
                icon: "📋",
                color: "from-green-500 to-green-600",
                link: "/ong/actions",
              },
              {
                title: "Candidaturas",
                icon: "👥",
                color: "from-purple-500 to-purple-600",
                link: "/ong/applications",
              },
              {
                title: "Editar Perfil",
                icon: "⚙️",
                color: "from-orange-500 to-orange-600",
                link: "/ong/profile",
              },
            ].map((item, index) => (
              <div key={index} className="group">
                {item.link ? (
                  <Link
                    to={item.link}
                    className="block bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 text-2xl`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 text-2xl`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Action Modal */}
      <CreateActionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
};

export default ONGDashboard;
