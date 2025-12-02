import React, { useState, useEffect } from "react";
import {
  Users,
  Building2,
  Target,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";
import { statsService } from "../../services/api";

const DynamicStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();

    // Atualizar estatísticas a cada 30 segundos
    const interval = setInterval(loadStats, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const data = await statsService.getGeneral();
      setStats(data);
      setError("");
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
      setError("Erro ao carregar estatísticas");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K+";
    }
    return num.toString();
  };

  const formatHours = (hours) => {
    if (hours >= 1000000) {
      return (hours / 1000000).toFixed(1) + "M+";
    } else if (hours >= 1000) {
      return (hours / 1000).toFixed(1) + "K+";
    }
    return hours.toString();
  };

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando estatísticas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Erro ao carregar estatísticas</p>
            <button
              onClick={loadStats}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { overview, growth } = stats;

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-20 w-20 h-20 bg-blue-200 opacity-30 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-10 right-20 w-16 h-16 bg-indigo-200 opacity-30 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-12 h-12 bg-purple-200 opacity-30 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary-700">
              Nossos números
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Nossos {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-success-600 to-primary-600">
              Números
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o impacto real que estamos causando juntos na sociedade. Cada
            número representa vidas transformadas e comunidades fortalecidas.
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Ações Sociais */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-600 font-semibold">
                  {growth.actions > 0 ? "+" : ""}
                  {growth.actions}% este mês
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatNumber(overview.totalActions)}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                Ações Sociais
              </div>
              <div className="text-gray-600">
                Realizadas com sucesso em todo o país
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {overview.activeActions} ativas agora
              </div>
              <div className="text-sm text-blue-600 font-semibold">
                {overview.completionRate}% concluídas
              </div>
            </div>
          </div>

          {/* Voluntários */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-green-600 font-semibold">
                  {growth.volunteers > 0 ? "+" : ""}
                  {growth.volunteers}% este mês
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatNumber(overview.totalVolunteers)}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                Voluntários
              </div>
              <div className="text-gray-600">
                Fazendo a diferença em suas comunidades
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Ativos
              </div>
              <div className="flex items-center text-sm text-green-600 font-semibold">
                <Star className="w-4 h-4 mr-1" />
                4.8★ avaliação
              </div>
            </div>
          </div>

          {/* ONGs Parceiras */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-600 font-semibold">
                  {growth.ongs > 0 ? "+" : ""}
                  {growth.ongs}% este mês
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatNumber(overview.totalONGs)}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                ONGs Parceiras
              </div>
              <div className="text-gray-600">
                Trabalhando conosco para transformar vidas
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Verificadas
              </div>
              <div className="text-sm text-purple-600 font-semibold">
                {Math.round(
                  (overview.activeONGsCount / overview.totalONGs) * 100
                )}
                % ativas
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatHours(overview.estimatedVolunteerHours)}
            </div>
            <div className="text-gray-600 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-1" />
              Horas de voluntariado
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {overview.uniqueCitiesCount}+
            </div>
            <div className="text-gray-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1" />
              Cidades atendidas
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {overview.completionRate}%
            </div>
            <div className="text-gray-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Taxa de satisfação
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Suporte disponível
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Última atualização:{" "}
            {new Date(stats.lastUpdated).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicStats;
