import AdminMainPage from './AdminMainPage';
import AdminSidebarPage from './AdminSidebarPage';
import './Admin.css';

const AdminDashboardPage = () => {
  return (
    <section className="admin-dashboard">
      <AdminSidebarPage />
      <AdminMainPage />
    </section>
  );
};

export default AdminDashboardPage;
