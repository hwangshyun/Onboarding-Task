import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Home = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMypageClick = () => {
    navigate('/mypage');
  };

  const handleLogoutClick = () => {
    logout();
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Welcome to Our Site</h1>
        <p className="text-base md:text-lg text-gray-600 text-center mb-6">
          {accessToken ? '마이페이지로 이동하세요.' : '로그인하여 더 많은 기능을 이용하세요.'}
        </p>

        <div className="flex flex-col space-y-4">
          {accessToken ? (
            <>
              <button
                onClick={handleMypageClick}
                className="px-4 py-2 md:px-6 md:py-3 w-full bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                마이페이지로 이동
              </button>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 md:px-6 md:py-3 w-full bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 md:px-6 md:py-3 w-full bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              로그인 페이지로 이동
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
