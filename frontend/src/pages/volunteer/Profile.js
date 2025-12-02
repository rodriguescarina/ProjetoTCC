import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    city: "São Paulo",
    state: "SP",
    skills: ["Educação", "Tecnologia", "Comunicação"],
    interests: ["Infância", "Educação", "Meio Ambiente"],
    availability: {
      weekdays: true,
      weekends: false,
      mornings: true,
      afternoons: true,
      evenings: false,
    },
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

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

  const handleSkillToggle = (skill) => {
    const currentSkills = editProfile.skills;
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];
    setEditProfile((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleInterestToggle = (interest) => {
    const currentInterests = editProfile.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];
    setEditProfile((prev) => ({ ...prev, interests: newInterests }));
  };

  const availableSkills = [
    "Educação",
    "Tecnologia",
    "Comunicação",
    "Saúde",
    "Meio Ambiente",
    "Arte",
    "Esporte",
    "Idiomas",
  ];
  const availableInterests = [
    "Infância",
    "Educação",
    "Meio Ambiente",
    "Saúde",
    "Idosos",
    "Animais",
    "Cultura",
    "Esporte",
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-600 text-lg">
              Gerencie suas informações pessoais e preferências de voluntariado
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1"
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
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Informações Básicas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {profile.name}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                    <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {profile.email}
                    </span>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {profile.phone}
                    </span>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                    <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {profile.city}
                    </span>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="BA">Bahia</option>
                    <option value="RS">Rio Grande do Sul</option>
                  </select>
                ) : (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
                    <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {profile.state}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Habilidades */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Habilidades
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => isEditing && handleSkillToggle(skill)}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    editProfile.skills.includes(skill)
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg transform scale-105"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border border-gray-200 hover:from-emerald-100 hover:to-emerald-200 hover:text-emerald-700 hover:shadow-md hover:transform hover:scale-105"
                  } ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Interesses */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Áreas de Interesse
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => isEditing && handleInterestToggle(interest)}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    editProfile.interests.includes(interest)
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border border-gray-200 hover:from-purple-100 hover:to-purple-200 hover:text-purple-700 hover:shadow-md hover:transform hover:scale-105"
                  } ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Disponibilidade
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">
                  Dias da Semana
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editProfile.availability.weekdays}
                      onChange={(e) =>
                        handleInputChange("availability", {
                          ...editProfile.availability,
                          weekdays: e.target.checked,
                        })
                      }
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">Dias úteis</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editProfile.availability.weekends}
                      onChange={(e) =>
                        handleInputChange("availability", {
                          ...editProfile.availability,
                          weekends: e.target.checked,
                        })
                      }
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">Fins de semana</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">Horários</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editProfile.availability.mornings}
                      onChange={(e) =>
                        handleInputChange("availability", {
                          ...editProfile.availability,
                          mornings: e.target.checked,
                        })
                      }
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">Manhãs</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editProfile.availability.afternoons}
                      onChange={(e) =>
                        handleInputChange("availability", {
                          ...editProfile.availability,
                          afternoons: e.target.checked,
                        })
                      }
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">Tardes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editProfile.availability.evenings}
                      onChange={(e) =>
                        handleInputChange("availability", {
                          ...editProfile.availability,
                          evenings: e.target.checked,
                        })
                      }
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">Noites</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Foto do Perfil */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-300">
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <User className="w-14 h-14 text-white" />
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
              {profile.name}
            </h3>
            <p className="text-gray-600 text-lg font-medium">Voluntário</p>
          </div>

          {/* Estatísticas */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900">
                Estatísticas
              </h3>
            </div>
            <div className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  15
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Ações Participadas
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  120
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Horas Doadas
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  8
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Certificados
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
