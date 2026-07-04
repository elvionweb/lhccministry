import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Sermons from "../pages/Sermons";
import Events from "../pages/Events";
import Ministries from "../pages/Ministries";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Gives from "../pages/Gives";
import Contact from "../pages/Contact";
import GalleryPage from "../pages/GalleryPage";
import PreviousEvents from "../pages/PreviousEvents";
import AdminLogin from "../pages/auth/Login";
import AdminForgotPassword from "../pages/admin/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageBlogs from "../pages/admin/ManageBlogs";
import AddBlog from "../pages/admin/AddBlog";
import EditBlog from "../pages/admin/EditBlog";
import ManageEvents from "../pages/admin/ManageEvents";
import AddEvent from "../pages/admin/AddEvent";
import EditEvent from "../pages/admin/EditEvent";
import ManageSermons from "../pages/admin/ManageSermons";
import GalleryManager from "../pages/admin/GalleryManager";
import AddSermon from "../pages/admin/AddSermon";
import EditSermon from "../pages/admin/EditSermon";
import ManageGives from "../pages/admin/ManageGives";
import ManagePrayers from "../pages/admin/ManagePrayers";
import PublicLayout from "../layouts/PublicLayout";
import NotAuthorized from "../pages/NotAuthorized";
import Pastor from "../pages/Pastor";






const AppRoutes = () => {
  
  return (
    <Routes>
      <Route element={<PublicLayout /> }> 
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sermons" element={<Sermons />} />
      <Route path="/events" element={<Events />} />
      <Route path="/previous-events" element={<PreviousEvents />} />
      <Route path="/ministries" element={<Ministries />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gives" element={<Gives />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/pastor" element={<Pastor />} />
      </Route>


       {/* ============= ADMIN LOGIN ============ */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

      {/* ========== PROTECTED ADMIN ROUTES ========= */}
      <Route path="/admin" element={<ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>} > 

      {/* Dashboard */}
        <Route index element={<Dashboard />} />


         {/* Blog Pages */}
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="blogs/add" element={<AddBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />

        {/* Gallery Pages */}
        <Route path="gallery" element={<GalleryManager />} />

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

export default AppRoutes;



