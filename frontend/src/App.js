import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import { NotificationProvider } from "./contexts/NotificationContext";
import Home from "./pages/Home";
import About from "./pages/About";
import ONGs from "./pages/ONGs";
import Content from "./pages/Content";
import Actions from "./pages/Actions";
import ActionDetails from "./pages/ActionDetails";
import Notifications from "./pages/Notifications";
import LoginModal from "./components/auth/LoginModal";
import VolunteerLayout from "./components/volunteer/VolunteerLayout";
import VolunteerDashboard from "./pages/volunteer/Dashboard";
import VolunteerProfile from "./pages/volunteer/Profile";
import VolunteerApplications from "./pages/volunteer/MyApplications";
import VolunteerCertificates from "./pages/volunteer/Certificates";
import ONGLayout from "./components/ong/ONGLayout";
import ONGDashboard from "./pages/ong/Dashboard";
import ONGProfile from "./pages/ong/Profile";
import ONGActions from "./pages/ong/MyActions";
import ONGApplications from "./pages/ong/Applications";

function App() {
  const { isAuthenticated, userType, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                to="/"
                className="text-xl font-bold text-gray-900 hover:text-blue-600"
              >
                Plataforma de Voluntariado
              </Link>

              <nav className="flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to="/quem-somos"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Sobre
                </Link>
                <Link to="/ongs" className="text-gray-600 hover:text-blue-600">
                  ONGs
                </Link>
                <Link
                  to="/conteudos"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Conteúdos
                </Link>

                {/* Botões de autenticação */}
                {!isAuthenticated ? (
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("openLoginModal"))
                    }
                    className="btn-primary"
                  >
                    Entrar / Cadastrar
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Olá, {userType === "volunteer" ? "Voluntário" : "ONG"}
                    </span>
                    <Link
                      to={userType === "volunteer" ? "/voluntario" : "/ong"}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-red-600"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/ongs" element={<ONGs />} />
            <Route path="/conteudos" element={<Content />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/acao/:id" element={<ActionDetails />} />
            <Route path="/notificacoes" element={<Notifications />} />

            {/* Rotas protegidas - Voluntário */}
            <Route
              path="/voluntario"
              element={
                isAuthenticated && userType === "volunteer" ? (
                  <VolunteerLayout>
                    <VolunteerDashboard />
                  </VolunteerLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como voluntário para acessar
                        esta área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />
            <Route
              path="/volunteer/profile"
              element={
                isAuthenticated && userType === "volunteer" ? (
                  <VolunteerLayout>
                    <VolunteerProfile />
                  </VolunteerLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como voluntário para acessar
                        esta área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />
            <Route
              path="/volunteer/applications"
              element={
                isAuthenticated && userType === "volunteer" ? (
                  <VolunteerLayout>
                    <VolunteerApplications />
                  </VolunteerLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como voluntário para acessar
                        esta área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />
            <Route
              path="/volunteer/certificates"
              element={
                isAuthenticated && userType === "volunteer" ? (
                  <VolunteerLayout>
                    <VolunteerCertificates />
                  </VolunteerLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como voluntário para acessar
                        esta área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />

            {/* Rotas protegidas - ONG */}
            <Route
              path="/ong"
              element={
                isAuthenticated && userType === "ong" ? (
                  <ONGLayout>
                    <ONGDashboard />
                  </ONGLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como ONG para acessar esta
                        área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />
            <Route
              path="/ong/profile"
              element={
                isAuthenticated && userType === "ong" ? (
                  <ONGLayout>
                    <ONGProfile />
                  </ONGLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como ONG para acessar esta
                        área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />
            <Route
              path="/ong/actions"
              element={
                isAuthenticated && userType === "ong" ? (
                  <ONGLayout>
                    <ONGActions />
                  </ONGLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como ONG para acessar esta
                        área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />
            <Route
              path="/ong/applications"
              element={
                isAuthenticated && userType === "ong" ? (
                  <ONGLayout>
                    <ONGApplications />
                  </ONGLayout>
                ) : (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Negado
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Você precisa estar logado como ONG para acessar esta
                        área.
                      </p>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openLoginModal")
                          )
                        }
                        className="btn-primary"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                )
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">
              2025 Plataforma de Voluntariado. Projeto TCC.
            </p>
          </div>
        </footer>

        {/* Modal de login global */}
        <LoginModal />
      </div>
    </NotificationProvider>
  );
}

export default App;
