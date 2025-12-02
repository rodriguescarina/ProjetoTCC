import React from "react";
import {
  Award,
  Download,
  Calendar,
  Clock,
  MapPin,
  Building2,
} from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      actionTitle: "Distribuição de Alimentos",
      ongName: "Associação Futuro Brilhante",
      issueDate: "2023-12-20",
      actionDate: "2023-12-20",
      hours: 8,
      location: "São Paulo, SP",
      certificateUrl: "#",
      status: "available",
    },
    {
      id: 2,
      actionTitle: "Apoio Educacional para Crianças",
      ongName: "Instituto Esperança",
      issueDate: "2023-11-15",
      actionDate: "2023-11-10",
      hours: 12,
      location: "São Paulo, SP",
      certificateUrl: "#",
      status: "available",
    },
    {
      id: 3,
      actionTitle: "Limpeza de Praias",
      ongName: "Fundação Cuidar",
      issueDate: "2023-10-30",
      actionDate: "2023-10-28",
      hours: 6,
      location: "Rio de Janeiro, RJ",
      certificateUrl: "#",
      status: "available",
    },
    {
      id: 4,
      actionTitle: "Acompanhamento de Idosos",
      ongName: "Centro de Apoio Social",
      issueDate: "2023-09-20",
      actionDate: "2023-09-18",
      hours: 10,
      location: "Belo Horizonte, MG",
      certificateUrl: "#",
      status: "available",
    },
    {
      id: 5,
      actionTitle: "Plantio de Árvores",
      ongName: "Instituto Verde",
      issueDate: "2023-08-15",
      actionDate: "2023-08-12",
      hours: 4,
      location: "Curitiba, PR",
      certificateUrl: "#",
      status: "available",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleDownload = (certificateId) => {
    console.log(`Baixando certificado ${certificateId}`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Meus Certificados
            </h1>
            <p className="text-gray-600 text-lg">
              Acesse e baixe todos os seus certificados de participação em ações
              voluntárias
            </p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {certificates.length}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            Total de Certificados
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            {certificates.reduce((total, cert) => total + cert.hours, 0)}h
          </div>
          <div className="text-sm text-gray-600 font-medium">Horas Totais</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {new Set(certificates.map((cert) => cert.ongName)).size}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            ONGs Diferentes
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            {
              new Set(certificates.map((cert) => cert.location.split(", ")[1]))
                .size
            }
          </div>
          <div className="text-sm text-gray-600 font-medium">Estados</div>
        </div>
      </div>

      {/* Lista de Certificados */}
      <div className="space-y-6">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                      {certificate.actionTitle}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      <span className="font-semibold text-gray-700">ONG:</span>{" "}
                      {certificate.ongName}
                    </p>
                  </div>
                </div>

                {/* Informações */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                        Data da Ação
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatDate(certificate.actionDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-2xl">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-600 font-semibold uppercase tracking-wide">
                        Emissão
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatDate(certificate.issueDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-2xl">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                        Horas
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {certificate.hours}h
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-2xl">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-orange-600 font-semibold uppercase tracking-wide">
                        Local
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {certificate.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-300">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Disponível para Download</span>
                </div>
              </div>

              {/* Botão de Download */}
              <div className="ml-6">
                <button
                  onClick={() => handleDownload(certificate.id)}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:-translate-y-1"
                >
                  <Download className="w-5 h-5" />
                  <span>Baixar Certificado</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há certificados */}
      {certificates.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            Nenhum certificado encontrado
          </h3>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Você ainda não tem certificados de participação em ações
            voluntárias.
          </p>
        </div>
      )}

      {/* Informações sobre Certificados */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-heading font-bold mb-6">
            Sobre os Certificados
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Os certificados são emitidos automaticamente após a conclusão de
            cada ação voluntária. Eles documentam sua participação e podem ser
            usados para comprovar horas de voluntariado em processos seletivos,
            currículos e outras situações que requeiram comprovação de
            experiência social.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold">✓</div>
              </div>
              <p className="text-lg font-semibold">Validação oficial da ONG</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold">✓</div>
              </div>
              <p className="text-lg font-semibold">Horas documentadas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold">✓</div>
              </div>
              <p className="text-lg font-semibold">Download ilimitado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
