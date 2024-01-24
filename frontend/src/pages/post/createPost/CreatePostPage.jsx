import { useState } from 'react';
import { toast } from 'react-hot-toast';
import './CreatePost.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === '') return toast.error('Post Title is required');
    if (category.trim() === '') return toast.error('Post Category is required');
    if (description.trim() === '')
      return toast.error('Post Description is required');
    if (!file) return toast.error('Post Image is required');
  };

  return (
    <div className="section create-post">
      <h1 className="create-post-title">Create New Post</h1>

      <form className="create-post-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          name="title"
          placeholder="post title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="create-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          <option value="music">music</option>
          <option value="coffee">coffee</option>
        </select>

        <textarea
          className="create-post-textarea"
          rows="5"
          placeholder="Post Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
