import { useEffect, useState } from 'react';
import { posts } from '../../dummyData';
import PostList from '../../components/post/PostList';
import './Profile.css';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import UpdateProfileModal from './UpdateProfileModal';

const ProfilePage = () => {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!file) return toast.error('Post Image is required');
  };

  // delete account handler
  const deleteAccountHandler = () => {
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
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : '/images/user-avatar.png'}
            alt=""
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              style={{ display: 'none' }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="upload-profile-photo-btn" type="submit">
              upload
            </button>
          </form>
        </div>
        <h1 className="profile-username">Hinata</h1>
        <p className="profile-bio">Princess</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>Fri Nov 2024</span>
        </div>

        <button
          onClick={() => setUpdateProfile(true)}
          className="profile-update-btn"
        >
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">
          Hitesh Posts
          <PostList posts={posts} />
        </h2>
      </div>

      <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      {updateProfile && (
        <UpdateProfileModal setUpdateProfile={setUpdateProfile} />
      )}
    </section>
  );
};

export default ProfilePage;
