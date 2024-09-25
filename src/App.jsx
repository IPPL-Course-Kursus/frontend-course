import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/sendEmail";
import SuccessPage from "./pages/Payment/SuccesPayment";
import PaymentPage from "./pages/Payment/PaymentPage";
import DetailKelas from "./pages/Detail/DetailKelas";
import MyCourse from "./pages/mycourse";
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

          {/* route detail kelas */}
          <Route path="/detail_kelas" element={<DetailKelas />} />

          <Route path="/MyCourse" element={<MyCourse />} />

          {/* Paymnent */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/succes-payment" element={<SuccessPage />} />

          {/* NotFound */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
