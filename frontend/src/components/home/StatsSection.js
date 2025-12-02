import React, { useState, useEffect } from "react";
import { Heart, Users, Target, MapPin } from "lucide-react";
import { statsService } from "../../services/api";

const StatsSection = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await statsService.getGeneral();
      // Garantir estrutura mínima esperada
      if (data && data.overview) {
        setStatsData(data);
      } else {
        setStatsData(null);
      }
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
      setStatsData(null);
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

  // Só mostrar dados se estiverem disponíveis do banco
  const safeOverview = statsData?.overview || {};

  const stats = statsData
    ? [
        {
          icon: Heart,
          value: formatNumber(safeOverview.totalVolunteers || 0),
          label: "Voluntários Ativos",
          description: "Pessoas dedicadas a fazer a diferença",
          color: "text-primary-600",
          bgColor: "bg-primary-50",
        },
        {
          icon: Users,
          value: formatNumber(safeOverview.totalONGs || 0),
          label: "Instituições Parceiras",
          description: "ONGs e organizações confiáveis",
          color: "text-secondary-600",
          bgColor: "bg-secondary-50",
        },
        {
          icon: Target,
          value: formatNumber(safeOverview.totalActions || 0),
          label: "Ações Realizadas",
          description: "Projetos que transformaram vidas",
          color: "text-success-600",
          bgColor: "bg-success-50",
        },
        {
          icon: MapPin,
          value: safeOverview.uniqueStatesCount || 0,
          label: "Estados Atendidos",
          description: "Presença em todo o Brasil",
          color: "text-error-600",
          bgColor: "bg-error-50",
        },
      ]
    : [];

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Veja o impacto real que estamos gerando juntos.
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando estatísticas...</p>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar estado vazio se não houver dados reais do banco
  if (!statsData || stats.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Veja o impacto real que estamos gerando juntos.
            </p>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Dados em breve
            </h3>
            <p className="text-gray-600">
              As estatísticas serão exibidas assim que houver dados no sistema.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Veja o impacto real que estamos gerando juntos.
          </p>
        </div>

        {/* Grid de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Ícone */}
              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>

              {/* Valor */}
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>

              {/* Label */}
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {stat.label}
              </h3>

              {/* Descrição */}
              <p className="text-xs text-gray-600 leading-tight">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
