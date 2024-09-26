import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/SendEmail";
import SuccessPage from "./pages/payment/SuccesPayment";
import PaymentPage from "./pages/Payment/PaymentPage";
import DetailKelas from "./pages/Detail/DetailKelas";
import MainProfile from "./pages/Profile/MainProfile";
import MyCourse from "./pages/Course/MyCourse";
import VerifyEmail from "./pages/auth/VerifyEmail";
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify
import TopikKelas from "./pages/TopikKelas/topikKelas";
import MulaiKelas from "./pages/MulaiKelas/MulaiKelas";

// import sendEmail from "./pages/auth/sendEmail";
function App() {
  return (
    <BrowserRouter>
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
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/Verify-email" element={<VerifyEmail />} />

        {/* Profile */}
        <Route path="/profile" element={<MainProfile />} />

        {/* course */}
        <Route path="/detail-kelas" element={<DetailKelas />} />
        <Route path="/MyCourse" element={<MyCourse />} />
        <Route path="/topik-kelas" element={<TopikKelas />} />
        <Route path="/mulai-kelas" element={<MulaiKelas />} />

        {/* Paymnent */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/succes-payment" element={<SuccessPage />} />

        {/* NotFound */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}
export default App;
