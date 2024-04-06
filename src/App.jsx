import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import StudentHome from "./pages/Student/studentHome";
import MyCourse from "./pages/Student/MyCourse";
import AddStudent from "./pages/Instructor/addStudent";
import LearningReport from "./pages/Instructor/LearningReport";
import Mcq from "./pages/Mcq";
import Sidebar from "./components/Sidebar";
import TestReport from "./pages/Instructor/TestReport";
import UpdateContent from "./pages/Instructor/UpdateContent";
import LearningReportad from "./pages/Admin/LearningReportad";
import TestReportad from "./pages/Admin/TestReportad";
import UpdateContentad from "./pages/Admin/UpdateContentad";
import AddInstructor from "./pages/Admin/AddInstructor";
import useAuth from "./authService";
import PDFViewer from "./pages/Student/PDFViewer";
import AddTest from "./pages/AddTest";
import PreviewTest from "./pages/Admin/PreviewTest";
import Results from "./pages/Student/Results";
import Navbar from "./components/Navbar";
import RestPassword from "./RestPassword";
import AdminHome from "./pages/Admin/AdminHome";
import InstHome from "./pages/Instructor/InstHome";
import AddSchool from "./pages/Admin/AddSchool";
import EditStudent from "./pages/Instructor/EditStudent";
import Schools from "./pages/Admin/Schools";
import Allinstructor from "./pages/Admin/Allinstructor";
import Content from "./pages/Student/Content";
import StudentProfile from "./pages/Student/StudentProfile";
import AllStudents from "./pages/Admin/AllStudents";
import SearchableDropdown from "./pages/SearchableDropdown";
import Schoolp from "./pages/Admin/Schoolp";

const App = () => {
  const { auth, setAuth } = useAuth();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    const storedData = sessionStorage.getItem("user_id");
    console.log(storedData);
    if (storedData) {
      setAuth(storedData);
      setRole(sessionStorage.getItem("role"));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/RestPassword" element={<RestPassword />} />

        <Route path="" element={<Navbar />}>
          <Route path="/studentHome" element={<StudentHome />} />
          <Route
            path="/StudentProfile/:studentId"
            element={<StudentProfile />}
          />
          <Route path="/Content/:chapterId" element={<Content />} />
          <Route path="/SearchableDropdown" element={<SearchableDropdown />} />

          <Route path="/pdf/:chapterId" element={<PDFViewer />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/mcq/:testId" element={<Mcq />} />
          <Route path="/results/:testId" element={<Results />} />
          <Route path="/preview/:testId" element={<PreviewTest />} />
        </Route>
        <Route path="/inst/*" element={<Sidebar />}>
          <Route path="" element={<Navbar />}>
            <Route path="InstHome" element={<InstHome />} />
            <Route path="addStudent" element={<AddStudent />} />
            <Route path="AllStudents" element={<AllStudents />} />
            <Route path="LearningReport" element={<LearningReport />} />
            <Route path="TestReport" element={<TestReport />} />
            <Route path="editStudent" element={<EditStudent />} />
            {/* <Route path="UpdateContent" element={<UpdateContent />} /> */}
          </Route>
        </Route>

        <Route path="/admin/*" element={<Sidebar />}>
          <Route path="" element={<Navbar />}>
            <Route path="AdminHome" element={<AdminHome />} />
            <Route path="Schools" element={<Schools />} />
            <Route path="Schoolp" element={<Schoolp />} />
            <Route path="Allinstructor" element={<Allinstructor />} />
            <Route path="AllStudents" element={<AllStudents />} />
            <Route path="AddSchool" element={<AddSchool />} />
            <Route path="LearningReport" element={<LearningReport />} />
            <Route path="addStudent" element={<AddStudent />} />
            <Route path="TestReport" element={<TestReport />} />
            <Route path="UpdateContent" element={<UpdateContent />} />
            <Route path="AddInstructor" element={<AddInstructor />} />
            <Route path="AddTest" element={<AddTest />} />
            <Route path="preview/:testId" element={<PreviewTest />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
