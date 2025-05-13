export const logout = (navigate: (path: string) => void) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  navigate('/login');
};
