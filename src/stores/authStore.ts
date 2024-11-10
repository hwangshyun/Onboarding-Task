import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'), // 초기화 시 로컬 스토리지 값 가져오기
  setAccessToken: (token) => {
    localStorage.setItem('accessToken', token); // 로컬 스토리지에 토큰 저장
    set({ accessToken: token });
  },
  logout: () => {
    localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
    set({ accessToken: null });
  },
}));
