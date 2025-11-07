import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 border-top">
      <div className="container text-center text-md-start">
        <div className="row justify-content-center">

          {/* Brand */}
          <div className="col-12 col-md-3 mb-4 text-center">
            <h5 className="fw-bold">SpringBoard LMS</h5>
            <p className="text-light small mb-2">
              Learn. Grow. Succeed.
            </p>
            <div>
              <a href="#" className="text-light me-3 fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light me-3 fs-5"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light me-3 fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Explore */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold text-uppercase small">Explore</h6>
            <ul className="list-unstyled small">
              <li><Link className="text-light text-decoration-none text-light" to="/">Home</Link></li>
              <li><Link className="text-light text-decoration-none" to="/about">About</Link></li>
              <li><Link className="text-light text-decoration-none" to="/all-courses">Courses</Link></li>
              <li><Link className="text-light text-decoration-none" to="/popular-teachers">Teachers</Link></li>
            </ul>
          </div>

          {/* Students */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold text-uppercase small">For Students</h6>
            <ul className="list-unstyled small">
              <li><Link className="text-light text-decoration-none" to="/user-login">Login</Link></li>
              <li><Link className="text-light text-decoration-none" to="/user-register">Register</Link></li>
              <li><Link className="text-light text-decoration-none" to="/user-dashboard">Dashboard</Link></li>
              <li><Link className="text-light text-decoration-none" to="/my-courses">My Courses</Link></li>
            </ul>
          </div>

          {/* Teachers */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold text-uppercase small">For Teachers</h6>
            <ul className="list-unstyled small">
              <li><Link className="text-light text-decoration-none" to="/teacher-login">Login</Link></li>
              <li><Link className="text-light text-decoration-none" to="/teacher-register">Register</Link></li>
              <li><Link className="text-light text-decoration-none" to="/teacher-dashboard">Dashboard</Link></li>
              <li><Link className="text-light text-decoration-none" to="/teacher-addcourse">Add Course</Link></li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="d-flex justify-content-between small">
          <span className="text-light">© 2025 SpringBoard LMS — All rights reserved.</span>
          <a href="#" className="text-light text-decoration-none">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
