import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import {Routes as Switch, Route} from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";
function Teachermycourses(){
    const[courses,setCourses]=useState([]);
    const teacherId=localStorage.getItem('teacherId');
    useEffect(()=>{
        try{
            axios.get("http://127.0.0.1:8000/api/teacher-course/"+teacherId).then((response)=>{
                setCourses(response.data);
                //console.log(response.data);
            });}
        catch(error){
            console.log(error);
        }},[])
    
 return (
    <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Teachersidebar></Teachersidebar>
        </aside>
        <section className="col-md-9">
    <div className="card">
                <h5 className="card-header">My courses</h5>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course,index)=>(
                                <tr className="px-2 py-2" key={index}>
                                    <td><Link to={'/course-chapters/'+course.id}>{course.title}</Link></td>
                                    <td><img src={course.featured_image} alt={course.title} width="100"/></td>
                                    <td>
                                        <Link to={'/edit-course/'+course.id} className="btn btn-sm btn-success mx-2">Edit</Link>   
                                        <Link to={'/add-chapter/'+course.id} className="btn btn-sm btn-primary mx-2">Add Chapters</Link>
                                        <Link to={'/add-chapter/'+course.id} className="btn btn-sm btn-danger mx-2">Delete</Link>   
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             </section>
    </div>
  </div>
 );
}
export default Teachermycourses