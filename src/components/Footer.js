import { Link } from "react-router-dom";

function Footer() {
  const student = JSON.parse(localStorage.getItem("student") || "null");
  const teacher = JSON.parse(localStorage.getItem("teacher") || "null");

  return (
    <footer className="bg-dark text-light pt-5 pb-3 border-top mt-auto">
      <div className="container text-center text-md-start">
        <div className="row justify-content-center">

          {/* Brand */}
          <div className="col-12 col-md-3 mb-4 text-center">
            <h5 className="fw-bold">SpringBoard LMS</h5>
            <p className="small">Learn. Grow. Succeed.</p>
            <div>
              <a href ="https://www.facebook.com"><i className="bi bi-facebook text-light mx-2 fs-5"></i></a>
              <a href ="https://www.instagram.com/ashishsaranshi"><i className="bi bi-instagram text-light mx-2 fs-5"></i></a>
              <a href="https://www.linkedin.com/in/ashish-saranshi"><i className="bi bi-linkedin text-light mx-2 fs-5"></i></a>
            </div>
          </div>

          {/* Explore */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold small text-uppercase">Explore</h6>
            <ul className="list-unstyled small">
              <li><Link className="text-light text-decoration-none" to="/">Home</Link></li>
              <li><Link className="text-light text-decoration-none" to="/about">About</Link></li>
              <li><Link className="text-light text-decoration-none" to="/all-courses">Courses</Link></li>
              <li><Link className="text-light text-decoration-none" to="/popular-teachers">Teachers</Link></li>
            </ul>
          </div>

          {/* For Students */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold small text-uppercase">For Students</h6>
            <ul className="list-unstyled small">

              {!student ? (
                <>
                  <li><Link className="text-light" to="/user-login">Login</Link></li>
                  <li><Link className="text-light" to="/user-register">Register</Link></li>
                </>
              ) : (
                <>
                  <li><Link className="text-light" to="/user-dashboard">Dashboard</Link></li>
                  <li><Link className="text-light" to="/my-courses">My Courses</Link></li>
                </>
              )}

            </ul>
          </div>

          {/* For Teachers */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold small text-uppercase">For Teachers</h6>
            <ul className="list-unstyled small">

              {!teacher ? (
                <>
                  <li><Link className="text-light" to="/teacher-login">Login</Link></li>
                  <li><Link className="text-light" to="/teacher-register">Register</Link></li>
                </>
              ) : (
                <>
                  <li><Link className="text-light" to="/teacher-dashboard">Dashboard</Link></li>
                  <li><Link className="text-light" to="/teacher-addcourse">Add Course</Link></li>
                </>
              )}

            </ul>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="d-flex justify-content-between small">
          <span>© 2025 SpringBoard LMS — All rights reserved.</span>
          <span>Developed by <a href ="https://github.com">Anshul Sharma</a> & <a href ="https://github.com">Ashish Saranshi</a>.</span>
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-light text-decoration-none"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
