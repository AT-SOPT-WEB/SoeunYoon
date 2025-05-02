import { useState } from 'react';

export default function useGithubSearch() {
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem('recent')) || []);

  // GitHub 사용자 정보 요청
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
  
  // 최근 검색어에서 항목 제거
  const removeRecent = (user) => {
    const updated = recent.filter(id => id !== user);
    setRecent(updated);
    localStorage.setItem('recent', JSON.stringify(updated));
  };

  // 검색 결과 초기화
  const resetUserInfo = () => {
    setUserInfo({ status: 'idle', data: null });
  };

  return {
    userInfo,
    recent,
    getUserInfo,
    removeRecent,
    resetUserInfo,
  };
}
