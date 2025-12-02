import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Home, Building2, FileText, Users, LogOut } from "lucide-react";

const ONGLayout = ({ children }) => {
  const { ong, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/ong",
      icon: Home,
      active: location.pathname === "/ong",
    },
    {
      name: "Perfil",
      path: "/ong/profile",
      icon: Building2,
      active: location.pathname === "/ong/profile",
    },
    {
      name: "Minhas Ações",
      path: "/ong/actions",
      icon: FileText,
      active: location.pathname === "/ong/actions",
    },
    {
      name: "Candidaturas",
      path: "/ong/applications",
      icon: Users,
      active: location.pathname === "/ong/applications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 flex">
      {/* Sidebar */}
      <div className="w-56 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {ong?.name || "ONG"}
              </h2>
              <p className="text-xs text-gray-500 font-medium">Área da ONG</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      item.active
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 text-white shadow-xl transform scale-105"
                        : "text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-lg hover:transform hover:scale-105"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        item.active
                          ? "bg-white/20"
                          : "bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-indigo-100 group-hover:to-purple-100"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-all duration-300 ${
                          item.active
                            ? "text-white"
                            : "text-gray-600 group-hover:text-indigo-600"
                        }`}
                      />
                    </div>
                    <span className="font-semibold text-sm">{item.name}</span>
                    {item.active && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="group w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 rounded-2xl transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-red-100 group-hover:to-pink-100 rounded-lg flex items-center justify-center transition-all duration-300">
              <LogOut className="w-4 h-4 group-hover:text-red-600 transition-all duration-300" />
            </div>
            <span className="font-semibold text-sm">Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {menuItems.find((item) => item.active)?.name || "Dashboard"}
              </h1>
              <p className="text-gray-500 mt-1">
                Gerencie suas ações e voluntários
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Bem-vindo,</p>
                <p className="font-semibold text-gray-900">
                  {ong?.name || "ONG"}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default ONGLayout;
