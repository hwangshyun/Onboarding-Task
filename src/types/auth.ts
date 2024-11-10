export interface SignupData {
    id: string;
    password: string;
    nickname: string;
    avatar?: File | null;
  }
  
  export interface LoginData {
    id: string;
    password: string;
  }