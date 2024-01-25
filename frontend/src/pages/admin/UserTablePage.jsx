import { Link } from 'react-router-dom';
import AdminSidebarPage from './AdminSidebarPage';
import './AdminTable.css';

const UserTablePage = () => {
  return (
    <section className="table-container">
      <AdminSidebarPage />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <div className="table-image">
                    <img
                      src="/images/user-avatar.png"
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">hinata</span>
                  </div>
                </td>
                <td>g@g.com</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/1`}>View Profile</Link>
                    </button>
                    <button>Delete User</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserTablePage;
