import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import {
  X,
  Eye,
  EyeOff,
  Heart,
  Building2,
  Mail,
  Lock,
  User,
  MapPin,
  Phone,
} from "lucide-react";
import CNPJInput from "../common/CNPJInput";
import PhoneInput from "../common/PhoneInput";

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState("volunteer");
  const [showPassword, setShowPassword] = useState(false);

  const {
    loginVolunteer,
    loginONG,
    registerVolunteer,
    registerONG,
    isLoading,
    error,
    clearError,
    isAuthenticated,
  } = useAuthStore();

  // Formulários
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    state: "",
    // Campos específicos da ONG
    cnpj: "",
    area: "",
  });

  useEffect(() => {
    const handleOpenModal = (event) => {
      console.log("Evento openLoginModal recebido:", event.detail);
      setIsOpen(true);

      // Verificar se há parâmetros personalizados
      if (event.detail) {
        const { activeTab, userType } = event.detail;
        console.log("Parâmetros recebidos:", { activeTab, userType });
        if (activeTab) setActiveTab(activeTab);
        if (userType) setUserType(userType);
      }

      // Resetar o formulário quando abrir
      setLoginForm({ email: "", password: "" });
    };
    window.addEventListener("openLoginModal", handleOpenModal);

    return () => window.removeEventListener("openLoginModal", handleOpenModal);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsOpen(false);
      clearError();
    }
  }, [isAuthenticated, clearError]);

  const handleClose = () => {
    setIsOpen(false);
    clearError();
    setActiveTab("login");
    setUserType("volunteer");
    setLoginForm({ email: "", password: "" });
    setRegisterForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
      state: "",
      cnpj: "",
      area: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (userType === "volunteer") {
        await loginVolunteer(loginForm);
      } else {
        await loginONG(loginForm);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validações básicas no frontend
    const errors = [];

    if (registerForm.password !== registerForm.confirmPassword) {
      errors.push("As senhas não coincidem");
    }

    if (registerForm.password.length < 6) {
      errors.push("A senha deve ter pelo menos 6 caracteres");
    }

    if (registerForm.name.length < 2) {
      errors.push("O nome deve ter pelo menos 2 caracteres");
    }

    if (registerForm.city.length < 2) {
      errors.push("A cidade deve ter pelo menos 2 caracteres");
    }

    if (registerForm.state.length !== 2) {
      errors.push("O estado deve ter exatamente 2 caracteres");
    }

    if (userType === "ong" && registerForm.cnpj.length !== 14) {
      errors.push("O CNPJ deve ter exatamente 14 dígitos");
    }

    if (errors.length > 0) {
      // Usar o store para mostrar os erros
      useAuthStore.setState({
        error: `Erro de validação: ${errors.join(", ")}`,
      });
      return;
    }

    try {
      console.log("Tentando cadastrar:", { userType, registerForm });

      if (userType === "volunteer") {
        const { name, email, password, phone, city, state } = registerForm;
        const userData = { name, email, password, phone, city, state };
        console.log("Dados do voluntário:", userData);
        await registerVolunteer(userData);
      } else {
        const { name, email, password, cnpj, area, city, state } = registerForm;
        const ongData = { name, email, password, cnpj, area, city, state };
        console.log("Dados da ONG:", ongData);
        await registerONG(ongData);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      // O erro já está sendo tratado no store
    }
  };

  if (!isOpen) return null;

  console.log("Modal renderizando com activeTab:", activeTab);

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
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-indigo-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full max-h-[95vh] overflow-y-auto custom-scrollbar">
          {/* Glassmorphism Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Scroll Indicators */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/95 to-transparent pointer-events-none z-10 rounded-b-3xl"></div>

          {/* Header com gradiente moderno */}
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-6 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
              <div
                className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>

            <div className="relative flex justify-between items-start">
              <div className="flex-1">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold tracking-wide">
                      {activeTab === "login"
                        ? "Bem-vindo de volta!"
                        : "Nova jornada!"}
                    </span>
                  </div>
                </div>

                {/* Título principal */}
                <h2 className="text-2xl md:text-3xl font-bold mb-1.5 leading-tight">
                  {activeTab === "login" ? "Entrar na" : "Junte-se à"}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                    Comunidade
                  </span>
                </h2>

                {/* Subtítulo */}
                <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                  {activeTab === "login"
                    ? "Acesse sua conta e continue fazendo a diferença"
                    : "Crie sua conta e comece sua jornada de voluntariado"}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs com design moderno */}
          <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50">
            <button
              onClick={() => {
                console.log("Tab Login clicada");
                setActiveTab("login");
              }}
              className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 cursor-pointer relative ${
                activeTab === "login"
                  ? "text-indigo-600 bg-white border-b-3 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Entrar
              </div>
              {activeTab === "login" && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => {
                console.log("Tab Cadastrar clicada");
                setActiveTab("register");
              }}
              className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-300 cursor-pointer relative ${
                activeTab === "register"
                  ? "text-indigo-600 bg-white border-b-3 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Cadastrar
              </div>
              {activeTab === "register" && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              )}
            </button>
          </div>

          {/* Tipo de usuário com design moderno */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b border-indigo-100/50">
            <div className="text-center mb-3">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {activeTab === "login" ? "Tipo de Conta" : "Tipo de Cadastro"}
              </h3>
              <p className="text-xs text-gray-600">
                Selecione o tipo de usuário para continuar
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setUserType("volunteer")}
                className={`flex-1 py-2.5 px-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  userType === "volunteer"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/80 backdrop-blur-sm"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Voluntário
                </div>
              </button>
              <button
                onClick={() => setUserType("ong")}
                className={`flex-1 py-2.5 px-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  userType === "ong"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                    : "bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50/80 backdrop-blur-sm"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Building2 className="w-5 h-5" />
                  ONG
                </div>
              </button>
            </div>
          </div>

          {/* Formulários com design moderno */}
          <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
            {error && (
              <div className="mb-4 p-4 bg-gradient-to-r from-red-50 via-red-50 to-pink-50 border border-red-200/50 rounded-2xl text-red-700 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-red-800 mb-1.5 text-base">
                      {activeTab === "login"
                        ? "Erro no login:"
                        : "Erro no cadastro:"}
                    </div>
                    <div className="text-red-700 leading-relaxed">
                      {error.includes("Erro de validação:") ? (
                        <div>
                          <div className="font-semibold mb-3 text-red-800">
                            Por favor, corrija os seguintes problemas:
                          </div>
                          <ul className="list-none space-y-2">
                            {error
                              .replace("Erro de validação: ", "")
                              .split(", ")
                              .map((err, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                                  <span>{err}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-sm">{error}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-2">
                <div className="space-y-1.5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="login-email"
                        name="email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => {
                          setLoginForm({ ...loginForm, email: e.target.value });
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 bg-white text-gray-900 cursor-text"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 pr-10 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                        placeholder="Sua senha"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-blue-50"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full py-3 text-base font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Entrando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Entrar
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-2">
                <div className="space-y-1.5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {userType === "volunteer"
                        ? "Nome Completo"
                        : "Nome da ONG"}
                    </label>
                    <input
                      id="register-name"
                      name="name"
                      type="text"
                      value={registerForm.name}
                      onChange={(e) => {
                        setRegisterForm({
                          ...registerForm,
                          name: e.target.value,
                        });
                      }}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder={
                        userType === "volunteer"
                          ? "Seu nome completo"
                          : "Nome da organização"
                      }
                      required
                      style={{ position: "relative", zIndex: 10 }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => {
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        });
                      }}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="seu@email.com"
                      required
                      style={{ position: "relative", zIndex: 10 }}
                    />
                  </div>

                  {userType === "ong" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-600" />
                          CNPJ
                        </label>
                        <CNPJInput
                          name="cnpj"
                          value={registerForm.cnpj}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              cnpj: e.target.value,
                            })
                          }
                          placeholder="00.000.000/0000-00"
                          required
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 placeholder-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-600" />
                          Área de Atuação
                        </label>
                        <select
                          value={registerForm.area}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              area: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 text-gray-700"
                          required
                        >
                          <option value="">Selecione uma área</option>
                          <option value="Assistência Social">
                            Assistência Social
                          </option>
                          <option value="Educação">Educação</option>
                          <option value="Saúde">Saúde</option>
                          <option value="Meio Ambiente">Meio Ambiente</option>
                          <option value="Cultura">Cultura</option>
                          <option value="Esporte">Esporte</option>
                          <option value="Direitos Humanos">
                            Direitos Humanos
                          </option>
                          <option value="Tecnologia">Tecnologia</option>
                          <option value="Outros">Outros</option>
                        </select>
                      </div>
                    </>
                  )}

                  {userType === "volunteer" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        Telefone
                      </label>
                      <PhoneInput
                        name="phone"
                        value={registerForm.phone}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="(11) 99999-9999"
                        required
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 placeholder-gray-400"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={registerForm.city}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 placeholder-gray-400"
                        placeholder="Sua cidade"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        Estado
                      </label>
                      <select
                        value={registerForm.state}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-700"
                        required
                      >
                        <option value="">UF</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 pr-10 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                        placeholder="Sua senha"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-blue-50"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      Confirmar Senha
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="Confirme sua senha"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full py-3 text-base font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5" />
                        Cadastrar
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
