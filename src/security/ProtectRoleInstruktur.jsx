import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import { toast } from "react-hot-toast"; // Import toast untuk notifikasi

export const ProtectedRouteInstruktur = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State untuk memuat
  const [isInstruktur, setIsInstruktur] = useState(false); // State untuk cek admin

  useEffect(() => {
    const token = Cookies.get("token"); // Ambil token dari cookies
    console.log("Token from cookies:", token); // Debugging token

    if (token) {
      try {
        // Simulasikan fetching data dari API, di mana role diambil dari response
        // Untuk demo, kita langsung gunakan data ini
        const response = {
          success: true,
          message: "Login in successfully",
          data: {
            token: {
              token: token, // Ambil token dari cookie
              role: "Instruktur", // Ini contoh role dari respons API
            },
          },
        };

        const userRole = response.data.token.role;
        console.log("User role:", userRole); // Debugging role

        // Periksa apakah role adalah admin
        if (userRole && userRole.toLowerCase() === "instruktur") {
          setIsInstruktur(true); // Set state admin jika role adalah admin
        } else {
          console.log("User is not Instruktur, navigating to not found.");
          toast.error("Anda tidak memiliki akses ke halaman ini."); // Notifikasi tidak memiliki akses
          navigate("/*"); // Navigate ke "not found" jika role bukan admin
        }
      } catch (error) {
        console.error("Error:", error); // Log error jika terjadi kesalahan
        toast.error("Terjadi kesalahan, silakan coba lagi."); // Notifikasi kesalahan
        navigate("/login"); // Navigasi ke halaman login jika terjadi error
      } finally {
        setIsLoading(false); // Set loading false setelah pemeriksaan
      }
    } else {
      console.log("No token found, navigating to login.");
      toast.error("Silakan login untuk mengakses halaman ini."); // Notifikasi tidak ada token
      navigate("/login"); // Navigasi ke halaman login jika tidak ada token
      setIsLoading(false); // Set loading false jika tidak ada token
    }
  }, [navigate]);

  // Jika sedang loading, bisa tampilkan loading spinner atau placeholder
  if (isLoading) {
    return <div>Loading...</div>; // Placeholder untuk loading
  }

  // Redirect ke login jika token tidak ada
  if (!Cookies.get("token")) {
    return <Navigate to="/login" />; // Redirect ke login jika tidak ada token
  }

  // Cek apakah peran adalah admin
  if (isInstruktur) {
    return <Outlet {...props} />; // Render children jika admin
  } else {
    return <Navigate to="/*" />; // Redirect ke "not found" jika bukan admin
  }
};

export default ProtectedRouteInstruktur;
