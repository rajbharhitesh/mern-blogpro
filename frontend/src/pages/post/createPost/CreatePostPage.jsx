import './CreatePost.css';

const CreatePostPage = () => {
  return (
    <div className="section create-post">
      <h1 className="create-post-title">Create New Post</h1>

      <form className="create-post-form">
        <input
          type="text"
          name="title"
          placeholder="post title"
          className="create-post-input"
        />

        <select className="create-post-input">
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
        ></textarea>

        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
        />
        <button type="submit" className="create-post-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
