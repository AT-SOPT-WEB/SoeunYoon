import React from 'react';

type ButtonColor = 'darkSky' | 'normalGray' | 'normalSky';

interface SearchButtonProps {
  name?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  color?: ButtonColor;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function SearchButton({
  name = '검색하기',
  onClick,
  className = '',
  type = 'button',
  color = 'darkSky',
  children,
  disabled = false,
}: SearchButtonProps) {
  const styleByColor: Record<ButtonColor, string> = {
    darkSky: 'bg-darkSky text-white',
    normalGray: 'bg-normalGray text-black',
    normalSky: 'bg-normalSky text-white',
  };

  const colorStyle = styleByColor[color];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg ${colorStyle} px-4 py-2 tracking-tight ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
      }`}
    >
      {children}
      {name}
    </button>
  );
}
