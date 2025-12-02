import React, { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react";

const MyApplications = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const applications = {
    pending: [
      {
        id: 1,
        actionTitle: "Apoio Educacional para Crianças",
        ongName: "Instituto Esperança",
        status: "pending",
        applicationDate: "2024-01-15",
        actionDate: "2024-02-01",
        statusText: "Aguardando contato",
      },
      {
        id: 2,
        actionTitle: "Limpeza de Praias",
        ongName: "Fundação Cuidar",
        status: "pending",
        applicationDate: "2024-01-10",
        actionDate: "2024-01-25",
        statusText: "Aguardando contato",
      },
    ],
    inProgress: [
      {
        id: 3,
        actionTitle: "Acompanhamento de Idosos",
        ongName: "Centro de Apoio Social",
        status: "in_progress",
        applicationDate: "2024-01-05",
        actionDate: "2024-01-20",
        statusText: "Em andamento",
        startDate: "2024-01-20",
        hours: 12,
      },
    ],
    completed: [
      {
        id: 4,
        actionTitle: "Distribuição de Alimentos",
        ongName: "Associação Futuro Brilhante",
        status: "completed",
        applicationDate: "2023-12-15",
        actionDate: "2023-12-20",
        statusText: "Concluída",
        startDate: "2023-12-20",
        endDate: "2023-12-20",
        hours: 8,
        certificate: true,
      },
    ],
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-warning-500" />;
      case "in_progress":
        return <AlertCircle className="w-5 h-5 text-primary-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-error-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning-100 text-warning-700";
      case "in_progress":
        return "bg-primary-100 text-primary-700";
      case "completed":
        return "bg-success-100 text-success-700";
      case "rejected":
        return "bg-error-100 text-error-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const tabs = [
    {
      id: "pending",
      name: "Aguardando Contato",
      count: applications.pending.length,
    },
    {
      id: "inProgress",
      name: "Em Andamento",
      count: applications.inProgress.length,
    },
    {
      id: "completed",
      name: "Concluídas",
      count: applications.completed.length,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Minhas Candidaturas
        </h1>
        <p className="text-gray-600">
          Acompanhe o status de todas as suas candidaturas para ações
          voluntárias
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
              <span
                className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${
                  activeTab === tab.id
                    ? "bg-primary-100 text-primary-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {applications[activeTab].length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma candidatura encontrada
            </h3>
            <p className="text-gray-500">
              {activeTab === "pending" &&
                "Você ainda não tem candidaturas pendentes."}
              {activeTab === "inProgress" &&
                "Nenhuma ação em andamento no momento."}
              {activeTab === "completed" && "Nenhuma ação concluída ainda."}
            </p>
          </div>
        ) : (
          applications[activeTab].map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    {getStatusIcon(application.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.statusText}
                    </span>
                  </div>

                  {/* Informações da Ação */}
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                    {application.actionTitle}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    <strong>ONG:</strong> {application.ongName}
                  </p>

                  {/* Datas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">
                        Data da Candidatura:
                      </span>
                      <p className="font-medium">
                        {formatDate(application.applicationDate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Data da Ação:
                      </span>
                      <p className="font-medium">
                        {formatDate(application.actionDate)}
                      </p>
                    </div>
                    {application.startDate && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Data de Início:
                        </span>
                        <p className="font-medium">
                          {formatDate(application.startDate)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Informações Adicionais */}
                  {application.hours && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Horas de Voluntariado:
                        </span>
                        <span className="font-semibold text-primary-600">
                          {application.hours}h
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Certificado */}
                  {application.certificate && (
                    <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-success-800">
                            Certificado Disponível
                          </h4>
                          <p className="text-sm text-success-600">
                            Seu certificado de participação está pronto para
                            download
                          </p>
                        </div>
                        <button className="btn-success flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Baixar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="ml-6 flex flex-col space-y-2">
                  <button className="btn-secondary text-sm px-4 py-2">
                    Ver Detalhes
                  </button>
                  {application.status === "pending" && (
                    <button className="btn-error text-sm px-4 py-2">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;
