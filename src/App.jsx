import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/sendEmail";
<<<<<<< HEAD
import { HalamnDetailKelas } from "./components/HalamnDetailKelas";
import SuccessPage from "./pages/payment/SuccesPayment";
import Payment from "./pages/payment/Payment";
=======
import SuccessPage from "./pages/Payment/SuccesPayment";
import PaymentPage from "./pages/Payment/PaymentPage";
import DetailKelas from "./pages/Detail/DetailKelas";

>>>>>>> 28ddb8c5f30dae747fad2eec9ed0cd973ea27276
// import sendEmail from "./pages/auth/sendEmail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />

          <Route path="send-email" element={<SendEmail />} />
<<<<<<< HEAD
          {/* Rute ke halaman detail kelas */}
          <Route path="/detail-kelas" element={<HalamnDetailKelas />} />

          {/* Rute ke Halaman Payment */}
          <Route path="/payment" element={<Payment />} />
          {/* Rute ke halaman Success Payment */}
=======

          {/* route detail kelas */}
          <Route path="/detail_kelas" element={<DetailKelas />} />

          {/* Paymnent */}
          <Route path="/payment" element={<PaymentPage />} />
>>>>>>> 28ddb8c5f30dae747fad2eec9ed0cd973ea27276
          <Route path="/succes-payment" element={<SuccessPage />} />

          {/* NotFound */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
