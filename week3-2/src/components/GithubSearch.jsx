import { useState } from 'react';
import LoopLoading from './common/LoopLoading';

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
        const updated = [...prev.filter(id => id !== user), user].slice(-3);
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
        className="w-full p-3 rounded-lg border border-normalGray focus:outline-none focus:ring-2 focus:ring-skyBlue bg-white shadow-md text-sm"
      />
    <div className="flex flex-row-reverse flex-wrap gap-2 mt-3 justify-end">
    {[...recent].reverse().map(user => (
        <span
            key={user}
            className="bg-lightGray hover:bg-lightGray-hover active:bg-lightGray-active px-3 py-1 rounded-full border border-normalGray flex items-center gap-1 text-sm cursor-pointer"
            onClick={() => getUserInfo(user)}
        >
        {user}
        <button
            onClick={(e) => { e.stopPropagation(); removeRecent(user); }}
            className="text-darkGray hover:text-black"
        >
            ×
        </button>
        </span>
    ))}
    </div>

    {userInfo.status === 'idle' && (
        <div className="mt-8 text-center text-darkGray text-sm">
            검색어를 입력하고 <span className="font-semibold">Enter</span>를 눌러 Github 유저를 검색해보세요.
        </div>
    )}


    {userInfo.status === 'pending' && (
        <div className="mt-6 flex justify-center">
            <LoopLoading size={200} />
        </div>
    )}

    {userInfo.status === 'rejected' && (
    <div className="mt-6 p-5 text-center rounded-xl bg-lightGray border border-normalGray">
        <p className="text-2xl mb-2">😕</p>
        <p className="text-sm text-darkGray">검색 결과를 찾을 수 없습니다.</p>
        <p className="text-xs text-darkGray mt-1">사용자명이 정확한지 확인해주세요.</p>
    </div>
    )}

    
    {userInfo.status === 'resolved' && (
        <div className="mt-6 bg-deepBlue text-white rounded-xl p-5 shadow-card">
          <button className="float-right text-white hover:text-red-400 font-bold" onClick={() => setUserInfo({ status: 'idle', data: null })}>×</button>
          <img
            src={userInfo.data.avatar_url}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto cursor-pointer border-4 border-white"
            onClick={() => window.open(userInfo.data.html_url, '_blank')}
          />
          <p className="text-center mt-4 font-bold text-xl cursor-pointer" onClick={() => window.open(userInfo.data.html_url)}>{userInfo.data.name}</p>
          <p className="text-center text-sm opacity-80">{userInfo.data.login}</p>
          {userInfo.data.bio && (
            <p className="text-center text-sm mt-2 italic text-lightGray">
                {userInfo.data.bio}
            </p>
          )}
          <a
            href={userInfo.data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 mx-auto w-fit text-center text-sm font-medium px-4 py-1 rounded-full bg-white text-deepBlue hover:bg-gray-200 transition"
          >
            GitHub 프로필 방문하기 →
          </a>
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