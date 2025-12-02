import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { actionsService } from "../../services/api";

const ActionsList = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    area: "",
    city: "",
    state: "",
    search: "",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

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

  // Atualizar cards por visualização baseado no tamanho da tela
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const loadActions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await actionsService.getAll(filters);
      setActions(response.actions || response);
    } catch (err) {
      setError("Erro ao carregar ações");
      console.error("Erro ao carregar ações:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActions();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentSlide(0); // Reset slide quando filtros mudam
  };

  const clearFilters = () => {
    setFilters({
      area: "",
      city: "",
      state: "",
      search: "",
      dateFrom: "",
      dateTo: "",
    });
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    const maxSlides = Math.ceil(actions.length / cardsPerView) - 1;
    setCurrentSlide((prev) => (prev < maxSlides ? prev + 1 : 0));
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(actions.length / cardsPerView) - 1;
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlides));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.substring(0, 5) : "";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "completed":
        return "Concluída";
      case "cancelled":
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  const filteredActions = actions.filter((action) => {
    const matchesSearch =
      !filters.search ||
      action.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      action.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesArea = !filters.area || action.area === filters.area;
    const matchesCity = !filters.city || action.location?.city === filters.city;
    const matchesState =
      !filters.state || action.location?.state === filters.state;

    const matchesDateFrom =
      !filters.dateFrom || new Date(action.date) >= new Date(filters.dateFrom);
    const matchesDateTo =
      !filters.dateTo || new Date(action.date) <= new Date(filters.dateTo);

    return (
      matchesSearch &&
      matchesArea &&
      matchesCity &&
      matchesState &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const currentActions = filteredActions.slice(
    currentSlide * cardsPerView,
    (currentSlide + 1) * cardsPerView
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando ações...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Erro ao carregar ações
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadActions}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary-700">Ações</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Ações Sociais {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-success-600 to-primary-600">
              Disponíveis
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre oportunidades de voluntariado que fazem a diferença na sua
            comunidade.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar ações..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Botão de filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filtros
            </button>
          </div>

          {/* Filtros expandidos */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Área */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área
                </label>
                <select
                  value={filters.area}
                  onChange={(e) => handleFilterChange("area", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos os estados</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data inicial */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data inicial
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleFilterChange("dateFrom", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Data final */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data final
                </label>
                <input
                  id="date-to"
                  name="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Limpar filtros */}
          {(filters.area ||
            filters.city ||
            filters.state ||
            filters.search ||
            filters.dateFrom ||
            filters.dateTo) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredActions.length} ação(ões) encontrada(s)
          </p>
        </div>

        {/* Lista de ações */}
        {filteredActions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma ação encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros para encontrar mais ações.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Botões de navegação */}
            {filteredActions.length > cardsPerView && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </>
            )}

            {/* Cards das ações */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentActions.map((action) => (
                <div
                  key={action._id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="p-8 border-b border-gray-100 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {action.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
                                {action.area}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                  action.status
                                )}`}
                              >
                                {getStatusText(action.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {action.description}
                    </p>

                    {/* Informações da ação */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="font-medium">
                          {action.location?.city}, {action.location?.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="font-medium">
                          {formatDate(action.date)} às {formatTime(action.time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-3 h-3 text-purple-600" />
                        </div>
                        <span className="font-medium">
                          {action.currentVolunteers || 0}/{action.maxVolunteers}{" "}
                          voluntários
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                          <Building2 className="w-3 h-3 text-orange-600" />
                        </div>
                        <span className="font-medium">{action.ong?.name}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {action.tags && action.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {action.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {action.tags.length > 3 && (
                          <span className="text-xs text-gray-500 font-medium">
                            +{action.tags.length - 3} mais
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer - sempre na parte inferior */}
                  <div className="p-6 bg-gray-50 mt-auto">
                    <Link
                      to={`/acao/${action._id}`}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl block text-center"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores de slide */}
            {filteredActions.length > cardsPerView && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                  length: Math.ceil(filteredActions.length / cardsPerView),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsList;
