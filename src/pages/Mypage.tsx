import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '../api/userApi';
import { useAuthStore } from '../stores/authStore';
import { UserProfile, UpdateProfileData } from '../types';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); 
  const [avatar, setAvatar] = useState<File | null>(null);
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: () => fetchUserProfile(accessToken!),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setAvatarUrl(data.avatar || null);
    }
  }, [data]);

  const updateProfileMutation = useMutation({
    mutationFn: (updatedData: UpdateProfileData) =>
      updateUserProfile(accessToken!, updatedData),
    onSuccess: () => {
      alert('프로필이 성공적으로 업데이트되었습니다.');
      refetch();
      setAvatar(null); 
    },
    onError: () => {
      alert('프로필 업데이트에 실패했습니다.');
    },
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ nickname, avatar: avatar ?? undefined });
  };

  if (isLoading) return <div className="text-center">로딩중...</div>;
  if (error) return <div className="text-center text-red-500">프로필을 불러오지 못했습니다.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">내 프로필</h1>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-600">프로필 사진이 없습니다.</span>
            )}
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="nickname" className="text-sm font-semibold text-gray-600">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="닉네임을 입력하세요"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="avatar" className="text-sm font-semibold text-gray-600">프로필 사진 변경</label>
            <input
              id="avatar"
              type="file"
              onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            프로필 수정하기
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors mt-4"
        >
          메인 페이지로 이동
        </button>
      </div>
    </div>
  );
};

export default Mypage;
