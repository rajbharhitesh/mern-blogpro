import { useState } from 'react';
import swal from 'sweetalert';
import UpdateCommentModal from '../updateComment/UpdateCommentModal';
import './CommentLists.css';

const CommentLists = () => {
  const [updateComment, setUpdateComment] = useState(false);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this comment!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">2 Comments</h4>
      {[1, 2].map((comment) => (
        <div key={comment} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">Hinata Uzumaki</div>
            <div className="comment-item-time">2 hours ago</div>
          </div>
          <p className="comment-item-text">this is amazing</p>

          <div className="comment-item-icon-wrapper">
            <i
              onClick={() => setUpdateComment(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deleteCommentHandler} className="bi bi-trash-fill"></i>
          </div>
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal setUpdateComment={setUpdateComment} />
      )}
    </div>
  );
};

export default CommentLists;
