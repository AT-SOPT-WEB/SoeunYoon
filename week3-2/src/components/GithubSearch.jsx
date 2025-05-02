import { useState } from 'react';
import LoopLoading from './common/LoopLoading';
import GithubUserCard from './github/GithubUserCard';

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
    <GithubUserCard
        user={userInfo.data}
        onClose={() => setUserInfo({ status: 'idle', data: null })}
    />
    )}
    </div>
  );
}