import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo e descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-lg font-bold">Voluntariado</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md text-sm">
              Conectando voluntários e instituições filantrópicas para criar um
              mundo melhor. Faça a diferença na sua comunidade através do
              voluntariado.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-base font-semibold mb-3">Links Rápidos</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/quem-somos"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  to="/ongs"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  ONGs
                </Link>
              </li>
              <li>
                <Link
                  to="/conteudos"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Conteúdos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="w-3 h-3" />
                <span>contato@voluntariado.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="w-3 h-3" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="w-3 h-3" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              2025 Plataforma de Voluntariado. Projeto TCC.
            </p>
            <div className="flex items-center space-x-3 mt-3 md:mt-0">
              <Link
                to="/termos"
                className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
              >
                Termos de Uso
              </Link>
              <Link
                to="/privacidade"
                className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/lgpd"
                className="text-gray-400 hover:text-white text-xs transition-colors duration-200"
              >
                LGPD
              </Link>
            </div>
          </div>
        </div>

        {/* Mensagem de agradecimento */}
        <div className="text-center mt-6 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-xs flex items-center justify-center space-x-2">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>para a comunidade</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
