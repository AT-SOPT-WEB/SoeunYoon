interface ButtonProps {
  children: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyle = 'h-9 text-xs rounded transition px-4';
  const variants = {
    primary: 'bg-darkSky text-white hover:bg-darkSky-hover active:bg-darkSky-active',
    secondary: 'bg-lightSky text-zinc-800 hover:bg-lightSky-hover active:bg-lightSky-active',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
