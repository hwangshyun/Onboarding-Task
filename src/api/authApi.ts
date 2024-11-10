import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface SignupData {
  id: string;
  password: string;
  nickname: string;
}

export const signupUser = async (data: SignupData): Promise<{ message: string; success: boolean }> => {
  const response = await axios.post(`${API_URL}/register`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// 환경 변수 값 확인용 콘솔 출력
console.log("API URL:", API_URL);

interface LoginData {
  id: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};