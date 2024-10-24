import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/sendEmail";
import SuccessPage from "./pages/Payment/SuccessPage";
import PaymentPage from "./pages/payment/PaymentPage";
import DetailKelas from "./pages/Detail/DetailKelas";
import MainProfile from "./pages/Profile/MainProfile";
import MyCourse from "./pages/Course/MyCourse";
import VerifyEmail from "./pages/auth/VerifyEmail";
import TopikKelas from "./pages/TopikKelas/TopikKelas";
import MulaiKelas from "./pages/MulaiKelas/MulaiKelas";

// ADMIN
import AdminDashboard from "./pages/admin/AdminDashboard";
//ADMIN KELOLA DATA
import AdminDataKategori from "./pages/admin/KelolaDataAdmin/AdminDataKategori";
import AdminDataLevel from "./pages/admin/KelolaDataAdmin/AdminDataLevel";
import AdminDataType from "./pages/admin/KelolaDataAdmin/AdminDataType";
//KELOLA INSTRUKTUR ADMIN
import AdminDataInstruktur from "./pages/admin/KelolaInstrukturAdmin/AdminDataInstruktur";
import AdminRegisterInstruktur from "./pages/admin/KelolaInstrukturAdmin/AdminRegisterInstruktur";
// INSTRUKTUR
import InstruktorDashboard from "./pages/instruktor/InstruktorDashboard";

import InstruktorDataModule from "./pages/instruktor/InstruktorDataModule";

import InstrukturPorofile from "./pages/instruktor/InstrukturPorofile";
import InstrukturDataKategori from "./pages/instruktor/KeolaData/InstrukturDataKategori";
import InstruktorDataKelas from "./pages/instruktor/InstruktorDataKelas";
import InstruktorDataKonten from "./pages/instruktor/InstruktorDataKonten";
import { ProtectedRouteUser } from "./security/ProtectRoleUser";
import ProtectedRouteAdmin from "./security/ProtectRoleAdmin";
import { ProtectedRouteInstruktur } from "./security/ProtectRoleInstruktur";

import NoAccesToken from "./components/Protecd/NoAccesToken";
// import Protected from "./components/Protecd/NoAccesToken";

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
      {/* <Route element={<ProtectedRouteUser />}> */}
      <Route path="/" element={<Home />} />
      {/* </Protected> */}
      {/* </Route> */}

      {/* Auth */}
      <Route
        path="/login"
        element={
          <NoAccesToken>
            <Login />
          </NoAccesToken>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/send-email" element={<SendEmail />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route element={<ProtectedRouteUser />}>
        {/* Profile */}
        <Route path="/profile" element={<MainProfile />} />
        <Route
          path="/mycourse"
          element={
            // <Protected>
            <MyCourse />
            // </Protected>
          }
        />
        <Route path="/mulai-kelas" element={<MulaiKelas />} />
        <Route path="/success-payment" element={<SuccessPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>
      {/* Course */}

      <Route path="/course-detail/:id" element={<DetailKelas />} />

      <Route path="/topik-kelas" element={<TopikKelas />} />

      {/* Payment */}

      {/* Admin */}
      <Route element={<ProtectedRouteAdmin />}>
        <Route
          exact
          path="/admin/dashboard"
          element={
            // <NoAccesToken>
            <AdminDashboard />
            // </NoAccesToken>
          }
        />
        <Route path="/admin/data-kategori" element={<AdminDataKategori />} />
        <Route path="/admin/data-level" element={<AdminDataLevel />} />
        <Route path="/admin/data-Type" element={<AdminDataType />} />
      </Route>

      {/* Kelola Instruktur ADMIN */}
      <Route element={<ProtectedRouteInstruktur />}>
        <Route path="/admin/data-instruktur" element={<AdminDataInstruktur />} />
        <Route path="/admin/regis-instruktur" element={<AdminRegisterInstruktur />} />

        {/* Instruktor */}
        <Route
          exact
          path="/inst/dashboard"
          element={
            <NoAccesToken>
              <InstruktorDashboard />
            </NoAccesToken>
          }
        />
        <Route path="/inst/data-kelas" element={<InstruktorDataKelas />} />
        <Route path="/inst/data-konten/:id" element={<InstruktorDataKonten />} />
        <Route path="/inst/data-chapter/:id" element={<InstruktorDataModule />} />
        <Route path="/inst/data-kategori" element={<InstrukturDataKategori />} />
        <Route path="/inst/profile" element={<InstrukturPorofile />} />
      </Route>

      {/* NotFound */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
