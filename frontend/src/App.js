import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import Header from './components/header/Header';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/form/LoginPage';
import RegisterPage from './pages/form/RegisterPage';
import PostsPage from './pages/post/posts/PostsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CreatePostPage from './pages/post/createPost/CreatePostPage';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/create-post" element={<CreatePostPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
