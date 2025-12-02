import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, FileText, Award, LogOut, Settings } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

const VolunteerSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navigation = [
    {
      name: "Minhas Candidaturas",
      href: "/voluntario",
      icon: FileText,
      current: location.pathname === "/voluntario",
    },
    {
      name: "Meu Perfil",
      href: "/voluntario/perfil",
      icon: User,
      current: location.pathname === "/voluntario/perfil",
    },
    {
      name: "Certificados",
      href: "/voluntario/certificados",
      icon: Award,
      current: location.pathname === "/voluntario/certificados",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-soft z-40">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-gray-900">
                Área do Voluntário
              </h2>
              <p className="text-sm text-gray-500">
                {user?.name || "Voluntário"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-primary-50 text-primary-700 border border-primary-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSidebar;
