import { AxiosError } from 'axios';
import api from './api';

export const fetchAllMembers = async (keyword?: string) => {
  try {
    const response = await api.get('/api/v1/users', {
      params: keyword ? { keyword } : {},
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || '닉네임 목록 조회 중 오류가 발생했습니다.');
  }
};
