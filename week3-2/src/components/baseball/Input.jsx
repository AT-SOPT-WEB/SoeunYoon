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
      className="w-full p-3 rounded-full border border-blue-500 bg-blue-100"
    />
  );
}