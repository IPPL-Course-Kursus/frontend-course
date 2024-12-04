import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const ProtectedRouteUser = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token from cookies:", token);

    if (token) {
      try {
        const response = {
          success: true,
          message: "Login in successfully",
          data: {
            token: {
              token: token,
              role: "user",
            },
          },
        };

        const userRole = response.data.token.role;
        console.log("User role:", userRole);

        if (userRole && userRole.toLowerCase() === "user") {
          setIsUser(true);
        } else {
          console.log("Access denied, navigating to not found.");
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
      console.log("No token found, navigating to login.");
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

  // Cek apakah role adalah user
  if (isUser) {
    return <Outlet {...props} />;
  } else {
    return <Navigate to="/*" />;
  }
};

export default ProtectedRouteUser;
