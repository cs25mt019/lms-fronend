import { Link } from "react-router-dom";
function Popularcourses() {
  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4">All Courses</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Course title</Link>
              </h5>
              <div className="card-footer">4.5/5</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
              <div className="card-footer">
                <div className="title">
                  <span className="">Rating : 4.5/5</span>
                  <span className="float-end">View : 787</span>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
               <div className="card-footer">
                <div className="title">
                  <span className="">Rating : 4.5/5</span>
                  <span className="float-end">View : 787</span>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
               <div className="card-footer">
                <div className="title">
                  <span className="">Rating : 4.5/5</span>
                  <span className="float-end">View : 787</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      {/*pagination*/}
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
export default Popularcourses;
