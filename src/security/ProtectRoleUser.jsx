// import { useEffect, useState } from "react";
// import { Outlet, useNavigate, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { toast } from "react-hot-toast";

// export const ProtectedRouteUser = (props) => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUser, setIsUser] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     console.log("Token from cookies:", token);

//     if (token) {
//       try {
//         const response = {
//           success: true,
//           message: "Login in successfully",
//           data: {
//             token: {
//               token: token,
//               role: "user",
//             },
//           },
//         };

//         const userRole = response.data.token.role;
//         console.log("User role:", userRole);

//         if (userRole && userRole.toLowerCase() === "user") {
//           setIsUser(true);
//         } else {
//           console.log("Access denied, navigating to not found.");
//           toast.error("Anda tidak memiliki akses ke halaman ini.");
//           navigate("/*");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         toast.error("Terjadi kesalahan, silakan coba lagi.");
//         navigate("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       console.log("No token found, navigating to login.");
//       toast.error("Silakan login untuk mengakses halaman ini.");
//       navigate("/login");
//       setIsLoading(false);
//     }
//   }, [navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!Cookies.get("token")) {
//     return <Navigate to="/login" />;
//   }

//   // Cek apakah role adalah user
//   if (isUser) {
//     return <Outlet {...props} />;
//   } else {
//     return <Navigate to="/*" />;
//   }
// };

// export default ProtectedRouteUser;

import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import * as jwt_decode from "jwt-decode"; // Correct import for jwt-decode

export const ProtectedRouteUser = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve token from cookies
    console.log("Token from cookies:", token); // Debugging

    if (token) {
      try {
        // Decode token to extract user role
        const decodedToken = jwt_decode.default(token); // Access 'decode' method correctly
        console.log("Decoded token:", decodedToken); // Debugging the decoded token

        const userRole = decodedToken?.role; // Make sure role is defined in decoded token
        console.log("User role:", userRole); // Debugging the role

        // Check if role is 'user'
        if (userRole && userRole.toLowerCase() === "user") {
          setIsUser(true);
        } else {
          console.log("Access denied, navigating to not found.");
          toast.error("Anda tidak memiliki akses ke halaman ini.");
          navigate("/*"); // Navigate to 'not found' page or another route
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Terjadi kesalahan, silakan coba lagi.");
        navigate("/login"); // Redirect to login if decoding fails
      } finally {
        setIsLoading(false); // Stop loading after token verification
      }
    } else {
      console.log("No token found, navigating to login.");
      toast.error("Silakan login untuk mengakses halaman ini.");
      navigate("/login"); // Redirect to login if no token found
      setIsLoading(false);
    }
  }, [navigate]);

  // While loading, show a loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If token is absent, redirect to login
  if (!Cookies.get("token")) {
    return <Navigate to="/login" />;
  }

  // If the user is authorized, render the child routes
  if (isUser) {
    return <Outlet {...props} />;
  } else {
    return <Navigate to="/*" />; // Redirect to 'not found' if not a user
  }
};

export default ProtectedRouteUser;
