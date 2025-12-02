import React, { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { ongsService } from "../../services/api";

const Profile = () => {
  const { ong } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    cnpj: "",
    area: "",
    description: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    website: "",
    socialMedia: {
      facebook: "",
      instagram: "@institutoesperanca",
      linkedin: "instituto-esperanca",
    },
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const [profileRes, statsRes] = await Promise.all([
          ongsService.getProfile(),
          ongsService.getStats(),
        ]);
        const response = profileRes;
        if (response.ong) {
          const ongData = {
            name: response.ong.name || "",
            cnpj: response.ong.cnpj || "",
            area: response.ong.area || "",
            description: response.ong.description || "",
            contactPerson: response.ong.contactPerson || "",
            email: response.ong.email || "",
            phone: response.ong.phone || "",
            city: response.ong.city || "",
            state: response.ong.state || "",
            address: response.ong.address?.street
              ? `${response.ong.address.street}, ${
                  response.ong.address.number || ""
                } - ${response.ong.address.neighborhood || ""}`
              : "",
            website: response.ong.website || "",
            socialMedia: {
              facebook: response.ong.socialMedia?.facebook || "",
              instagram: response.ong.socialMedia?.instagram || "",
              linkedin: response.ong.socialMedia?.linkedin || "",
            },
          };
          setProfile(ongData);
          setEditProfile(ongData);
        }
        setStats(statsRes?.stats || null);
      } catch (error) {
        console.error("Erro ao carregar perfil da ONG:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setEditProfile((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value },
    }));
  };

  const areas = [
    "Educação",
    "Saúde",
    "Meio Ambiente",
    "Assistência Social",
    "Cultura",
    "Esporte",
    "Direitos Humanos",
    "Tecnologia",
    "Outros",
  ];
  const states = [
    "SP",
    "RJ",
    "MG",
    "BA",
    "RS",
    "PR",
    "SC",
    "GO",
    "PE",
    "CE",
    "PA",
    "MA",
    "MT",
    "MS",
    "RO",
    "TO",
    "PI",
    "RN",
    "PB",
    "AL",
    "SE",
    "AP",
    "RR",
    "AC",
    "AM",
    "DF",
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Perfil da Instituição
            </h1>
            <p className="text-gray-600 text-lg">
              Gerencie as informações da sua organização
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
          >
            <Edit className="w-4 h-4" />
            <span>Editar Perfil</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
            >
              <Save className="w-4 h-4" />
              <span>Salvar</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
            >
              <X className="w-4 h-4" />
              <span>Cancelar</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
              Informações Básicas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Instituição
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.cnpj}
                    onChange={(e) => handleInputChange("cnpj", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="00.000.000/0000-00"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profile.cnpj}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área de Atuação
                </label>
                {isEditing ? (
                  <select
                    value={editProfile.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  >
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profile.area}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pessoa de Contato
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">
                      {profile.contactPerson}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição da Instituição
              </label>
              {isEditing ? (
                <textarea
                  value={editProfile.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-900">{profile.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
              Informações de Contato
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editProfile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profile.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profile.city}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                {isEditing ? (
                  <select
                    value={editProfile.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profile.state}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Endereço */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço Completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{profile.address}</span>
                </div>
              )}
            </div>

            {/* Website */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={editProfile.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-900">{profile.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
              Redes Sociais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.socialMedia.facebook}
                    onChange={(e) =>
                      handleSocialMediaChange("facebook", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="Nome do perfil"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">
                      {profile.socialMedia.facebook}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.socialMedia.instagram}
                    onChange={(e) =>
                      handleSocialMediaChange("instagram", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="@usuario"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">
                      {profile.socialMedia.instagram}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.socialMedia.linkedin}
                    onChange={(e) =>
                      handleSocialMediaChange("linkedin", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="Nome do perfil"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900">
                      {profile.socialMedia.linkedin}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo da Instituição */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            {/* Banner da ONG (somente exibição) */}
            <div className="h-32 relative">
              {profile.banner ? (
                <img
                  src={profile.banner}
                  alt={`Banner da ${profile.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">ONG</p>
                  </div>
                </div>
              )}
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6 text-center">
              <div className="relative inline-block mb-4 -mt-12">
                <div className="w-24 h-24 bg-gradient-secondary rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  {profile.logo ? (
                    <img
                      src={profile.logo}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">
                {profile.name}
              </h3>
              <p className="text-gray-600 text-sm">{profile.area}</p>
            </div>
          </div>

          {/* Estatísticas (dados reais da ONG logada) */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h3 className="font-heading font-semibold text-gray-900 mb-4">
              Estatísticas
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">
                  {stats?.activeActions ?? 0}
                </div>
                <div className="text-sm text-gray-600">Ações Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">
                  {stats?.pendingApplications ?? 0}
                </div>
                <div className="text-sm text-gray-600">
                  Candidaturas Pendentes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">
                  {stats?.totalVolunteers ?? 0}
                </div>
                <div className="text-sm text-gray-600">Voluntários</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">
                  {(stats?.rating ?? 0).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Status de Verificação */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h3 className="font-heading font-semibold text-gray-900 mb-4">
              Status da Conta
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Verificação</span>
                <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
                  Verificada
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
                  Ativa
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email</span>
                <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
                  Verificado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
