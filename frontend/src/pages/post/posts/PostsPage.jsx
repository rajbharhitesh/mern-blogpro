import { useEffect } from 'react';
import { posts, categories } from '../../../dummyData';
import PostList from '../../../components/post/PostList';
import Sidebar from '../../../components/sidebar/Sidebar';
import Pagination from '../../../components/pagination/Pagination';
import './Posts.css';

const PostsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination />
    </>
  );
};

export default PostsPage;
