import api from './api';

export const fetchMyNickname = async (userId: string) => {
  const response = await api.get(`/members/${userId}`);
  return response.data; // { nickname: string }
};

export const updateNickname = async (userId: string, newNickname: string) => {
  const response = await api.patch(`/members/${userId}`, {
    nickname: newNickname,
  });
  return response.data;
};
