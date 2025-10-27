import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import {Routes as Switch, Route} from 'react-router-dom';
function Addcourse(){
 return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <Teachersidebar></Teachersidebar>
            </aside>
            <section className="col-md-9">
                <div className="card">
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <textarea className="form-control"></textarea>
    
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Technology" className="form-label">Technologies used</label>
                                    <textarea className="form-control"></textarea>
    
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="CourseVideo" className="form-label">Course Video</label>
                                    <input type="file" className="form-control"/>
                                </div>
    
                
                                
                                
                                <button type="submit" className="btn btn-primary">submit</button>
                            </form>
                        </div>
                    </div>
            </section>
        </div>
      </div>
 );
}
export default Addcourse