import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지 (로그인 여부와 상관없이 접근 가능) */}
        <Route path="/" element={<Home />} />

        {/* PublicRoute를 사용하여 로그인된 사용자가 접근할 수 없도록 설정 */}
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* PrivateRoute를 사용하여 로그인된 사용자만 접근 가능하도록 설정 */}
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        {/* 모든 다른 경로는 메인 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
