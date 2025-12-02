import React, { useState } from "react";
import { X, Filter, MapPin, Calendar, Users, Tag } from "lucide-react";

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const areas = [
    "Educação",
    "Saúde",
    "Meio Ambiente",
    "Assistência Social",
    "Cultura",
    "Esporte",
    "Direitos Humanos",
    "Tecnologia",
    "Outros",
  ];

  const states = [
    "SP",
    "RJ",
    "MG",
    "BA",
    "RS",
    "PR",
    "SC",
    "GO",
    "PE",
    "CE",
    "PA",
    "MA",
    "MT",
    "MS",
    "RO",
    "TO",
    "PI",
    "RN",
    "PB",
    "AL",
    "SE",
    "AP",
    "RR",
    "AC",
    "AM",
    "DF",
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      area: "",
      city: "",
      state: "",
      dateRange: "",
      tags: [],
      isRemote: false,
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-soft lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-full overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              Filtros
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="hidden lg:block mb-6">
            <h3 className="text-lg font-heading font-semibold text-gray-900 flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </h3>
          </div>

          {/* Filtros */}
          <div className="space-y-6">
            {/* Área de Atuação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Área de Atuação
              </label>
              <select
                value={localFilters.area || ""}
                onChange={(e) => handleFilterChange("area", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Estado
              </label>
              <select
                value={localFilters.state || ""}
                onChange={(e) => handleFilterChange("state", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todos os estados</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cidade
              </label>
              <input
                type="text"
                placeholder="Digite o nome da cidade"
                value={localFilters.city || ""}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Faixa de Datas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Período
              </label>
              <select
                value={localFilters.dateRange || ""}
                onChange={(e) =>
                  handleFilterChange("dateRange", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Qualquer período</option>
                <option value="this-week">Esta semana</option>
                <option value="this-month">Este mês</option>
                <option value="next-month">Próximo mês</option>
                <option value="next-3-months">Próximos 3 meses</option>
                <option value="next-6-months">Próximos 6 meses</option>
              </select>
            </div>

            {/* Apenas Remoto */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remote-only"
                checked={localFilters.isRemote || false}
                onChange={(e) =>
                  handleFilterChange("isRemote", e.target.checked)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="remote-only"
                className="ml-2 text-sm text-gray-700"
              >
                Apenas ações remotas
              </label>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tags
              </label>
              <div className="space-y-2">
                {[
                  "Voluntariado",
                  "Impacto Social",
                  "Comunidade",
                  "Sustentabilidade",
                  "Inovação",
                ].map((tag) => (
                  <div key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tag-${tag}`}
                      checked={localFilters.tags?.includes(tag) || false}
                      onChange={(e) => {
                        const currentTags = localFilters.tags || [];
                        if (e.target.checked) {
                          handleFilterChange("tags", [...currentTags, tag]);
                        } else {
                          handleFilterChange(
                            "tags",
                            currentTags.filter((t) => t !== tag)
                          );
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="mt-8 space-y-3">
            <button onClick={applyFilters} className="w-full btn-primary py-3">
              Aplicar Filtros
            </button>

            <button
              onClick={clearFilters}
              className="w-full btn-secondary py-3"
            >
              Limpar Filtros
            </button>
          </div>

          {/* Estatísticas dos Filtros */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Resultados
            </h4>
            <div className="text-2xl font-bold text-primary-600">
              {/* Aqui você pode mostrar o número de resultados filtrados */}
              Todas as ações
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
