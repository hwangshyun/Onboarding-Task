import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../api/userApi';
import { useAuthStore } from '../stores/authStore';

const Mypage = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => fetchUserProfile(accessToken!),
    enabled: !!accessToken,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div>
      <h1>My Profile</h1>
      <p>ID: {data?.id}</p>
      <p>Nickname: {data?.nickname}</p>
      <p>Avatar: {data?.avatar ? <img src={data.avatar} alt="avatar" /> : 'No Avatar'}</p>
    </div>
  );
};

export default Mypage;
