import axios from 'axios';

export const fetchUserProfile = async (accessToken: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (
  accessToken: string,
  data: { nickname: string; avatar?: File }
) => {
  const formData = new FormData();
  formData.append('nickname', data.nickname);
  if (data.avatar) formData.append('avatar', data.avatar);

  const response = await axios.patch(`${import.meta.env.VITE_API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
