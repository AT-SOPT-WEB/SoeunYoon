import { FaGithub, FaBaseballBall } from 'react-icons/fa';

export default function Header({ tab, setTab }) {
  return (
    <header className="bg-black text-white py-8 px-4 shadow-md">
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-bold mb-5 text-center">
          <span role="img" aria-label="flag">🏁</span> 숫자 야구 <span className='text-darkGray'> or </span> Github 검색 <span role="img" aria-label="cat">🔍</span>
        </h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setTab('github')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-200 shadow-sm ${tab === 'github' ? 'bg-black text-white' : 'bg-white text-black hover:bg-lightGray-hover'}`}
          >
            <FaGithub /> <span>Github 검색</span>
          </button>
          <button
            onClick={() => setTab('baseball')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-200 shadow-sm ${tab === 'baseball' ? 'bg-black text-white' : 'bg-white text-black hover:bg-lightGray-hover'}`}
          >
            <FaBaseballBall /> <span>숫자야구</span>
          </button>
        </div>
      </div>
    </header>
  );
}
