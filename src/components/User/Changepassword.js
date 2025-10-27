import { Link } from "react-router-dom";
import Mycourses from "./Mycourses";
import Sidebar from "./Sidebar";
function Changepassword() {
  return (
  <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Sidebar></Sidebar>
        </aside>
        <section className="col-md-9">
            <div className="card">
                    <h5 className="card-header">change password</h5>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Old Password</label>
                                <input type="email" className="form-control"/>
                            </div>
                             <div className="mb-3">
                                <label htmlFor="email" className="form-label">New Password</label>
                                <input type="email" className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-primary">submit</button>
                        </form>
                    </div>
                </div>
        </section>
    </div>
  </div>
  )}
export default Changepassword