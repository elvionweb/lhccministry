import { Routes, Route } from "react-router-dom";

// Admin Pages
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageSermons from "../pages/admin/ManageSermons";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageBlogs from "../pages/admin/ManageBlogs";
import ManageGives from "../pages/admin/ManageGives";
import ManagePrayers from "../pages/admin/ManagePrayers";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";
import AddBlog from "../pages/admin/AddBlog";
import EditBlog from "../pages/admin/EditBlog";
import AddEvent from "../pages/admin/AddEvent";
import EditEvent from "../pages/admin/EditEvent";
import AddSermon from "../pages/admin/AddSermon";
import EditSermon from "../pages/admin/EditSermon";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Admin CRUD Pages */}
        {/* Blog Pages */}
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="blogs/add" element={<AddBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />

        {/* Event Pages */}
        <Route path="events" element={<ManageEvents />} />
        <Route path="events/add" element={<AddEvent />} />
        <Route path="events/edit/:id" element={<EditEvent />} />

        {/* Sermon Pages */}
        <Route path="sermons" element={<ManageSermons />} />
        <Route path="sermons/add" element={<AddSermon />} />
        <Route path="sermons/edit/:id" element={<EditSermon />} />

        {/* Gives & Prayers */}
        <Route path="gives" element={<ManageGives />} />
        <Route path="prayers" element={<ManagePrayers />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;
