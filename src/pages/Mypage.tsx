import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '../api/userApi';
import { useAuthStore } from '../stores/authStore';
import { UserProfile, UpdateProfileData } from '../types';

const Mypage = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // URL 상태 추가
  const [avatar, setAvatar] = useState<File | null>(null);

  const { data, error, isLoading, refetch } = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: () => fetchUserProfile(accessToken!),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setAvatarUrl(data.avatar || null); // 불러온 avatar URL을 설정
    }
  }, [data]);

  const updateProfileMutation = useMutation({
    mutationFn: (updatedData: UpdateProfileData) =>
      updateUserProfile(accessToken!, updatedData),
    onSuccess: () => {
      alert('프로필이 성공적으로 업데이트되었습니다.');
      refetch(); // 업데이트 후 프로필 정보를 다시 가져옴
      setAvatar(null); // 프로필 이미지 초기화
    },
    onError: () => {
      alert('프로필 업데이트에 실패했습니다.');
    },
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ nickname, avatar: avatar ?? undefined });
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading profile</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>
      
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-600">No Avatar</span>
          )}
        </div>
      </div>
      
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="nickname" className="text-sm font-semibold">Nickname</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your nickname"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="avatar" className="text-sm font-semibold">Change Avatar</label>
          <input
            id="avatar"
            type="file"
            onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Update Profile
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Profile Info:</h2>
        <p className="text-gray-700 mb-2"><strong>ID:</strong> {data?.id}</p>
        <p className="text-gray-700 mb-2"><strong>Nickname:</strong> {nickname}</p>
        <div className="flex items-center">
          <strong className="text-gray-700 mr-2">Avatar:</strong>
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="w-16 h-16 rounded-full" />
          ) : (
            <span className="text-gray-500">No Avatar</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
