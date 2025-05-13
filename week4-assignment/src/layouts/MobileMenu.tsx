import { IoClose } from 'react-icons/io5';

interface MobileMenuProps {
  onClose: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function MobileMenu({ onClose, onNavigate, onLogout }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 bg-white/95 z-50 flex flex-col items-center justify-center animate-slide-fade-in">
      <button className="absolute top-5 right-5 text-3xl text-darkSky" onClick={onClose}>
        <IoClose />
      </button>
      <nav className="flex flex-col gap-8 text-lg text-black text-center">
        <button className="hover:text-darkSky" onClick={() => { onNavigate('/mypage/Info'); onClose(); }}>내 정보</button>
        <button className="hover:text-darkSky" onClick={() => { onNavigate('/mypage/search'); onClose(); }}>SOPT 회원 조회</button>
        <button className="hover:text-darkSky" onClick={() => { onLogout(); onClose(); }}>로그아웃</button>
      </nav>
    </div>
  );
}
