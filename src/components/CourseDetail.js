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
  <p className="fw-bold">Course By: <Link to="/teacher-detail/1">Teacher 1</Link></p>
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
            <li className="list-group-item">Introduction <button className="btn btn-sm btn-danger float-end " data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi bi-play-circle-fill"></i></button>
            <div className="modal fade" id="videoModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="ratio ratio-16x9">
          <iframe src="https://youtu.be/VEQ-XJWiQMM?si=ue0YlcZt0eRHYKt8" title="YouTube video" allowFullScreen></iframe>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
            
            </li>
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