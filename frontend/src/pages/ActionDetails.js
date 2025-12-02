import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { actionsService } from "../services/api";
import ApplicationConfirmationModal from "../components/actions/ApplicationConfirmationModal";
import {
  Calendar,
  MapPin,
  Users,
  Building2,
  Heart,
  Share2,
  ArrowLeft,
  Star,
  Phone,
  Mail,
  Globe,
  Clock as ClockIcon,
  Award,
  Eye,
  MessageCircle,
  Info,
  X,
  CheckCircle,
  Clock,
} from "lucide-react";

const ActionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(false);

  const loadActionDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const actionData = await actionsService.getById(id);
      console.log("Dados da ação recebidos:", actionData);
      setAction(actionData);
    } catch (err) {
      console.error("Erro ao carregar ação:", err);
      setError("Erro ao carregar detalhes da ação");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkApplicationStatus = useCallback(async () => {
    if (!isAuthenticated || !id) return;

    try {
      setCheckingApplication(true);
      const status = await actionsService.getApplicationStatus(id);
      setApplicationStatus(status);
    } catch (err) {
      console.error("Erro ao verificar status de candidatura:", err);

      setApplicationStatus({ hasApplied: false, status: null });
    } finally {
      setCheckingApplication(false);
    }
  }, [isAuthenticated, id]);

  useEffect(() => {
    loadActionDetails();
  }, [id, loadActionDetails]);

  useEffect(() => {
    checkApplicationStatus();
  }, [checkApplicationStatus]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
      return;
    }

    if (applicationStatus?.hasApplied) {
      return;
    }

    try {
      setIsApplying(true);

      await actionsService.apply(id, {
        notes: "Interessado em participar desta ação social.",
      });

      setApplicationStatus({ hasApplied: true, status: "pending" });

      setShowConfirmationModal(true);
    } catch (error) {
      console.error("Erro ao enviar candidatura:", error);
      alert("Erro ao enviar candidatura. Tente novamente.");
    } finally {
      setIsApplying(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getVolunteerStatus = () => {
    const percentage =
      (action?.currentVolunteers / action?.maxVolunteers) * 100;
    if (percentage >= 90)
      return {
        text: "Quase Lotado",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      };
    if (percentage >= 70)
      return {
        text: "Lotação Média",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    return {
      text: "Vagas Disponíveis",
      color: "text-green-600",
      bgColor: "bg-green-100",
    };
  };

  const getButtonConfig = () => {
    if (checkingApplication) {
      return {
        text: "Verificando...",
        disabled: true,
        className: "bg-gray-300 text-gray-600",
        icon: null,
      };
    }

    if (applicationStatus?.hasApplied) {
      const status = applicationStatus.status;
      switch (status) {
        case "pending":
          return {
            text: "Aguardando Contato",
            disabled: true,
            className: "bg-amber-500 text-white",
            icon: <Clock className="w-5 h-5" />,
          };
        case "approved":
          return {
            text: "Candidatura Aprovada",
            disabled: true,
            className: "bg-green-500 text-white",
            icon: <CheckCircle className="w-5 h-5" />,
          };
        case "rejected":
          return {
            text: "Candidatura Rejeitada",
            disabled: true,
            className: "bg-red-500 text-white",
            icon: <X className="w-5 h-5" />,
          };
        default:
          return {
            text: "Já Candidatado",
            disabled: true,
            className: "bg-blue-500 text-white",
            icon: <CheckCircle className="w-5 h-5" />,
          };
      }
    }

    if (action?.currentVolunteers >= action?.maxVolunteers) {
      return {
        text: "Ação Lotada",
        disabled: true,
        className: "bg-gray-300 text-gray-600",
        icon: null,
      };
    }

    return {
      text: isApplying ? "Enviando..." : "Candidatar-se",
      disabled: isApplying,
      className:
        "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:scale-[1.01]",
      icon: isApplying ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : null,
    };
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
            Carregando ação...
          </h3>
          <p className="text-gray-500">Buscando detalhes da ação social</p>
        </div>
      </div>
    );
  }

  if (error || !action) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Erro ao carregar ação
          </h3>
          <p className="text-gray-500 mb-4">{error || "Ação não encontrada"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const volunteerStatus = getVolunteerStatus();
  const filledVolunteers = action?.currentVolunteers || 0;
  const totalVolunteers = action?.maxVolunteers || 0;
  const remainingVolunteers = Math.max(totalVolunteers - filledVolunteers, 0);
  const filledPercentage = totalVolunteers
    ? Math.min((filledVolunteers / totalVolunteers) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com navegação */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section com imagem principal */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Coluna 1: Descrição */}
            <div className="lg:col-span-5 lg:h-80 flex flex-col justify-between">
              <div>
                {/* Badge de área */}
                <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1.5 mb-12 max-w-[120px] sm:max-w-[160px]">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-medium truncate">
                    {action.area}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-0 leading-tight">
                  {action.title}
                </h1>
              </div>

              {/* Contatos no cabeçalho */}
              <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
                {action.contactInfo?.phone && (
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 rounded-full px-5 py-2.5 backdrop-blur-sm">
                    <Phone className="w-5 h-5 text-white/70 shrink-0" />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {action.contactInfo.phone}
                    </span>
                  </div>
                )}
                {action.contactInfo?.email && (
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 rounded-full px-5 py-2.5 backdrop-blur-sm">
                    <Mail className="w-5 h-5 text-white/70 shrink-0" />
                    <span className="text-sm font-medium truncate max-w-[280px]">
                      {action.contactInfo.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Coluna 2: Imagem principal */}
            <div className="relative lg:col-span-4">
              {action.images && action.images[0] ? (
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10">
                  <img
                    src={action.images[0].url}
                    alt={action.images[0].caption || "Imagem da ação"}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-90">
                      {action.images[0].caption || "Imagem da ação"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 bg-gradient-to-br from-blue-100 to-purple-100 h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Building2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Imagem não disponível</p>
                  </div>
                </div>
              )}
            </div>

            {/* Coluna 3: Card Interessado */}
            <div className="lg:col-span-3 bg-gradient-to-br from-white/95 to-emerald-50/70 backdrop-blur rounded-2xl shadow-xl ring-1 ring-emerald-100/60 p-6 lg:h-80 flex flex-col">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Interessado?
                </h3>
                <p className="text-gray-600 text-sm">
                  Junte-se a esta ação social
                </p>
              </div>

              {/* Status das vagas */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    Vagas preenchidas
                  </span>
                  <span className="text-xs font-semibold text-gray-900">
                    {filledVolunteers}/{totalVolunteers}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-[width] duration-700"
                    style={{ width: `${filledPercentage}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-start">
                  <span
                    className={`text-xs font-medium ${volunteerStatus.color}`}
                  >
                    {volunteerStatus.text}
                  </span>
                </div>
              </div>

              <div className="h-px bg-gray-100 mb-4" />

              {/* Botão de candidatura */}
              {(() => {
                const buttonConfig = getButtonConfig();
                return (
                  <button
                    onClick={handleApply}
                    disabled={buttonConfig.disabled}
                    className={`w-full py-3 text-base font-semibold rounded-xl transform transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4 ${buttonConfig.className}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {buttonConfig.icon}
                      {buttonConfig.text}
                    </div>
                  </button>
                );
              })()}

              {/* Informações de contato movidas para fora do card */}
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Coluna principal - Conteúdo */}
          <div className="lg:col-span-2 space-y-12">
            {/* Descrição completa */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                Sobre a Ação
              </h2>

              <div className="prose prose-lg max-w-none">
                {action.description ? (
                  <>
                    {showFullDescription ? (
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {action.description}
                      </div>
                    ) : (
                      <div className="text-gray-700 leading-relaxed">
                        {action.description.split("\n").slice(0, 3).join("\n")}
                        {action.description.split("\n").length > 3 && (
                          <span>...</span>
                        )}
                      </div>
                    )}

                    {action.description.split("\n").length > 3 && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                      >
                        {showFullDescription ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Ver menos
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Ver descrição completa
                          </>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      Esta é uma ação social organizada pela{" "}
                      {action.ong?.name || "nossa organização"} na área de{" "}
                      {action.area || "voluntariado"}.
                    </p>
                    <p className="mb-4">
                      Estamos buscando voluntários comprometidos para participar
                      desta iniciativa que visa fazer a diferença na comunidade.
                    </p>
                    <p>
                      Para mais informações sobre esta ação, entre em contato
                      conosco através dos canais disponíveis.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Requisitos e habilidades */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-green-600" />
                Requisitos e Habilidades
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Requisitos
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {action.requirements ||
                      "Disposição para ajudar, boa vontade e comprometimento. Não são necessárias habilidades específicas, apenas o desejo de fazer a diferença na comunidade."}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Habilidades Desejadas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {action.skills && action.skills.length > 0 ? (
                      action.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Boa comunicação
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Trabalho em equipe
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Empatia
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Comprometimento
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {action.tags && action.tags.length > 0 ? (
                      action.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          #{action.area?.toLowerCase() || "voluntariado"}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          #comunidade
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          #solidariedade
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          #impacto
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Galeria de imagens */}
            {action.images && action.images.length > 1 && (
              <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-600" />
                  Galeria de Imagens
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {action.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden group"
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm">{image.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Informações adicionais */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-orange-600" />
                Informações Adicionais
              </h2>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <p className="text-orange-800 leading-relaxed">
                  {action.additionalInfo ||
                    "Recomendamos trajar roupas confortáveis e adequadas para a atividade. Traga água e lanche se necessário. Em caso de dúvidas, entre em contato conosco através dos canais disponíveis."}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar - Informações e ações (removido o card "Interessado?" daqui) */}
          <div className="space-y-6">
            {/* Informações da ação */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Informações da Ação
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatDate(action.date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      às {formatTime(action.time)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ClockIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {action.duration} horas
                    </p>
                    <p className="text-sm text-gray-600">de duração</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {action.location?.city || "Cidade não informada"},{" "}
                      {action.location?.state || "Estado não informado"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {action.location?.address || "Endereço não informado"}
                    </p>
                    {action.location?.neighborhood && (
                      <p className="text-sm text-gray-600">
                        {action.location.neighborhood}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {action.maxVolunteers} voluntários
                    </p>
                    <p className="text-sm text-gray-600">máximo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações da ONG */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Sobre a ONG
              </h3>

              <div className="text-center mb-4">
                {action.ong?.logo ? (
                  <img
                    src={action.ong.logo}
                    alt={action.ong.name || "Logo da ONG"}
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                )}

                <h4 className="font-semibold text-gray-900 mb-1">
                  {action.ong?.name || "ONG não informada"}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {action.ong?.area || "Área não informada"}
                </p>

                {action.ong?.rating && (
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(action.ong.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      ({action.ong.rating})
                    </span>
                  </div>
                )}

                {action.ong?.totalActions && (
                  <p className="text-xs text-gray-500">
                    {action.ong.totalActions} ações realizadas
                  </p>
                )}
              </div>

              <div className="space-y-3 text-sm">
                {action.ong?.contactInfo?.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {action.ong.contactInfo.phone}
                  </div>
                )}
                {action.ong?.contactInfo?.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {action.ong.contactInfo.email}
                  </div>
                )}
                {action.ong?.contactInfo?.website && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <a
                      href={action.ong.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visitar site
                    </a>
                  </div>
                )}
                {!action.ong?.contactInfo?.phone &&
                  !action.ong?.contactInfo?.email &&
                  !action.ong?.contactInfo?.website && (
                    <div className="text-gray-500 text-sm">
                      <p className="italic mb-2">
                        Informações de contato não disponíveis
                      </p>
                      <p>
                        Esta ONG ainda não disponibilizou informações de
                        contato.
                      </p>
                    </div>
                  )}
              </div>

              {action.ong?._id && (
                <Link
                  to={`/ong/${action.ong._id}`}
                  className="block w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-700 font-medium border border-blue-200 hover:border-blue-300 rounded-lg transition-colors"
                >
                  Ver perfil completo
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de candidatura */}
      <ApplicationConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        actionTitle={action?.title}
        ongName={action?.ong?.name}
      />
    </div>
  );
};

export default ActionDetails;
