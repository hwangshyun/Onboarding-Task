export interface UserProfile {
    id: string;
    nickname: string;
    avatar: string | null;
  }

export interface UpdateProfileData {
    nickname: string;
    avatar: File | undefined; // null 대신 undefined로 변경
  }
  