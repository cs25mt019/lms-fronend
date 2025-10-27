import { Link } from "react-router-dom";

function TeacherDetails(){
    return (
       <div className="container mt-3">
        <div className="row">
            <div className="col-4">
                <img src="/logo512.png" className="img-thumbnail" alt="..."/>
            </div>


            <div className="col-8">
                <h3>John Smith</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p className="fw-bold">Skills: <Link To="/category/php">PHP</Link>
  <Link to="/category/php">JAVA</Link><Link To="/category/php">Python</Link></p>
  <p className="fw-bold">Recent Courses: <Link to="/category/php">PHP</Link><Link to="/category/php">JAVA</Link><Link to="/category/php">Python</Link></p>
  <p className="fw-bold">Rating: 4.5/5</p>
            </div>
          

        </div>
        {/* Course Videos Section */}
        <div className="card mt-4">
            <h5 className="card-header">
                Course List
            </h5>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><Link to="/teacher-detail/1">MyCourse 1</Link></li>
             <li className="list-group-item"><Link to="/teacher-detail/1">MyCourse 2</Link></li>
              <li className="list-group-item"><Link to="/teacher-detail/1">MyCourse 3</Link></li>
               <li className="list-group-item"><Link to="/teacher-detail/1">MyCourse 4</Link></li>
                <li className="list-group-item"><Link to="/teacher-detail/1">MyCourse 5</Link></li>
        </ul>
        </div>

    </div>
    )
}
export default TeacherDetails