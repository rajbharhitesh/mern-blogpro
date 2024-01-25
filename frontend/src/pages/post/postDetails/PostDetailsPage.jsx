import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { posts } from '../../../dummyData';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import AddComment from '../../../components/comment/addComment/AddComment';
import CommentLists from '../../../components/comment/commentLists/CommentLists';
import './PostDetails.css';

const PostDetailsPage = () => {
  const { id } = useParams();

  const post = posts.find((p) => p._id === parseInt(id));

  const [file, setFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // update image submit handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();

    if (!file) return toast.error('there is no file!');
  };

  // delete post handler
  const deletePostHandler = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post.image}
          alt=""
          className="post-details-image"
        />

        <form
          className="update-post-image-form"
          onSubmit={updateImageSubmitHandler}
        >
          <label htmlFor="file" className="update-post-label">
            <i className="bi bi-image-fill"></i>
            Select new image
          </label>
          <input
            style={{ display: 'none' }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">upload</button>
        </form>
      </div>

      <h1 className="post-details-title">{post.title}</h1>

      <div className="post-details-user-info">
        <img src={post.user.image} alt="" className="post-details-user-image" />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post.user._id}`}>{post.user.username}</Link>
          </strong>
          <span>{post.createdAt}</span>
        </div>
      </div>

      <p className="post-details-description">
        {post.description}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
        reprehenderit, molestiae officia non corrupti iusto, molestias quod
        repellat, distinctio temporibus explicabo? Placeat, dolorum atque fugiat
        vitae suscipit ratione quo? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vero est reprehenderit, molestiae officia non corrupti
        iusto, molestias quod repellat, distinctio temporibus explicabo?
        Placeat, dolorum atque fugiat vitae suscipit ratione quo?
      </p>

      <div className="post-details-icon-wrapper">
        <div>
          <i className="bi bi-hand-thumbs-up-fill"></i>

          <small>{post.likes.length} likes</small>
        </div>

        <div>
          <i className="bi bi-pencil-square"></i>
          <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
        </div>
      </div>

      <AddComment />
      <CommentLists />
    </section>
  );
};

export default PostDetailsPage;
