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
        <Route path="/studentHome" element={<StudentHome />} />
        

        <Route path="/mycourse" element={<MyCourse />} />
        <Route path="/mcq" element={<Mcq />} />
        <Route path="/inst/*" element={<Sidebar />}>
          <Route path="addStudent" element={<AddStudent />} />
          <Route path="LearningReport" element={<LearningReport />} />
          <Route path="TestReport" element={<TestReport />} />
          <Route path="UpdateContent" element={<UpdateContent />} />
        </Route>
        <Route path="/admin/*" element={<Sidebar />}>
          <Route path="LearningReportad" element={<LearningReportad />} />
          <Route path="TestReportad" element={<TestReportad />} />
          <Route path="UpdateContentad" element={<UpdateContentad />} />
          <Route path="AddInstructor" element={<AddInstructor />} />
          <Route path="AddTest" element={<AddTest />} />
          <Route path="preview/:testId" element={<PreviewTest/>}/>
        </Route>
        <Route path="/pdf/:chapterId" element={<PDFViewer />} />
        
      </Routes>
    </div>
  );
};

export default App;
