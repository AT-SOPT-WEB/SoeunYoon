import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';
import Logo from '../assets/logo.png';
import Profile from '../assets/profile.jpg';
import { useUser } from '../context/UserContext';
import MobileMenu from './MobileMenu';
import { logout } from '../utils/auth';
import { NAV_ITEMS } from '../constants/navigation';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="w-8 h-8" />
        <span className="text-darkSky font-bold text-lg">회원 조회 서비스</span>
      </div>

      <nav className="hidden md:flex gap-10 text-sm">
        {NAV_ITEMS.map(({ label, path }) => (
          <span
            key={path}
            onClick={() => navigate(path)}
            className={`underline cursor-pointer ${
              isActive(path)
                ? 'text-darkSky font-semibold'
                : 'text-black hover:text-darkSky-hover active:text-darkSky-active'
            }`}
          >
            {label}
          </span>
        ))}
        <span
          onClick={handleLogout}
          className="underline cursor-pointer text-black hover:text-darkSky-hover active:text-darkSky-active"
        >
          로그아웃
        </span>
      </nav>

      <button
        className="md:hidden text-2xl text-darkSky"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <IoClose /> : <IoMenu />}
      </button>

      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-lightSky">
        <img src={Profile} alt="profile" className="w-6 h-6 rounded-full" />
        <span className="text-sm font-medium text-black">{nickname || '...'}</span>
      </div>

      {menuOpen && (
        <MobileMenu
          onClose={() => setMenuOpen(false)}
          onNavigate={navigate}
          onLogout={() => {
            handleLogout();
            setMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}
