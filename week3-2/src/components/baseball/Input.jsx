import { useState } from 'react';

export default function Input({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="3자리 숫자를 입력해주세요."
      className="w-full p-3 rounded-lg border border-normalGray focus:outline-none focus:ring-2 focus:ring-skyBlue bg-white shadow-md text-sm"
    />
  );
}