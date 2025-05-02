import { useState } from 'react';

export default function GithubSearch() {
  const [input, setInput] = useState('');
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem('recent')) || []);

  const getUserInfo = async (user) => {
    setUserInfo({ status: 'pending', data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setUserInfo({ status: 'resolved', data });
      setRecent(prev => {
        const updated = [user, ...prev.filter(id => id !== user)].slice(0, 3);
        localStorage.setItem('recent', JSON.stringify(updated));
        return updated;
      });
    } catch {
      setUserInfo({ status: 'rejected', data: null });
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      getUserInfo(input.trim());
    }
  };

  const removeRecent = (user) => {
    const updated = recent.filter(id => id !== user);
    setRecent(updated);
    localStorage.setItem('recent', JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-md px-4">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Github 프로필을 검색해보세요."
        className="w-full p-3 rounded-lg border border-normalGray focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-md text-sm"
      />
      <div className="flex flex-wrap gap-2 mt-3">
        {recent.map(user => (
          <span key={user} className="bg-lightGray px-3 py-1 rounded-full border border-normalGray flex items-center gap-1 text-sm">
            {user} <button onClick={() => removeRecent(user)} className="text-darkGray hover:text-black">×</button>
          </span>
        ))}
      </div>

      {userInfo.status === 'pending' && <p className="mt-4 text-center text-darkGray">로딩 중...</p>}
      {userInfo.status === 'rejected' && <p className="mt-4 text-center text-red-500 font-semibold">검색 결과를 찾을 수 없습니다.</p>}
      {userInfo.status === 'resolved' && (
        <div className="mt-6 bg-[#1e2a47] text-white rounded-xl p-5 shadow-card">
          <button className="float-right text-white hover:text-red-400 font-bold" onClick={() => setUserInfo({ status: 'idle', data: null })}>×</button>
          <img
            src={userInfo.data.avatar_url}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto cursor-pointer border-4 border-white"
            onClick={() => window.open(userInfo.data.html_url, '_blank')}
          />
          <p className="text-center mt-4 font-bold text-xl cursor-pointer" onClick={() => window.open(userInfo.data.html_url)}>{userInfo.data.name}</p>
          <p className="text-center text-sm opacity-80">{userInfo.data.login}</p>
          <div className="flex justify-around mt-6 text-sm">
            <div className="text-center">
              <p className="opacity-70">Followers</p>
              <p className="font-semibold text-lg">{userInfo.data.followers}</p>
            </div>
            <div className="text-center">
              <p className="opacity-70">Following</p>
              <p className="font-semibold text-lg">{userInfo.data.following}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
