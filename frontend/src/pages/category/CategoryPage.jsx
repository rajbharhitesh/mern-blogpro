import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { posts } from '../../dummyData';
import PostList from '../../components/post/PostList';
import './Category.css';

const CategoryPage = () => {
  const { category } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="category">
      <h1 className="category-title">Posts based on {category}</h1>
      <PostList posts={posts} />
    </section>
  );
};

export default CategoryPage;
