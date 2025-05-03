import Logo from '../assets/logo.png';
import Profile from '../assets/profile.jpg';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="w-8 h-8" />
        <span className="text-darkSky font-bold text-lg">회원 조회 서비스</span>
      </div>

      <nav className="flex gap-10">
        <span className="underline text-black text-sm cursor-pointer">내 정보</span>
        <span className="underline text-darkSky text-sm font-semibold cursor-pointer">
          SOPT 회원 조회
        </span>
        <span className="underline text-black text-sm cursor-pointer">로그아웃</span>
      </nav>

      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-lightSky">
        <img src={Profile} alt="profile" className="w-6 h-6 rounded-full" />
        <span className="text-sm font-medium">유저네임</span>
      </div>
    </header>
  );
}
