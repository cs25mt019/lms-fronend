import { Link } from "react-router-dom";
import "./CSS/sidebar.css";
function Sidebar() {
  return (
<div className="card student-sidebar">
                <h5 className="card-header"><Link to='/user-dashboard' className="list-group-item list-group-item-action">Dashboard</Link></h5>
                <div className="list-group list-group-flush">
                    <Link to='/my-courses' className="list-group-item list-group-item-action">My Courses</Link>
                    <Link to='/favorite-courses' className="list-group-item list-group-item-action">Favorite Courses</Link>
                    <Link to='/recommended-courses' className="list-group-item list-group-item-action">Recommended Courses</Link>
                    <Link to='/profile-setting' className="list-group-item list-group-item-action">Profile Setting</Link>
                    <Link to='/change-password' className="list-group-item list-group-item-action">Change Password</Link>
                    <Link to='/user-logout' className="list-group-item list-group-item-action text-danger">Logout</Link>
                </div>
            </div>);
        }
export default Sidebar