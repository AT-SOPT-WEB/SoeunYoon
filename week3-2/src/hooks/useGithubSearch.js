import { useState, useRef } from 'react';

export default function useGithubSearch() {
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem('recent')) || []);
  const recentCache = useRef({}); 

  const getUserInfo = async (user) => {
    if (recentCache.current[user]) {
      setUserInfo({ status: 'resolved', data: recentCache.current[user] });

      setRecent(prev => {
        const updated = [...prev.filter(id => id !== user), user].slice(-3);
        localStorage.setItem('recent', JSON.stringify(updated));
        return updated;
      });
      return;
    }

    setUserInfo({ status: 'pending', data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error();
      const data = await response.json();

      recentCache.current[user] = data;
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

  const removeRecent = (user) => {
    const updated = recent.filter(id => id !== user);
    setRecent(updated);
    localStorage.setItem('recent', JSON.stringify(updated));
  };

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
