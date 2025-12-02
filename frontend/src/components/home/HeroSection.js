import React, { useEffect, useState } from "react";
import { Heart, Users, Target, ArrowRight } from "lucide-react";
import { statsService } from "../../services/api";

const HeroSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsService.getGeneral();
        setStats(data?.overview || null);
      } catch (e) {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatNumber = (num) => {
    if (typeof num !== "number") return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
    return String(num);
  };

  return (
    <section className="bg-gradient-primary text-white py-20 lg:py-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Conectando
              <span className="block text-secondary-300">Pessoas e</span>
              <span className="block">Causas</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-primary-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Descubra oportunidades de voluntariado que fazem a diferença.
              Conecte-se com instituições e participe de ações que transformam
              vidas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openLoginModal"))
                }
                className="btn-secondary text-lg px-8 py-4 group"
              >
                Quero Participar
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openLoginModal"))
                }
                className="btn-white text-lg px-8 py-4 group"
              >
                Sou uma Instituição
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Ilustração/Estatísticas */}
          <div className="relative">
            <div className="bg-white bg-opacity-10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {loading
                      ? "..."
                      : `${formatNumber(stats?.totalVolunteers || 0)}`}
                  </div>
                  <div className="text-primary-100 text-sm">
                    Voluntários Ativos
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {loading ? "..." : `${formatNumber(stats?.totalONGs || 0)}`}
                  </div>
                  <div className="text-primary-100 text-sm">Instituições</div>
                </div>

                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {loading
                      ? "..."
                      : `${formatNumber(stats?.totalActions || 0)}`}
                  </div>
                  <div className="text-primary-100 text-sm">
                    Ações Realizadas
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {loading
                      ? "..."
                      : `${formatNumber(stats?.estimatedVolunteerHours || 0)}`}
                  </div>
                  <div className="text-primary-100 text-sm">Horas Doadas</div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-secondary-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-white rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-primary-300 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-2 text-primary-100">
            <span className="text-sm">Role para descobrir</span>
            <div className="w-6 h-10 border-2 border-primary-200 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary-200 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
