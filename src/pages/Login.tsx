import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      alert('로그인 성공');
      navigate('/mypage'); // 보호된 페이지로 리다이렉트
    },
    onError: () => {
      alert('로그인에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
