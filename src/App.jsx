import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/sendEmail";
import SuccessPage from "./pages/payment/SuccessPage";
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
import AdminDataKelas from "./pages/admin/KelolaDataAdmin/AdminDataKelas";
import AdminDataInterpreterLanguage from "./pages/admin/KelolaDataAdmin/AdminDataInterpreterLanguage";

//KELOLA INSTRUKTUR ADMIN
import AdminDataInstruktur from "./pages/admin/KelolaInstrukturAdmin/AdminDataInstruktur";
import AdminRegisterInstruktur from "./pages/admin/KelolaInstrukturAdmin/AdminRegisterInstruktur";
// INSTRUKTUR
import InstruktorDashboard from "./pages/instruktor/InstruktorDashboard";
import InstruktorDataModule from "./pages/instruktor/InstruktorDataModule";
import InstrukturPorofile from "./pages/instruktor/InstrukturPorofile";
import InstrukturDataKategori from "./pages/instruktor/KeolaData/InstrukturDataKategori";
import InstrukturDataLevel from "./pages/instruktor/KeolaData/instrukturDataLevel";
import InstrukturDataType from "./pages/instruktor/KeolaData/instrukturDataType";
import InstrukturDataLanguage from "./pages/instruktor/KeolaData/InstrukturDataInterpreter";
import InstruktorDataKelas from "./pages/instruktor/InstruktorDataKelas";
import InstruktorDataKonten from "./pages/instruktor/InstruktorDataKonten";
import { ProtectedRouteUser } from "./security/ProtectRoleUser";
import ProtectedRouteAdmin from "./security/ProtectRoleAdmin";
import { ProtectedRouteInstruktur } from "./security/ProtectRoleInstruktur";

import NoAccesToken from "./components/Protecd/NoAccesToken";
// import ProtecdToken from "./components/Protecd/Proctected";

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
      <Route element={<ProtectedRouteUser />}>
        <Route
          path="/profile"
          element={
            <NoAccesToken>
              <MainProfile />
            </NoAccesToken>
          }
        />
        <Route
          path="/mycourse"
          element={
            // <NoAccesToken>
              <MyCourse />
            // </NoAccesToken>
          }
        />

        <Route
          path="/success-payment"
          element={
            <NoAccesToken>  
              <SuccessPage />
            </NoAccesToken>
          }
        />
        <Route
          path="/payment"
          element={
            <NoAccesToken>
              <PaymentPage />
            </NoAccesToken>
          }
        />
      </Route>

      <Route
        path="/mulai-kelas/:id"
        element={
          // <NoAccesToken>
            <MulaiKelas />
          // </NoAccesToken>
        }
      />

      <Route path="/course-detail/:id" element={<DetailKelas />} />
      <Route path="/topik-kelas" element={<TopikKelas />} />

      {/* Admin */}
      <Route element={<ProtectedRouteAdmin />}>
        <Route
          exact
          path="/admin/dashboard"
          element={
            <NoAccesToken>
              <AdminDashboard />
            </NoAccesToken>
          }
        />
        <Route
          path="/admin/data-kategori"
          element={
            <NoAccesToken>
              <AdminDataKategori />
            </NoAccesToken>
          }
        />
        <Route
          path="/admin/data-level"
          element={
            <NoAccesToken>
              <AdminDataLevel />
            </NoAccesToken>
          }
        />
        <Route
          path="/admin/data-Type"
          element={
            <NoAccesToken>
              <AdminDataType />
            </NoAccesToken>
          }
        />
        <Route
          path="/admin/data-kelas"
          element={
            <NoAccesToken>
              <AdminDataKelas />
            </NoAccesToken>
          }
        />
        <Route
          path="/admin/data-interpreter"
          element={
            <NoAccesToken>
              <AdminDataInterpreterLanguage />
            </NoAccesToken>
          }
        />
      </Route>

      {/* Kelola Instruktur*/}
      <Route element={<ProtectedRouteInstruktur />}>
        <Route
          path="/admin/data-instruktur"
          element={
            <NoAccesToken>
              <AdminDataInstruktur />
            </NoAccesToken>
          }
        />
        <Route
          path="/admin/regis-instruktur"
          element={
            <NoAccesToken>
              <AdminRegisterInstruktur />
            </NoAccesToken>
          }
        />

        {/* Instruktor */}
        <Route
          path="/inst/data-kelas"
          element={
            <NoAccesToken>
              <InstruktorDataKelas />
            </NoAccesToken>
          }
        />
        <Route
          exact
          path="/inst/dashboard"
          element={
            <NoAccesToken>
              <InstruktorDashboard />
            </NoAccesToken>
          }
        />
        <Route
          path="/inst/data-konten/:id"
          element={
            <NoAccesToken>
              <InstruktorDataKonten />
            </NoAccesToken>
          }
        />
        <Route
          path="/inst/data-chapter/:id"
          element={
            <NoAccesToken>
              <InstruktorDataModule />
            </NoAccesToken>
          }
        />
        <Route
          path="/inst/data-kategori"
          element={
            <NoAccesToken>
              <InstrukturDataKategori />
            </NoAccesToken>
          }
        />
        <Route
          path="/inst/data-level"
          element={
            <NoAccesToken>
              <InstrukturDataLevel />
            </NoAccesToken>
          }
        />
        <Route
          path="/inst/data-type"
          element={
            <NoAccesToken>
              <InstrukturDataType />
            </NoAccesToken>
          }
        />
        <Route
          path="/inst/profile"
          element={
            <NoAccesToken>
              <InstrukturPorofile />
            </NoAccesToken>
          }
        />
        <Route
          path="/inst/data-interpreter"
          element={
            <NoAccesToken>
              <InstrukturDataLanguage />
            </NoAccesToken>
          }
        />
      </Route>

      {/* NotFound */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
