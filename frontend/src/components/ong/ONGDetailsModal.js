import React, { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { ongsService, apiUtils } from "../../services/api";

const ONGDetailsModal = ({ isOpen, onClose, ongId }) => {
  const [ong, setOng] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && ongId) {
      loadONGDetails();
    }
  }, [isOpen, ongId]);

  const loadONGDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar detalhes da ONG e suas ações
      const [ongResponse, actionsResponse] = await Promise.all([
        ongsService.getById(ongId),
        ongsService.getById(ongId), // A API já retorna as ações recentes
      ]);

      setOng(ongResponse.ong);
      setActions(ongResponse.recentActions || []);
    } catch (err) {
      console.error("Erro ao carregar detalhes da ONG:", err);
      setError(apiUtils.handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOng(null);
    setActions([]);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {loading ? "Carregando..." : ong?.name || "Detalhes da ONG"}
                </h2>
                {ong && (
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border border-purple-200">
                      {ong.area}
                    </span>
                    {ong.isVerified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verificada
                      </span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-12 h-12 border-4 border-purple-200 rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600 mt-4">Carregando detalhes...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Erro ao carregar detalhes
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={loadONGDetails}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : ong ? (
              <div className="space-y-4">
                {/* Informações da ONG */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">ℹ</span>
                    </div>
                    Sobre a Organização
                  </h3>

                  {ong.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                      {ong.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    {/* Localização */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Localização</p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {ong.city}, {ong.state}
                        </p>
                      </div>
                    </div>

                    {/* Telefone */}
                    {ong.phone && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Telefone</p>
                          <p className="font-semibold text-gray-900 text-sm">
                            {ong.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ações em Aberto */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    Ações em Aberto
                    {actions.length > 0 && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {actions.length}
                      </span>
                    )}
                  </h3>

                  {actions.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-gray-400" />
                      </div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">
                        Nenhuma ação em aberto
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Esta ONG não possui ações disponíveis no momento.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {actions.slice(0, 3).map((action) => (
                        <div
                          key={action._id}
                          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1">
                            {action.title}
                          </h4>

                          <div className="flex items-center justify-between text-xs text-gray-600">
                            {/* Localização */}
                            {action.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span className="line-clamp-1">
                                  {typeof action.location === "string"
                                    ? action.location
                                    : `${action.location.city || ""}, ${
                                        action.location.state || ""
                                      }`.replace(/^,\s*|,\s*$/g, "")}
                                </span>
                              </div>
                            )}

                            {/* Vagas */}
                            {action.vacancies && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{action.vacancies} vagas</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {actions.length > 3 && (
                        <div className="text-center">
                          <span className="text-sm text-gray-500">
                            +{actions.length - 3} outras ações disponíveis
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 rounded-b-2xl">
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ONGDetailsModal;
