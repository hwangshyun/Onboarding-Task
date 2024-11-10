import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signupUser, loginUser } from '../api/authApi';
import { SignupData } from '../types/auth';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: async (data) => {
      alert(data.message);

      try {
        const loginResponse = await loginUser({ id, password });
        setAccessToken(loginResponse.accessToken);
      } catch (error) {
        alert('자동 로그인에 실패했습니다.');
      }
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('password', password);
    formData.append('nickname', nickname);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    signupMutation.mutate(formData as unknown as SignupData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">회원가입</h2>

        <div className="flex flex-col">
          <label htmlFor="id" className="mb-1 text-gray-600 font-semibold">아이디</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-600 font-semibold">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="nickname" className="mb-1 text-gray-600 font-semibold">닉네임</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="avatar" className="mb-1 text-gray-600 font-semibold">프로필 사진 (선택)</label>
          <input
            id="avatar"
            type="file"
            onChange={handleAvatarChange}
            className="border border-gray-300 rounded-lg px-2 py-1"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          회원가입
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          로그인 페이지로 이동
        </button>
      </form>
    </div>
  );
};

export default Signup;
