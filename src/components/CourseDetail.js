import{useParams} from "react-router-dom";
import { Link } from "react-router-dom";

function CourseDetail() {
    let {course_id} = useParams();
  return (
    <div className="container mt-3">
        <div className="row">
            <div className="col-4">
                <img src="/logo512.png" className="img-thumbnail" alt="..."/>
            </div>

            {/* Course Info Section */}
            <div className="col-8">
                <h3>Course Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p className="fw-bold">Course By: <a href="#">Teacher 1</a></p>
  <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
  <p className="fw-bold">Total Enrolled: 456 Students</p>
  <p className="fw-bold">Rating: 4.5/5</p>
            </div>
            {/* End Course Info Section */}

        </div>
        {/* Course Videos Section */}
        <div className="card mt-4">
            <h5 className="card-header">
                Course Videos
            </h5>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Introduction <button className="btn btn-sm btn-danger float-end"><i className="bi bi-play-circle-fill"></i></button></li>
            <li className="list-group-item">Introduction <button className="btn btn-sm btn-danger float-end"><i className="bi bi-play-circle-fill"></i></button></li>
            <li className="list-group-item">Introduction <button className="btn btn-sm btn-danger float-end"><i className="bi bi-play-circle-fill"></i></button></li>
            <li className="list-group-item">Introduction <button className="btn btn-sm btn-danger float-end"><i className="bi bi-play-circle-fill"></i></button></li>
            <li className="list-group-item">Introduction <button className="btn btn-sm btn-danger float-end"><i className="bi bi-play-circle-fill"></i></button></li>
            <li className="list-group-item">Introduction <button className="btn btn-sm btn-danger float-end"><i className="bi bi-play-circle-fill"></i></button></li>
        </ul>
        </div>
        {/* End Course Videos Section */}

        {/* Related Courses Section */}
        <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
  <Link to="/detail/1"><img src="/logo512.png" className="card-img-top" alt="..."/></Link>
  <div className="card-body">
    <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
  </div>
</div>
        </div>

        <div className="col-md-3">
          <div className="card">
  <a href="#"><img src="/logo512.png" className="card-img-top" alt="..."/></a>
  <div className="card-body">
    <h5 className="card-title"><a href="#">Course title</a></h5>
  </div>
</div>
        </div>
        </div>
        {/* End Related Courses Section */}


    </div>
  );
}

export default CourseDetail;