export interface UserProfile {
    id: string;
    nickname: string;
    avatar: string | null;
  }

export interface UpdateProfileData {
    nickname: string;
    avatar: File | undefined;
  }
  