import React, { useState, useEffect } from "react";

const CNPJInput = ({
  value,
  onChange,
  error,
  placeholder = "00.000.000/0000-00",
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState("");

  // Formatar CNPJ enquanto digita
  const formatCNPJ = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Limita a 14 dígitos
    const limitedNumbers = numbers.slice(0, 14);

    // Aplica a formatação
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 5) {
      return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 8) {
      return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(
        2,
        5
      )}.${limitedNumbers.slice(5)}`;
    } else if (limitedNumbers.length <= 12) {
      return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(
        2,
        5
      )}.${limitedNumbers.slice(5, 8)}/${limitedNumbers.slice(8)}`;
    } else {
      return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(
        2,
        5
      )}.${limitedNumbers.slice(5, 8)}/${limitedNumbers.slice(
        8,
        12
      )}-${limitedNumbers.slice(12)}`;
    }
  };

  // Validar formato do CNPJ
  const validateCNPJ = (cnpj) => {
    const cleanCNPJ = cnpj.replace(/\D/g, "");

    // Deve ter exatamente 14 dígitos
    if (cleanCNPJ.length !== 14) return false;

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;

    // Validar dígitos verificadores
    let sum = 0;
    let weight = 2;

    // Primeiro dígito verificador
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;

    if (parseInt(cleanCNPJ.charAt(12)) !== digit) return false;

    // Segundo dígito verificador
    sum = 0;
    weight = 2;

    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;

    return parseInt(cleanCNPJ.charAt(13)) === digit;
  };

  // Atualizar valor quando prop value mudar
  useEffect(() => {
    if (value) {
      setDisplayValue(formatCNPJ(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  // Manipular mudança no input
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatCNPJ(inputValue);

    setDisplayValue(formattedValue);

    // Enviar valor limpo (apenas números) para o componente pai
    const cleanValue = formattedValue.replace(/\D/g, "");
    onChange({
      target: {
        name: e.target.name,
        value: cleanValue,
        formattedValue: formattedValue,
      },
    });
  };

  // Manipular tecla pressionada
  const handleKeyDown = (e) => {
    // Permitir: backspace, delete, tab, escape, enter, setas
    if ([8, 9, 27, 13, 37, 38, 39, 40].includes(e.keyCode)) {
      return;
    }

    // Permitir Ctrl+A (selecionar tudo), Ctrl+C (copiar), Ctrl+V (colar)
    if (e.ctrlKey && ["a", "c", "v"].includes(e.key)) {
      return;
    }

    // Permitir apenas números
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Manipular evento de colar
  const handlePaste = (e) => {
    e.preventDefault();

    // Obter texto colado
    const pastedText = e.clipboardData.getData("text");

    // Limpar e formatar o texto colado
    const cleanText = pastedText.replace(/\D/g, "");

    // Aplicar formatação
    const formattedValue = formatCNPJ(cleanText);
    setDisplayValue(formattedValue);

    // Enviar valor limpo para o componente pai
    const cleanValue = formattedValue.replace(/\D/g, "");
    onChange({
      target: {
        name: e.target.name || "cnpj",
        value: cleanValue,
        formattedValue: formattedValue,
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        maxLength={18}
        className={error ? "border-red-500" : ""}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {displayValue && displayValue.replace(/\D/g, "").length === 14 && (
        <p
          className={`text-sm mt-1 ${
            validateCNPJ(displayValue) ? "text-green-600" : "text-red-500"
          }`}
        >
          {validateCNPJ(displayValue) ? "✓ CNPJ válido" : "✗ CNPJ inválido"}
        </p>
      )}
    </div>
  );
};

export default CNPJInput;
