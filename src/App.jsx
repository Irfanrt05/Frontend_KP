import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import LandingPage from "./pages/LandingPage";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// User
import UserLayout from "./layouts/UserLayout";
import UserDashboard from "./pages/Dashboard";
import HealthProfile from "./pages/user/HealthProfile";
import GenerateHealthPlan from "./pages/user/GenerateHealthPlan";
import UserProfile from "./pages/user/UserProfile";
import UserArticles from "./pages/user/UserArticles";
import UserArticleDetail from "./pages/user/UserArticleDetail";
import UserRecipes from "./pages/user/UserRecipes";
import UserRecipeDetail from "./pages/user/UserRecipeDetail";
import UserActivityLogs from "./pages/user/UserActivityLogs";
import UserFavorites from "./pages/user/UserFavorites";


// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Blogs from "./pages/admin/Blogs";
import Reports from "./pages/admin/Reports";
import Recipes from "./pages/admin/Recipes";
import Profile from "./pages/admin/Profile";
import ActivityLogs from "./pages/admin/ActivityLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* User */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="health-profile" element={<HealthProfile />} />
          <Route path="generate-plan" element={<GenerateHealthPlan />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="articles" element={<UserArticles />} />
          <Route path="articles/:id" element={<UserArticleDetail />} />
          <Route path="recipes" element={<UserRecipes />} />
          <Route path="recipes/:id" element={<UserRecipeDetail />} />
          <Route path="favorites" element={<UserFavorites />} />
          <Route path="activity-logs" element={<UserActivityLogs />} />
          {/* </Route> */}
        </Route>

        {/* Admin */}
        {/* <Route element={<ProtectedRoute adminOnly />}> */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="reports" element={<Reports />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="profile" element={<Profile />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
