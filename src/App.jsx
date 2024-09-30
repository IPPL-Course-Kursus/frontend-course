import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"; // Import react-hot-toast
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/SendEmail";
import SuccessPage from "./pages/payment/SuccessPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import DetailKelas from "./pages/Detail/DetailKelas";
import MainProfile from "./pages/Profile/MainProfile";
import MyCourse from "./pages/Course/MyCourse";
import VerifyEmail from "./pages/auth/VerifyEmail";
import TopikKelas from "./pages/TopikKelas/topikKelas";
import MulaiKelas from "./pages/MulaiKelas/MulaiKelas";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import NoAccessToken from "./security/NoAccessToken";

function App() {
  return (
    <BrowserRouter>
      {/* Setup toaster untuk menampilkan notifikasi */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode === "resetPassword") {
      localStorage.setItem("oobCode", oobCode);
      navigate("/reset");
    }

    if (mode === "verifyEmail") {
      localStorage.setItem("oobCode", oobCode);
      navigate("/verify-email");
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/send-email" element={<SendEmail />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Profile */}
      <Route path="/profile" element={<MainProfile />} />

      {/* Course */}
      <Route path="/detail-kelas" element={<DetailKelas />} />
      <Route path="/mycourse" element={<MyCourse />} />
      <Route path="/topik-kelas" element={<TopikKelas />} />
      <Route path="/mulai-kelas" element={<MulaiKelas />} />

      {/* Payment */}
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/succes-payment" element={<SuccessPage />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* NotFound */}
      <Route path="/*" element={<NotFound />} />

      {/* <Route
        path="/login"
        element={
          <NoAccessToken>
            <Login />
          </NoAccessToken>
        }
      />
      <Route
        path="/register"
        element={
          <NoAccessToken>
            <Register />
          </NoAccessToken>
        }
      /> */}
    </Routes>
  );
}

export default App;
