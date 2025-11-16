import Header from "./Header";
import Home from "./Home";
import CourseDetail from "./CourseDetail";
import Login from "./User/login";
import Register from "./User/Register";
import About from "./About";
import Footer from "./Footer";
import TeacherDetails from "./TeacherDetail";

// Student imports
import DashBoard from "./User/Dashboard";
import Mycourses from "./User/Mycourses";
import Recommendedcourses from "./User/Recommendedcourses";
import Favoritecourses from "./User/Favoritecourses";
import Profilesetting from "./User/Profilesetting";
import Changepassword from "./User/Changepassword";
import StudentLogout from "./User/StudentLogout";
import StudentQuizView from "./User/StudentQuizView";
import ForgotPassword from "./User/ForgotPassword";
import VerifyOTP from "./User/VerifyOTP";
import ChapterNotes from "./Teacher/ChapterNotes";
import AddLectureNote from "./Teacher/AddLectureNote";
// Teacher imports
import Teacherdashboard from "./Teacher/Teacherdashboard";
import Teacherlogin from "./Teacher/Teacherlogin";
import Teacherlogout from "./Teacher/TeacherLogout";
import Teacherregister from "./Teacher/Teacherregister";
import Teacherchangepassword from "./Teacher/Teacherchangepassword";
import Teacherprofilesetting from "./Teacher/Teacherprofilesetting";
import Addcourse from "./Teacher/Addcourse";
import Teachermycourses from "./Teacher/Mycourses";
import Myuser from "./Teacher/Myuser";
import AddChapter from "./Teacher/AddChapter";
import EditChapter from "./Teacher/EditChapter";
import CourseChapters from "./Teacher/CourseChapters";
import Editcourse from "./Teacher/EditCourse";
import TeacherSkillCourses from "./TeacherSkillCourses";
import EnrolledStudents from "./Teacher/EnrolledStudents";
import StudentCourseDetail from "./User/StudentCourseDetail";
import AddAssignment from "./Teacher/AddAssignment";
import CourseAssignments from "./Teacher/CourseAssignments";
import AssignmentSubmissions from "./Teacher/AssignmentSubmissions";
import TeacherQuizManager from "./Teacher/TeacherQuizManager";
import TeacherQuizResults from "./Teacher/TeacherQuizResult";
import TeacherDiscussions from "./Teacher/TeacherDiscussion";
import EditLectureNote from "./Teacher/EditLectureNote";

// Public imports
import AllCourses from "./AllCourses";
import Popularcourses from "./PopularCourses";
import PopularTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";

import { Routes as Switch, Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import RoleProtectedRoute from "../utils/RoleProtectedRoute";

function Main() {
  return (
    <div className="App">
      <Header />
       <div className="page-content">
      <Switch>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetails />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/popular-courses" element={<Popularcourses />} />
        <Route path="/popular-teachers" element={<PopularTeachers />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />

        {/* Auth Routes */}
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/teacher-login" element={<Teacherlogin />} />
        <Route path="/teacher-register" element={<Teacherregister />} />

        {/* Logout Routes */}
        <Route path="/user-logout" element={<StudentLogout />} />
        <Route path="/teacher-logout" element={<Teacherlogout />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Student Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <RoleProtectedRoute roleRequired="student">
              <DashBoard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <RoleProtectedRoute roleRequired="student">
              <Mycourses />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/favorite-courses"
          element={
            <RoleProtectedRoute roleRequired="student">
              <Favoritecourses />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/recommended-courses"
          element={
            <RoleProtectedRoute roleRequired="student">
              <Recommendedcourses />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/profile-setting"
          element={
            <RoleProtectedRoute roleRequired="student">
              <Profilesetting />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <RoleProtectedRoute roleRequired="student">
              <Changepassword />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/student/quiz/:quiz_id"
          element={
            <RoleProtectedRoute roleRequired="student">
              <StudentQuizView />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/student-course-detail/:course_id"
          element={
            <RoleProtectedRoute roleRequired="student">
              <StudentCourseDetail />
            </RoleProtectedRoute>
          }
        />

        {/* Teacher Protected Routes */}
        <Route
          path="/teacher-dashboard"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <Teacherdashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher-mycourses"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <Teachermycourses />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher-user"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <Myuser />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher-changepassword"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <Teacherchangepassword />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher-profilesetting"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <Teacherprofilesetting />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher-addcourse"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <Addcourse />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/edit-course/:course_id"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <Editcourse />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/course-chapters/:course_id"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <CourseChapters />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/add-chapter/:course_id"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <AddChapter />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/edit-chapter/:chapter_id"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <EditChapter />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/enrolled-students/:course_id"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <EnrolledStudents />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/add-assignment/:courseId"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <AddAssignment />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/course-assignments/:courseId"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <CourseAssignments />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/assignment-submissions/:assignmentId"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <AssignmentSubmissions />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher/:course_id/quizzes"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <TeacherQuizManager />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher/quiz/:quiz_id/results"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <TeacherQuizResults />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/teacher/course/:course_id/discussions"
          element={
            <RoleProtectedRoute roleRequired="teacher">
              <TeacherDiscussions />
            </RoleProtectedRoute>
          }
          
        />
        <Route path="/chapter-notes/:chapter_id" element={<ChapterNotes />} />
<Route path="/add-lecture-note/:chapter_id" element={<AddLectureNote />} />
<Route path="/edit-lecture-note/:note_id" element={<EditLectureNote />} />


      </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
