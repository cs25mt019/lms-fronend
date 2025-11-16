import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalSearch from "./GlobalSearch";

function Header() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const updateRole = () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");
      const currentRole = localStorage.getItem("role");

      // Role should exist only if valid tokens exist
      if (access && refresh && currentRole) setRole(currentRole);
      else setRole(null);

      setInitialized(true);
    };

    // Run on mount
    updateRole();

    // Update header dynamically when storage changes (login/logout)
    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  // Loading guard (prevents flicker)
  if (!initialized) {
    return (
      <nav className="navbar navbar-expand-lg bg-warning shadow-sm py-3 fs-5 text-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-1 text-dark" to="/">
            SpringBoard
          </Link>
        </div>
      </nav>
    );
  }

  const isTeacher = role === "teacher";
  const isStudent = role === "student";

  return (
    <nav className="navbar navbar-expand-lg bg-warning shadow-sm py-3 fs-5 text-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-1 text-dark" to="/">
          SpringBoard
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="ms-auto" style={{ width: "350px" }}>
          <GlobalSearch />
        </div>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fs-4" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fs-4" to="/all-courses">
                Courses
              </Link>
            </li>

            {/* ===== TEACHER MENU ===== */}
            {!isStudent && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fs-4"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  Teacher
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {!isTeacher ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/teacher-login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/teacher-register">
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/teacher-dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/teacher-logout">
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            )}

            {/* ===== STUDENT MENU ===== */}
            {!isTeacher && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fs-4"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  Student
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {!isStudent ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/user-login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/user-register">
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/user-dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/user-logout">
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
