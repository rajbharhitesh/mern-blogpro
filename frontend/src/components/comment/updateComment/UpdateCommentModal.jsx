import { useState } from 'react';
import { toast } from 'react-hot-toast';
import './UpdateComment.css';

const UpdateCommentModal = ({ setUpdateComment }) => {
  const [text, setText] = useState();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === '') return toast.error('Please write something');
  };

  return (
    <div className="update-comment">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          type="text"
          className="update-comment-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
