import { Link } from "react-router-dom";
import Mycourses from "./Mycourses";
import Sidebar from "./Sidebar";
function Profilesetting() {
  return (
  <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Sidebar></Sidebar>
        </aside>
        <section className="col-md-9">
            <div className="card">
                    <h5 className="card-header">Profile setting</h5>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="name"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Username</label>
                                <input type="email" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Profile Picture</label>
                                <input type="file" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Interests</label>
                                <textarea className="form-control"></textarea>

                            </div>
                            <button type="submit" className="btn btn-primary">submit</button>
                        </form>
                    </div>
                </div>
        </section>
    </div>
  </div>
  )}
export default Profilesetting