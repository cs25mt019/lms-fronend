import { Link } from "react-router-dom";
import { useEffect } from "react";
function Teacherregister() {
     useEffect(()=>{
        document.title="Teacher Registration"
      })
  return (
      <div className="container mt-4">
        <div className="row">
            <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Teacher Register</h5>
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
                                <label htmlFor="Mobile Number" className="form-label">Mobile Number</label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="qualification" className="form-label">Qualification</label>
                                <textarea className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="skills" className="form-label">skills</label>
                                <textarea className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password"/>
                            </div>

                            


                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Teacherregister;