import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const baseURL="http://127.0.0.1:8000/api";
function AllCourses() {
  const[courses,setCourses]=useState([]);
  useEffect(()=>{
      try{  
          axios.get(baseURL+"/course/").then((response)=>{
              setCourses(response.data);
          });}
      catch(error){
          console.log(error);
      } },[]) 

  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4">All Courses</h3>
      <div className="row mb-4">
        
         {courses.map((course,index)=>(
          <div className="col-md-3 col-sm-6 mb-4 col-lg-3">
            <div className="card mb-4" key={index}>
              <img  src={course.featured_image} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>  
                <Link to={'/detail/'+course.id} className="btn btn-primary">View Details</Link>
              </div>
            </div>
            </div>
         ))}

        
      </div>
        
      {/*pagination*/}
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
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
export default AllCourses;
