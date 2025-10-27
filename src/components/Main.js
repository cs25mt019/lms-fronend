import Header from './Header';
import Home from './Home';
import CourseDetail from "./CourseDetail";
import Login from './User/login';
import Register from './User/Register';
import About from './About';
import Footer from './Footer';

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
        </Switch>
      <Footer />
    </div>
  );
}

export default Main;