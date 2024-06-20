import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Navbar/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminLogin from "./Pages/Authentication/AdminLogin";
import { Toaster } from 'react-hot-toast';
import AdminProtectedRoute from "./Components/Routes/AdminProtectedRoute";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import TeacherPostView from "./Pages/Teacher/TeacherPostView";



function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={
            <AdminProtectedRoute>
              <AdminLogin />
            </AdminProtectedRoute>
          } />
          <Route element={<ProtectedRoute />} >
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/teacher" element={<TeacherPostView />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
