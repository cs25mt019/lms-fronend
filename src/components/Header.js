import { Link } from "react-router-dom";

function Header() {
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  return (
    <nav className="navbar navbar-expand-lg bg-warning shadow-sm py-3 fs-5 text-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-1" to="/">SpringBoard</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link fs-4" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fs-4" to="/all-courses">Courses</Link>
            </li>

            {/* Teacher Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fs-4" data-bs-toggle="dropdown">
                Teacher
              </a>
              <ul className="dropdown-menu dropdown-menu-end">

                {teacherLoginStatus !== "true" ? (
                  <>
                    <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                  </>
                )}

              </ul>
            </li>

            {/* User Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fs-4" data-bs-toggle="dropdown">
                Student
              </a>
              <ul className="dropdown-menu dropdown-menu-end">

                {studentLoginStatus !== "true" ? (
                  <>
                    <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                  </>
                )}

              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
