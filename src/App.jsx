import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainProfile from "./pages/MainProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/mainprofile" />} />
          <Route path="/mainprofile" element={<MainProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
