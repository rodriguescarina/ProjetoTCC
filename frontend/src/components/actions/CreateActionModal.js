import React, { useState } from "react";
import { X } from "lucide-react";
import { actionsService, apiUtils } from "../../services/api";

const CreateActionModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    area: "",
    location: {
      city: "",
      state: "",
      address: "",
      neighborhood: "",
    },
    date: "",
    time: "",
    duration: "",
    maxVolunteers: "",
    requirements: "",
    skills: "",
    tags: "",
    contactInfo: {
      phone: "",
      email: "",
      whatsapp: "",
    },
    additionalInfo: "",
    mainImageUrl: "",
    mainImageCaption: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const areas = [
    "Assistência Social",
    "Educação",
    "Saúde",
    "Meio Ambiente",
    "Cultura",
    "Esporte",
    "Direitos Humanos",
    "Tecnologia",
    "Outros",
  ];

  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lidar com campos aninhados
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Converter tags e skills de string para array
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const actionData = {
        title: formData.title,
        description: formData.description,
        area: formData.area,
        location: formData.location,
        date: new Date(formData.date).toISOString(),
        time: formData.time,
        duration: formData.duration ? parseFloat(formData.duration) : undefined,
        maxVolunteers: parseInt(formData.maxVolunteers),
        requirements: formData.requirements,
        skills,
        tags,
        contactInfo: formData.contactInfo,
        additionalInfo: formData.additionalInfo,
        images: formData.mainImageUrl
          ? [
              {
                url: formData.mainImageUrl,
                caption: formData.mainImageCaption || "",
              },
            ]
          : [],
      };

      await actionsService.create(actionData);

      // Limpar formulário
      setFormData({
        title: "",
        description: "",
        area: "",
        location: {
          city: "",
          state: "",
          address: "",
          neighborhood: "",
        },
        date: "",
        time: "",
        duration: "",
        maxVolunteers: "",
        requirements: "",
        skills: "",
        tags: "",
        contactInfo: {
          phone: "",
          email: "",
          whatsapp: "",
        },
        additionalInfo: "",
        mainImageUrl: "",
        mainImageCaption: "",
      });

      onSuccess();
      onClose();
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Criar Nova Ação Social
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Título e Área */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da Ação *
                </label>
                <input
                  id="action-title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ex: Ação Social na Comunidade"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área de Atuação *
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Selecione uma área</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input resize-none"
                placeholder="Descreva detalhadamente a ação social..."
                required
              />
            </div>

            {/* Localização */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="input"
                  placeholder="Sua cidade"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">UF</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  className="input"
                  placeholder="Endereço completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  name="location.neighborhood"
                  value={formData.location.neighborhood}
                  onChange={handleChange}
                  className="input"
                  placeholder="Bairro (opcional)"
                />
              </div>
            </div>

            {/* Data, Hora, Duração e Voluntários */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duração (horas)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input"
                  placeholder="2.5"
                  min="0.5"
                  max="24"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Máx. Voluntários *
                </label>
                <input
                  type="number"
                  name="maxVolunteers"
                  value={formData.maxVolunteers}
                  onChange={handleChange}
                  className="input"
                  placeholder="10"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Requisitos, Skills e Tags */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requisitos
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="input resize-none"
                  placeholder="Habilidades ou requisitos necessários..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ex: liderança, comunicação, primeiros socorros"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separe as skills por vírgula
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ex: família, educação, saúde (separadas por vírgula)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separe as tags por vírgula
                </p>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                className="input"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                className="input"
                placeholder="contato@ong.org"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                name="contactInfo.whatsapp"
                value={formData.contactInfo.whatsapp}
                onChange={handleChange}
                className="input"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          {/* Informações Adicionais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informações Adicionais
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              className="input resize-none"
              placeholder="Informações extras, instruções específicas, etc..."
            />
          </div>

          {/* Imagem Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL da Imagem Principal
              </label>
              <input
                type="url"
                name="mainImageUrl"
                value={formData.mainImageUrl}
                onChange={handleChange}
                className="input"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legenda da Imagem
              </label>
              <input
                type="text"
                name="mainImageCaption"
                value={formData.mainImageCaption}
                onChange={handleChange}
                className="input"
                placeholder="Descrição breve (opcional)"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary px-6 py-2"
            >
              {isLoading ? "Criando..." : "Criar Ação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActionModal;
