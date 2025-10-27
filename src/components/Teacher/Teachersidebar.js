import { Link } from "react-router-dom";

function Teachersidebar() {
  return (
<div className="card">
                <h5 className="card-header"><Link to='/user-dashboard' className="list-group-item list-group-item-action">Dashboard</Link></h5>
                <div className="list-group list-group-flush">
                    <Link to='/teacher-mycourses' className="list-group-item list-group-item-action">My Courses</Link>
                    <Link to='/teacher-addcourse' className="list-group-item list-group-item-action">Add Courses</Link>
                    <Link to='/teacher-user' className="list-group-item list-group-item-action">My Users</Link>
                    <Link to='/teacher-profilesetting' className="list-group-item list-group-item-action">Profile Setting</Link>
                    <Link to='/teacher-changepassword' className="list-group-item list-group-item-action">Change Password</Link>
                    <Link to='/teacher-login' className="list-group-item list-group-item-action text-danger">Logout</Link>
                </div>
            </div>);
        }
export default Teachersidebar