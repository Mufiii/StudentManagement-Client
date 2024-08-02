import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Navbar/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminLogin from "./Pages/Authentication/AdminLogin";
import { Toaster } from 'react-hot-toast';
import AdminProtectedRoute from "./Components/Routes/AdminProtectedRoute";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import TeacherPostView from "./Pages/Users/Teacher/TeacherPostView";
import TeachersListView from "./Pages/Users/Teacher/TeachersListView";
import ClassRoomDetail from "./Pages/ClassRoom/ClassRoomDetail";
import ClassRooms from "./Pages/ClassRoom/ClassRooms";
import StudentDetail from "./Pages/Users/Student/StudentDetail";
import SchoolBus from "./Pages/SchoolBus/Bus/SchoolBus";
import BusRoute from "./Pages/SchoolBus/Routes/BusRoute";
import BusPoints from "./Pages/SchoolBus/BusPonts/BusPoints";
import SchoolBusDetail from "./Pages/SchoolBus/Bus/SchoolBusDetail";
import CreateRoute from "./Pages/SchoolBus/Routes/CreateRoute";
import TeacherGetUpdateView from "./Pages/Users/Teacher/TeacherGetUpdateView";
import CreateSchoolBus from "./Pages/SchoolBus/Bus/CreateSchoolBus";
import AddBusService from "./Pages/SchoolBus/Bus/AddBusService";
import Report from "./Pages/SchoolBus/Bus/Report";
import StudentBusPaymentsDetail from "./Pages/SchoolBus/Bus/Payments/StudentBusPaymentsDetail";



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
              <Route path="/addteacher" element={<TeacherPostView />} />
              <Route path="/teacher" element={<TeachersListView />} />
              <Route path="/teacher/:teacherId" element={<TeacherGetUpdateView />} />
              <Route path="/classroom" element={<ClassRooms />} />
              <Route path="/classroom/:classroomId" element={<ClassRoomDetail />} />
              <Route path="/student/:studentId" element={<StudentDetail />} />
              <Route path="/schoolbus" element={<SchoolBus />} />
              <Route path="/addschoolbus" element={<CreateSchoolBus />} />
              <Route path="/schoolbus/:schoolBusId" element={<SchoolBusDetail />} />
              <Route path="/addservice" element={<AddBusService />} />
              <Route path="/route" element={<BusRoute />} />
              <Route path="/buspoints" element={<BusPoints />} />
              <Route path="addroute" element={<CreateRoute />} />
              <Route path="report" element={<Report />} />
              <Route path="transactions" element={<StudentBusPaymentsDetail />} />
              <Route path="/transactions/:user_id" element={<StudentBusPaymentsDetail />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
