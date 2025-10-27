import { Link } from "react-router-dom";
function PopularTeachers() {
  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4">Popular Courses</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">John Doe</Link>
              </h5>
              <div className="card-footer">4.5/5</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
           <div className="card">
            <Link to="/detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">John Doe</Link>
              </h5>
              <div className="card-footer">4.5/5</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">John Doe</Link>
              </h5>
              <div className="card-footer">4.5/5</div>
            </div>
          </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">John Doe</Link>
              </h5>
              <div className="card-footer">4.5/5</div>
            </div>
          </div>
        </div>
  
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabindex="-1"
              aria-disabled="true"
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default PopularTeachers;
