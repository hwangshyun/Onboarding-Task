// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signupUser } from '../api/authApi';

interface SignupData {
  id: string;
  password: string;
  nickname: string;
}

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // mutationFn을 명확하게 설정
  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error) => {
      alert('회원가입에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, password, nickname });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Signup;
