import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface SignupData {
  id: string;
  password: string;
  nickname: string;
}

export const signupUser = async (data: SignupData): Promise<{ message: string; success: boolean }> => {
  console.log("API URL:", API_URL); // API URL 확인용
  console.log("Request Data:", data); // 요청 데이터 확인용

  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Response Status:", response.status); // 응답 상태 코드 확인
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      if (error.response) {
        console.error("Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
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