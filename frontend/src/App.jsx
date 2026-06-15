import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import DonorDashboard from "./pages/DonorDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import NotFound from "./pages/NotFound";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContent from "./pages/admin/AdminContent";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1E3A5F",
                color: "#FBF6EC",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#F4A636", secondary: "#1E3A5F" } },
            }}
          />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Donor Dashboard */}
                <Route
                  path="/donor-dashboard"
                  element={
                    <ProtectedRoute>
                      <DonorDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Volunteer Dashboard */}
                <Route
                  path="/volunteer-dashboard"
                  element={
                    <ProtectedRoute>
                      <VolunteerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Panel */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="donations" element={<AdminDonations />} />
                  <Route path="campaigns" element={<AdminCampaigns />} />
                  <Route path="volunteers" element={<AdminVolunteers />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="contacts" element={<AdminContacts />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <FloatingActions />
          </div>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
