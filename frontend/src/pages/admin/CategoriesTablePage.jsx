import { categories } from '../../dummyData';
import AdminSidebarPage from './AdminSidebarPage';

const CategoriesTablePage = () => {
  return (
    <section className="table-container">
      <AdminSidebarPage />
      <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button>Delete Category</button>
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

export default CategoriesTablePage;
