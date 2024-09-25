import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/SendEmail";
import SuccessPage from "./pages/payment/SuccesPayment";
import PaymentPage from "./pages/Payment/PaymentPage";
import DetailKelas from "./pages/Detail/DetailKelas";
import { useEffect } from "react";

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
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />

      <Route path="send-email" element={<SendEmail />} />

      {/* route detail kelas */}
      <Route path="/detail_kelas" element={<DetailKelas />} />

      {/* Payment */}
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/succes-payment" element={<SuccessPage />} />

      {/* NotFound */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
