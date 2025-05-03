interface AuthButtonProps {
    children: string;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
  }
  
  export default function AuthButton({ children, variant = 'primary', onClick }: AuthButtonProps) {
    const baseStyle = 'h-9 text-xs rounded transition';
    const variants = {
      primary: 'bg-darkSky text-white hover:bg-darkSky-hover active:bg-darkSky-active',
      secondary: 'bg-lightSky text-zinc-800 hover:bg-lightSky-hover active:bg-lightSky-active',
    };
  
    return (
      <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  