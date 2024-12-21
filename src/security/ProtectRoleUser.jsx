import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const ProtectedRouteUser = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token from cookies:", token);

    if (token) {
      try {
        // Simulated response, replace with actual API validation if needed
        const response = {
          success: true,
          message: "Login successfully",
          data: {
            token: {
              token: token,
              role: "user", // Replace with dynamic role
            },
          },
        };

        const userRole = response.data.token.role;
        console.log("User role:", userRole);

        if (userRole && userRole.toLowerCase() === "user") {
          setIsAuthorized(true);
        } else {
          console.log("Access denied, navigating to not found.");
          toast.error("Anda tidak memiliki akses ke halaman ini.");
          navigate("/not-found"); // Navigate to a not-found page for unauthorized users
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

  // Cek apakah role adalah user dan diizinkan
  if (isAuthorized) {
    return <Outlet {...props} />;
  } else {
    return <Navigate to="/not-found" />; // Redirect unauthorized users
  }
};

export default ProtectedRouteUser;
