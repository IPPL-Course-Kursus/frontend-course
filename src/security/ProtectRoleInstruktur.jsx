// Di dalam file ProtectRoleInstruktur.jsx

import  { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const ProtectedRouteInstruktur = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isInstruktur, setIsInstruktur] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        // Simulasi response API
        const response = {
          success: true,
          message: "Login successfully",
          data: {
            token: {
              token: token,
              role: "instruktur", // Role instruktur contoh
            },
          },
        };

        const userRole = response.data.token.role;

        if (userRole && userRole.toLowerCase() === "instruktur") {
          setIsInstruktur(true);
        } else {
          toast.error("Anda tidak memiliki akses ke halaman ini.");
          navigate("/*");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan, silakan coba lagi.");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Silakan login untuk mengakses halaman ini.");
      navigate("/login");
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Cookies.get("token")) {
    return <Navigate to="/login" />;
  }

  if (isInstruktur) {
    return <Outlet {...props} />;
  } else {
    return <Navigate to="/*" />;
  }
};

export default ProtectedRouteInstruktur;
