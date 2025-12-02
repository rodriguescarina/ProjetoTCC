import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import {
  Calendar,
  Award,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import { usersService, applicationsService } from "../../services/api";

const VolunteerDashboard = () => {
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileStats, setProfileStats] = useState(null);
  const [applicationsData, setApplicationsData] = useState({
    applications: [],
    pagination: null,
  });

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [statsRes, appsRes] = await Promise.all([
          usersService.getStats(),
          applicationsService.getByVolunteer(),
        ]);
        if (!isMounted) return;
        setProfileStats(statsRes?.stats || null);
        setApplicationsData({
          applications: appsRes?.applications || [],
          pagination: appsRes?.pagination || null,
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard do voluntário:", err);
        if (!isMounted) return;
        setError("Não foi possível carregar seus dados agora.");
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
    const s = profileStats || {};
    return {
      totalActions: s.totalApplications || 0,
      completedActions: s.completed || 0,
      totalHours: s.totalHours || 0,
      currentApplications: s.pending || 0,
      satisfactionRate: 0,
      badges: s.totalCertificates || 0,
    };
  }, [profileStats]);

  const recentActions = useMemo(() => {
    const apps = applicationsData.applications || [];
    return apps.slice(0, 5).map((app) => {
      const action = app.action || {};
      const ong = app.ong || {};
      return {
        id: String(app._id || action._id || Math.random()),
        title: action.title || "Ação",
        date: action.date
          ? new Date(action.date).toLocaleDateString("pt-BR")
          : "-",
        hours: app.participation?.hours || 0,
        status: app.status || "pending",
        area: action.area || "",
        ong: ong.name || "",
      };
    });
  }, [applicationsData]);

  const upcomingActions = useMemo(() => {
    const now = new Date();
    const apps = applicationsData.applications || [];
    return apps
      .filter((app) => {
        const actionDate = app.action?.date ? new Date(app.action.date) : null;
        return (
          actionDate &&
          actionDate > now &&
          ["pending", "approved"].includes(app.status)
        );
      })
      .slice(0, 4)
      .map((app) => {
        const action = app.action || {};
        const dateObj = action.date ? new Date(action.date) : null;
        const city = action.location?.city || "";
        const state = action.location?.state || "";
        return {
          id: String(app._id || action._id || Math.random()),
          title: action.title || "Ação",
          date: dateObj ? dateObj.toLocaleDateString("pt-BR") : "-",
          time: action.time || "",
          location: [city, state].filter(Boolean).join(", "),
          ong: app.ong?.name || "",
          volunteers: `${Math.max(0, action.currentVolunteers || 0)}/${
            action.maxVolunteers || 0
          }`,
        };
      });
  }, [applicationsData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 border-green-200";
      case "approved":
      case "upcoming":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "active":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "pending":
        return "text-gray-600 bg-gray-100 border-gray-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Concluída";
      case "approved":
        return "Aprovada";
      case "upcoming":
        return "Próxima";
      case "active":
        return "Ativa";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
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
            className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            onClick={() => {
              setLoading(true);
              setError("");
              // re-dispara o efeito
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
    <div className="p-8 bg-gradient-to-br from-gray-50 via-emerald-50 to-green-50 min-h-screen">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-16 overflow-hidden rounded-3xl mb-8">
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
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Voluntário Ativo</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bem-vindo,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  {user?.name || "Voluntário"}
                </span>
              </h1>

              <p className="text-xl text-emerald-100 max-w-2xl leading-relaxed">
                Continue fazendo a diferença! Acompanhe seu progresso e descubra
                novas oportunidades de voluntariado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/actions"
                className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-xl hover:from-yellow-300 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Encontrar Ações
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/volunteer/profile"
                className="px-8 py-4 text-lg font-semibold border-2 border-white/30 text-white rounded-xl hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
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
      <section className="py-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Actions */}
            <div className="group text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2 group-hover:text-emerald-700 transition-colors">
                {stats.totalActions}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Ações Participadas
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Total de participações
              </div>
            </div>

            {/* Completed Actions */}
            <div className="group text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors">
                {stats.completedActions}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Ações Concluídas
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Missões cumpridas
              </div>
            </div>

            {/* Total Hours */}
            <div className="group text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
                {stats.totalHours}h
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Horas Dedicadas
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Tempo de voluntariado
              </div>
            </div>

            {/* Satisfaction Rate */}
            <div className="group text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-700 transition-colors">
                {stats.satisfactionRate}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                Avaliação Média
              </div>
              <div className="text-xs text-gray-500 mt-1">Das ONGs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Achievements */}
      <section className="py-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Chart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Progresso Mensal
                </h3>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  {stats.totalHours}h
                </div>
                <div className="text-gray-600 text-sm">Horas este mês</div>
                <div className="text-xs text-emerald-600 mt-1">Meta: 100h</div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Progresso</span>
                  <span>{Math.round((stats.totalHours / 100) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(
                        (stats.totalHours / 100) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Conquistas</h3>
                <div className="text-xl">🏆</div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    name: "Certificados",
                    icon: "🎓",
                    description: `${stats.badges} certificados emitidos`,
                  },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity & Upcoming Actions */}
      <section className="py-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Ações Recentes
                </h3>
                <Link
                  to="/volunteer/applications"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Ver todas
                </Link>
              </div>

              <div className="space-y-3">
                {recentActions.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Sem atividade recente.
                  </p>
                ) : (
                  recentActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {action.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>{action.date}</span>
                          <span>•</span>
                          <span>{action.hours}h</span>
                          {action.area && (
                            <>
                              <span>•</span>
                              <span className="text-xs">{action.area}</span>
                            </>
                          )}
                        </div>
                        {action.ong && (
                          <div className="text-xs text-gray-500 mt-1">
                            {action.ong}
                          </div>
                        )}
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

            {/* Upcoming Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Próximas Ações
                </h3>
                <Link
                  to="/actions"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Ver todas
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingActions.length === 0 ? (
                  <p className="text-sm text-gray-500">Sem próximas ações.</p>
                ) : (
                  upcomingActions.map((action) => (
                    <div
                      key={action.id}
                      className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {action.title}
                        </h4>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {action.volunteers}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span>
                            {action.date}
                            {action.time ? ` às ${action.time}` : ""}
                          </span>
                        </div>
                        {action.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-green-600" />
                            <span>{action.location}</span>
                          </div>
                        )}
                        {action.ong && (
                          <div className="text-xs text-gray-500">
                            {action.ong}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ações Rápidas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acesse rapidamente as funcionalidades mais utilizadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Encontrar Ações",
                icon: "🔍",
                color: "from-emerald-500 to-emerald-600",
                link: "/actions",
              },
              {
                title: "Minhas Candidaturas",
                icon: "📋",
                color: "from-blue-500 to-blue-600",
                link: "/volunteer/applications",
              },
              {
                title: "Meus Certificados",
                icon: "🏆",
                color: "from-purple-500 to-purple-600",
                link: "/volunteer/certificates",
              },
              {
                title: "Editar Perfil",
                icon: "⚙️",
                color: "from-orange-500 to-orange-600",
                link: "/volunteer/profile",
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group block bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 text-2xl`}
                >
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-12 overflow-hidden rounded-3xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 8L56 0h2L40 18v-2zm0 8L64 8h2L40 26v-2zm0 8L72 16h2L40 34v-2zm0 8L80 24h2v2L42 42h-2zm-8 8L80 32h2v2L34 50h-2zm-8 8L80 40h2v2L26 58h-2zm-8 8L80 48h2v2L18 66h-2zm-8 8L80 56h2v2L10 74h-2zm-8 8L80 64h2v2L2 82h-2zm-8 8L80 72h2v2L-6 90h-2zm-8 8L80 80h2v2L-14 98h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-20 w-32 h-32 bg-yellow-400 opacity-20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-emerald-400 opacity-20 rounded-full blur-xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">
              Continue fazendo a diferença!
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Você já{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-300">
              Transformou
            </span>{" "}
            {stats.totalActions} Vidas
          </h2>

          <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cada hora dedicada ao voluntariado é uma semente plantada para um
            futuro melhor. Continue sendo a mudança que você quer ver no mundo.
          </p>

          <Link
            to="/actions"
            className="group relative inline-block px-6 py-3 text-base font-semibold bg-gradient-to-r from-yellow-400 to-emerald-400 text-gray-900 rounded-xl hover:from-yellow-300 hover:to-emerald-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Encontrar Próxima Ação
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VolunteerDashboard;
