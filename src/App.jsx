import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Navbar/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminLogin from "./Pages/Authentication/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
