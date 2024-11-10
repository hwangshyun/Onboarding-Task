import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* PrivateRoute를 통해 보호된 경로 설정 */}
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        {/* 모든 다른 경로는 로그인 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
