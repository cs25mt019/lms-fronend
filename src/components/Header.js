import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning py-3 fs-5">
  <div className="container">
    <Link className="navbar-brand" to="/">SpringBoard</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        <Link className="nav-link" to="/all-courses">Courses</Link>
  
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Teacher
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
             <Link className="nav-link" to="/teacher-login">Teacher Login</Link>
            <Link className="nav-link" to="/teacher-register">Teacher Register</Link>
            <Link className="nav-link" to="/teacher-dashboard">DashBoard</Link>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">logout</a></li>
          </ul>
        </li>


        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
             <Link className="nav-link" to="/user-login">User Login</Link>
            <Link className="nav-link" to="/user-register">User Register</Link>
            <Link className="nav-link" to="/user-dashboard">DashBoard</Link>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">logout</a></li>
          </ul>
        </li>
       
        
      
      </div>
    </div>
  </div>
</nav>
  );
}

export default Header;
