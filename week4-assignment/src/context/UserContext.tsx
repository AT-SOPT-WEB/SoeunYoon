import { createContext, useContext, useEffect, useState } from 'react';
import { fetchMyNickname } from '../services/userService';

interface UserContextType {
  nickname: string;
  setNickname: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (!storedId) return;

    fetchMyNickname(storedId)
      .then((res) => setNickname(res.data.nickname))
      .catch(() => setNickname(''));
  }, []);

  return (
    <UserContext.Provider value={{ nickname, setNickname }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext must be used within UserProvider');
  return context;
};
