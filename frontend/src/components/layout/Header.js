import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, Building2, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { cn } from "../../utils/cn";
import NotificationBell from "../common/NotificationBell";
import toast from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, userType, user, ong, logout } = useAuthStore();

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout realizado com sucesso!");
  };

  const navigation = [
    { name: "QUEM SOMOS", href: "/quem-somos" },
    { name: "ONGS", href: "/ongs" },
    { name: "CONTEÚDOS", href: "/conteudos" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <img
                src="/logo.png"
                alt="Logo Plataforma de Voluntariado"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center hidden">
                <span className="text-white font-bold text-lg">V</span>
              </div>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Plataforma de Voluntariado
            </span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "text-primary-800"
                    : "text-gray-600 hover:text-primary-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Menu de autenticação */}
          <div className="flex items-center space-x-3">
            {/* Sino de notificações (apenas para usuários autenticados) */}
            {isAuthenticated && <NotificationBell />}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    {userType === "volunteer" ? (
                      <User className="w-4 h-4 text-primary-700" />
                    ) : (
                      <Building2 className="w-4 h-4 text-primary-700" />
                    )}
                  </div>
                  <span className="hidden sm:block">
                    {userType === "volunteer" ? user?.name : ong?.name}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-gray-100 py-2 z-50">
                    <Link
                      to={userType === "volunteer" ? "/voluntario" : "/ong"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                    >
                      Minha Área
                    </Link>
                    <Link
                      to={
                        userType === "volunteer"
                          ? "/voluntario/perfil"
                          : "/ong/perfil"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  // Abrir modal de login
                  window.dispatchEvent(new CustomEvent("openLoginModal"));
                }}
                className="btn-primary"
              >
                LOGIN
              </button>
            )}

            {/* Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-700 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive(item.href)
                      ? "text-primary-800"
                      : "text-gray-600 hover:text-primary-700"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <Link
                    to={userType === "volunteer" ? "/voluntario" : "/ong"}
                    className="text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    Minha Área
                  </Link>
                  <Link
                    to={
                      userType === "volunteer"
                        ? "/voluntario/perfil"
                        : "/ong/perfil"
                    }
                    className="text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
