import PostList from '../../components/post/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import { posts, categories } from '../../dummyData';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to Blog</h1>
        </div>
      </div>
      <div className="home-latest-post">Latest Posts</div>
      <div className="home-container">
        <PostList posts={posts.slice(0, 3)} />
        <Sidebar categories={categories} />
      </div>
      <div className="home-see-posts-link">
        <Link className="home-link" to="/posts">
          See all Posts
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
