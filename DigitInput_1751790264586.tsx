import { useEffect, useRef } from "react";

interface DigitInputProps {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  digits: string[];
}

export default function DigitInput({ index, value, onChange, digits }: DigitInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 1 && /^\d*$/.test(inputValue)) {
      onChange(index, inputValue);
      
      // Auto-focus next input
      if (inputValue.length === 1 && index < 3) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value === '' && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digits = pastedText.replace(/\D/g, '').slice(0, 4);
    
    if (digits.length >= 4) {
      for (let i = 0; i < 4; i++) {
        onChange(i, digits[i] || '');
      }
    }
  };

  return (
    <input
      ref={inputRef}
      id={`digit-${index}`}
      type="text"
      maxLength={1}
      value={value}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      className="digit-input w-15 h-15 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl bg-white transition-all duration-300 focus:border-semp-primary focus:ring-4 focus:ring-semp-primary/20 focus:outline-none"
    />
  );
}
