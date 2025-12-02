import React, { useState, useEffect } from "react";
import { ongsService, apiUtils } from "../services/api";
import ONGDetailsModal from "../components/ong/ONGDetailsModal";

const ONGs = () => {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedONG, setSelectedONG] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    area: "",
    state: "",
    search: "",
  });

  const areas = [
    "Assistência Social",
    "Educação",
    "Saúde",
    "Meio Ambiente",
    "Cultura",
    "Esporte",
    "Direitos Humanos",
    "Tecnologia",
    "Outros",
  ];

  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  useEffect(() => {
    const loadOngs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await ongsService.getAll();
        setOngs(response.ongs || []);
      } catch (err) {
        console.error("Erro ao carregar ONGs:", err);
        setError(apiUtils.handleError(err));
        setOngs([]);
      } finally {
        setLoading(false);
      }
    };

    loadOngs();
  }, []);

  const filteredOngs = ongs.filter((ong) => {
    const matchesArea = !filters.area || ong.area === filters.area;
    const matchesState = !filters.state || ong.state === filters.state;
    const matchesSearch =
      !filters.search ||
      ong.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      (ong.description &&
        ong.description.toLowerCase().includes(filters.search.toLowerCase()));

    return matchesArea && matchesState && matchesSearch;
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      area: "",
      state: "",
      search: "",
    });
  };

  const handleViewDetails = (ong) => {
    setSelectedONG(ong);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedONG(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            Carregando ONGs...
          </h3>
          <p className="text-gray-500">Buscando organizações parceiras</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Erro ao carregar ONGs
          </h3>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-12 overflow-hidden">
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
            <span className="text-sm font-medium">Organizações Parceiras</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">ONGs</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Parceiras
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-purple-100 leading-relaxed">
            Conheça as organizações que estão fazendo a diferença em suas
            comunidades. Junte-se a elas e ajude a transformar vidas.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Encontre a ONG Ideal
              </h2>
              <p className="text-gray-600">
                Filtre por área, localização ou busque por nome
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Busca */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Buscar ONG
                </label>
                <input
                  id="search-ongs"
                  name="search"
                  type="text"
                  placeholder="Digite o nome da ONG..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                />
              </div>

              {/* Área */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Área de Atuação
                </label>
                <select
                  value={filters.area}
                  onChange={(e) => handleFilterChange("area", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                >
                  <option value="">Todas as áreas</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                >
                  <option value="">Todos os estados</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-center">
              <button
                onClick={clearFilters}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300 font-medium"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de ONGs */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredOngs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {Object.values(filters).some((f) => f !== "")
                  ? "Nenhuma ONG encontrada"
                  : "Nenhuma ONG cadastrada"}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                {Object.values(filters).some((f) => f !== "")
                  ? "Tente ajustar os filtros de busca ou verifique se há ONGs em outras áreas"
                  : "Ainda não há ONGs cadastradas na plataforma. Seja a primeira a se cadastrar!"}
              </p>
              {Object.values(filters).some((f) => f !== "") && (
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOngs.map((ong) => (
                <div
                  key={ong.id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Imagem da ONG */}
                  <div className="h-32 bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden">
                    {ong.banner ? (
                      <img
                        src={ong.banner}
                        alt={`Banner da ${ong.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">ONG</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center -mt-6 relative z-10 border-4 border-white shadow-lg">
                            {ong.logo ? (
                              <img
                                src={ong.logo}
                                alt={ong.name}
                                className="w-8 h-8 rounded-lg"
                              />
                            ) : (
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {ong.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border border-purple-200">
                                {ong.area}
                              </span>
                              {ong.isVerified && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                  ✓ Verificada
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {ong.description}
                    </p>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">
                        {ong.city}, {ong.state}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 bg-gray-50">
                    <button
                      onClick={() => handleViewDetails(ong)}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-24 overflow-hidden">
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
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-purple-400 opacity-20 rounded-full blur-xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">
              Sua ONG pode estar aqui!
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cadastre sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-purple-300">
              Organização
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se às centenas de ONGs que já estão fazendo a diferença
            através da nossa plataforma de voluntariado.
          </p>

          <button
            onClick={() => {
              console.log("Botão Cadastrar ONG clicado");
              window.dispatchEvent(
                new CustomEvent("openLoginModal", {
                  detail: {
                    activeTab: "register",
                    userType: "ong",
                  },
                })
              );
            }}
            className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-purple-400 text-gray-900 rounded-xl hover:from-yellow-300 hover:to-purple-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer z-10"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Cadastrar ONG
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-purple-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </button>
        </div>
      </section>

      {/* Modal de Detalhes da ONG */}
      <ONGDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ongId={selectedONG?._id}
      />
    </div>
  );
};

export default ONGs;
