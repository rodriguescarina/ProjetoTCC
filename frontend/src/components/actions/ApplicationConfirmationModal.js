import React, { useState } from "react";
import {
  CheckCircle,
  X,
  Clock,
  User,
  MessageCircle,
  Heart,
} from "lucide-react";

const ApplicationConfirmationModal = ({
  isOpen,
  onClose,
  actionTitle,
  ongName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header com ícone de sucesso */}
        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-t-2xl p-8 text-center">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Candidatura Enviada!
            </h2>
            <p className="text-green-100 text-sm">
              Sua candidatura foi enviada com sucesso
            </p>
          </div>
        </div>

        {/* Conteúdo do modal */}
        <div className="p-6">
          {/* Informações da ação */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {actionTitle}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {ongName}
                </p>
              </div>
            </div>
          </div>

          {/* Status da candidatura */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">
                  Aguardando Contato
                </h4>
                <p className="text-sm text-amber-700">
                  A ONG receberá sua candidatura e entrará em contato em breve
                </p>
              </div>
            </div>
          </div>

          {/* Próximos passos */}
          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Próximos Passos
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>A ONG analisará sua candidatura</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Você receberá uma notificação sobre o resultado</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Se aprovado, a ONG entrará em contato com mais detalhes
                </span>
              </li>
            </ul>
          </div>

          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Entendi, obrigado!
          </button>
        </div>

        {/* Botão de fechar no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ApplicationConfirmationModal;
