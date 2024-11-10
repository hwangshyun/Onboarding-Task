import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserProfile = async (token: string): Promise<{ id: string; nickname: string; avatar: string | null; success: boolean }> => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
