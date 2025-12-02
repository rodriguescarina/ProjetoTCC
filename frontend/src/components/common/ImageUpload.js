import React, { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";

const ImageUpload = ({
  currentImage,
  onUpload,
  onRemove,
  type = "logo",
  className = "",
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem!");
        return;
      }

      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("O arquivo deve ter no máximo 5MB!");
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Fazer upload
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    try {
      setIsUploading(true);
      const result = await onUpload(file);

      if (result) {
        setPreview(null);
        // Recarregar a página para mostrar a nova imagem
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao fazer upload da imagem. Tente novamente.");
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      await onRemove();
      setPreview(null);
      // Recarregar a página
      window.location.reload();
    } catch (error) {
      console.error("Erro ao remover imagem:", error);
      alert("Erro ao remover a imagem. Tente novamente.");
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Área de upload */}
      <div className="relative group">
        {/* Imagem atual ou preview */}
        {(currentImage || preview) && (
          <div className="relative">
            <img
              src={preview || currentImage}
              alt={type === "logo" ? "Logo da ONG" : "Banner da ONG"}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Overlay com botões */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <div className="flex space-x-2">
                <button
                  onClick={openFileDialog}
                  disabled={disabled || isUploading}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  title="Alterar imagem"
                >
                  <Camera className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={handleRemove}
                  disabled={disabled || isUploading}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  title="Remover imagem"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Área de upload quando não há imagem */}
        {!currentImage && !preview && (
          <div
            onClick={openFileDialog}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              Clique para{" "}
              {type === "logo" ? "adicionar logo" : "adicionar banner"}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
          </div>
        )}

        {/* Loading overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <div className="bg-white rounded-lg p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Enviando...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

