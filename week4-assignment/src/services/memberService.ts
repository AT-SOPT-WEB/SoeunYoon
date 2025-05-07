import api from './api';

export const fetchAllMembers = async (search?: string) => {
  const response = await api.get('/members', {
    params: search ? { nickname: search } : {},
  });
  return response.data;
};
