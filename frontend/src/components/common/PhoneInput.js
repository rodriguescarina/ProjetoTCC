import React, { useState, useEffect } from "react";

const PhoneInput = ({
  value,
  onChange,
  error,
  placeholder = "(00) 00000-0000",
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState("");

  // Formatar telefone enquanto digita
  const formatPhone = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);

    // Aplica a formatação
    if (limitedNumbers.length <= 2) {
      return `(${limitedNumbers}`;
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(
        2,
        6
      )}-${limitedNumbers.slice(6)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(
        2,
        7
      )}-${limitedNumbers.slice(7)}`;
    }
  };

  // Atualizar valor quando prop value mudar
  useEffect(() => {
    if (value) {
      setDisplayValue(formatPhone(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  // Manipular mudança no input
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhone(inputValue);

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
    const formattedValue = formatPhone(cleanText);
    setDisplayValue(formattedValue);

    // Enviar valor limpo para o componente pai
    const cleanValue = formattedValue.replace(/\D/g, "");
    onChange({
      target: {
        name: e.target.name || "phone",
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
        maxLength={15}
        className={error ? "border-red-500" : ""}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
