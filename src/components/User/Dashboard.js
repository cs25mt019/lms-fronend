import { Link } from "react-router-dom";
import Mycourses from "./Mycourses";
import Sidebar from "./Sidebar";
function DashBoard() {
  return (
  <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Sidebar></Sidebar>
        </aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">My dashboard</h5>
                
            </div>
        </section>
    </div>
  </div>
  )}
export default DashBoard