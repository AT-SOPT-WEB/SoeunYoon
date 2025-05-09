import { useState } from 'react';

export default function Input({
  placeholder = '',
  onSubmit,
  maxLength,
  type = 'text',
  className = '',
}) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full p-3 rounded-lg border border-normalGray focus:outline-none focus:ring-2 focus:ring-skyBlue bg-white shadow-md text-sm ${className}`}
    />
  );
}
