import AdminSidebarPage from './AdminSidebarPage';

const CommentsTablePage = () => {
  return (
    <section className="table-container">
      <AdminSidebarPage />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <div className="table-image">
                    <img
                      src="/images/user-avatar.png"
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">username</span>
                  </div>
                </td>
                <td>text</td>
                <td>
                  <div className="table-button-group">
                    <button>Delete Comment</button>
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

export default CommentsTablePage;
