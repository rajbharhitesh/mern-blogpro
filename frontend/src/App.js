import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/form/LoginPage';
import RegisterPage from './pages/form/RegisterPage';
import PostPage from './pages/post/PostPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CreatePostPage from './pages/post/CreatePostPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/create-post" element={<CreatePostPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
