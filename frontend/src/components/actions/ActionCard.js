import React from "react";
import { MapPin, Calendar, Users, Clock, Heart } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ActionCard = ({ action, showApplyButton = true }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return "Data não definida";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-success-100 text-success-700";
      case "paused":
        return "bg-warning-100 text-warning-700";
      case "closed":
        return "bg-error-100 text-error-700";
      case "completed":
        return "bg-primary-100 text-primary-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "paused":
        return "Pausada";
      case "closed":
        return "Fechada";
      case "completed":
        return "Concluída";
      default:
        return "Rascunho";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagem da Ação */}
      <div className="h-48 bg-gradient-primary relative">
        {action.images && action.images.length > 0 ? (
          <img
            src={action.images[0]}
            alt={action.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-white opacity-60" />
          </div>
        )}

        {/* Status */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              action.status
            )}`}
          >
            {getStatusText(action.status)}
          </span>
        </div>

        {/* Destaque */}
        {action.isHighlighted && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
              DESTAQUE
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Área */}
        <div className="mb-3">
          <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {action.area}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-heading font-semibold mb-3 text-gray-900 line-clamp-2">
          {action.title}
        </h3>

        {/* Descrição */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {action.shortDescription}
        </p>

        {/* Informações */}
        <div className="space-y-3 mb-6">
          {/* Localização */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>
              {action.location.city}, {action.location.state}
              {action.location.isRemote && " (Remoto)"}
            </span>
          </div>

          {/* Datas */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(action.dates.startDate)} -{" "}
              {formatDate(action.dates.endDate)}
            </span>
          </div>

          {/* Vagas */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>
              {action.vacancies.available} de {action.vacancies.total} vagas
              disponíveis
            </span>
          </div>

          {/* Prazo de Inscrição */}
          {action.dates.applicationDeadline && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>
                Inscrições até {formatDate(action.dates.applicationDeadline)}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {action.tags && action.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {action.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
            {action.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                +{action.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Estatísticas */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span>{action.views} visualizações</span>
          <span>{action.applications} candidaturas</span>
        </div>

        {/* Botão de Ação */}
        {showApplyButton && action.status === "active" && (
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openLoginModal"))
            }
            className="w-full btn-primary"
          >
            Quero Participar
          </button>
        )}

        {!showApplyButton && (
          <div className="flex space-x-3">
            <button className="flex-1 btn-secondary">Ver Detalhes</button>
            {action.status === "active" && (
              <button className="flex-1 btn-primary">Editar</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
