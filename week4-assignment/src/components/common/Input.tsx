import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-zinc-800">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-3 pr-4 py-2.5 text-xs text-zinc-700 bg-white rounded-md outline outline-[0.7px] outline-zinc-200 placeholder:text-zinc-500"
      />
    </div>
  );
}
