import Header from './Header';
import Home from './Home';
import CourseDetail from "./CourseDetail";
import Login from './User/login';
import Register from './User/Register';
import About from './About';
import Footer from './Footer';
import TeacherDetails from './TeacherDetail';


import DashBoard from './User/Dashboard';
import Mycourses from './User/Mycourses';
import Recommendedcourses from './User/Recommendedcourses';
import Favoritecourses from './User/Favoritecourses';
import Profilesetting from './User/Profilesetting';
import Changepassword from './User/Changepassword';

//teacher
import Teacherdashboard from './Teacher/Teacherdashboard';
import Teacherlogin from './Teacher/Teacherlogin';
import Teacherlogout from './Teacher/TeacherLogout';
import Teacherregister from './Teacher/Teacherregister';
import Teacherchangepassword from './Teacher/Teacherchangepassword';
import Teacherprofilesetting from './Teacher/Teacherprofilesetting';
import Addcourse from './Teacher/Addcourse';
import Teachermycourses from './Teacher/Mycourses';
import Myuser from './Teacher/Myuser';
import AddChapter from './Teacher/AddChapter';
import EditChapter from './Teacher/EditChapter';
import CourseChapters from './Teacher/CourseChapters';
import Editcourse from './Teacher/EditCourse';

import AllCourses from './AllCourses';
import Popularcourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';
import {Routes as Switch, Route} from 'react-router-dom';

function Main() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-dashboard" element={<DashBoard/>}/>
        <Route path="/my-courses" element={<Mycourses/>}/>
        <Route path="/favorite-courses" element={<Favoritecourses/>}/>
         <Route path="/recommended-courses" element={<Recommendedcourses/>}/>
         <Route path="/profile-setting" element={<Profilesetting/>}/>
         <Route path="/change-password" element={<Changepassword/>}/>

         <Route path="/teacher-login" element={<Teacherlogin/>}/>
         <Route path="/teacher-logout" element={<Teacherlogout/>}/>
         <Route path="/teacher-dashboard" element={<Teacherdashboard/>}/>
         <Route path="/teacher-register" element={<Teacherregister/>}/>
          <Route path="/teacher-user" element={<Myuser/>}/>
           <Route path="/teacher-mycourses" element={<Teachermycourses/>}/>
            <Route path="/teacher-changepassword" element={<Teacherchangepassword/>}/>
             <Route path="/teacher-profilesetting" element={<Teacherprofilesetting/>}/>
              <Route path="/teacher-addcourse" element={<Addcourse/>}/>
               <Route path="/add-chapter/:course_id" element={<AddChapter/>}/>
               <Route path="/edit-chapter/:chapter_id" element={<EditChapter/>}/>
              <Route path="/teacher-detail/:teacher_id" element={<TeacherDetails/>}/>
             <Route path="/all-courses" element={<AllCourses/>}/>
             <Route path="/course-chapters/:course_id" element={<CourseChapters/>}/>
             <Route path="/popular-courses" element={<Popularcourses/>}/>
             <Route path="/popular-teachers" element={<PopularTeachers/>}/>
              <Route path='/category/:category_slug' element={<CategoryCourses/>}/>
              <Route path="/edit-course/:course_id" element={<Editcourse/>}/>


        </Switch>
      <Footer />
    </div>
  );
}

export default Main;