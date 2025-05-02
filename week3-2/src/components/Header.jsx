export default function Header({ tab, setTab }) {
    return (
      <header className="bg-blue-800 text-white py-4 text-center">
        <h1 className="text-xl font-bold mb-2">
          🏳️ 숫자야구 || 깃허브 검색 😺
        </h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setTab('github')}
            className={`px-4 py-2 rounded ${tab === 'github' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            깃허브 검색 🔍
          </button>
          <button
            onClick={() => setTab('baseball')}
            className={`px-4 py-2 rounded ${tab === 'baseball' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            숫자야구 🏳️
          </button>
        </div>
      </header>
    );
  }
  