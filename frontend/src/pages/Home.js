import React from "react";
import ActionsList from "../components/actions/ActionsList";
import StatsSection from "../components/home/StatsSection";
import { Heart, Users, Target, ArrowRight } from "lucide-react";

const Home = () => {
  const handleFindActions = () => {
    // Rolar para a seção de ações
    const actionsSection = document.getElementById("actions-section");
    if (actionsSection) {
      actionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-12 overflow-hidden">
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
        <div
          className="absolute top-1/2 right-1/4 w-8 h-8 bg-warning-400 opacity-20 rounded-full animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-10 w-6 h-6 bg-secondary-400 opacity-20 rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-warning-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">
              Plataforma de Voluntariado
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Conectando</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-warning-300 to-warning-400">
              Pessoas e Causas
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-primary-100 leading-relaxed">
            Descubra oportunidades de voluntariado que fazem a diferença.
            Conecte-se com instituições e participe de ações que transformam
            vidas.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-primary-700">
                Como Funciona
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Como {""}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-success-600 to-primary-600">
                Funciona
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Em 3 passos simples você pode começar a transformar vidas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Cadastre-se",
                description: "Crie sua conta em poucos minutos.",
                icon: Users,
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "02",
                title: "Encontre Ações",
                description: "Explore oportunidades que combinam com você.",
                icon: Target,
                color: "from-green-500 to-green-600",
              },
              {
                step: "03",
                title: "Faça a Diferença",
                description: "Participe e veja o impacto real.",
                icon: Heart,
                color: "from-purple-500 to-purple-600",
              },
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-center p-6 rounded-xl bg-gray-50 shadow-sm border border-gray-100 relative z-10 transform group-hover:scale-105 transition-all duration-300 hover:shadow-md">
                  {/* Número do passo */}
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-sm font-bold text-gray-800">
                      {step.step}
                    </span>
                  </div>

                  {/* Ícone */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm`}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Título e descrição */}
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Seta conectora */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm border border-gray-200">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="actions-section" className="py-12">
        <ActionsList />
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section REMOVIDA */}

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-24 overflow-hidden">
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
        <div className="absolute top-10 left-20 w-32 h-32 bg-warning-400 opacity-20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-primary-400 opacity-20 rounded-full blur-xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-warning-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">
              Junte-se a nós!
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para fazer a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning-300 to-primary-300">
              Diferença?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se à nossa comunidade de voluntários e ONGs que estão
            transformando vidas todos os dias.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openLoginModal"))
              }
              className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-warning-400 to-warning-500 text-gray-900 rounded-xl hover:from-warning-300 hover:to-warning-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Começar Agora
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-warning-300 to-warning-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("openLoginModal", {
                    detail: { activeTab: "register", userType: "ong" },
                  })
                )
              }
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Cadastre sua ONG
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
