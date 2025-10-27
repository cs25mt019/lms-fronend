import { Link } from "react-router-dom";
import Mycourses from "./Mycourses";
import Teachersidebar from "./Teachersidebar";
function Teacherdashboard() {
  return (
  <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Teachersidebar></Teachersidebar>
        </aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">My dashboard</h5>
                
            </div>
        </section>
    </div>
  </div>
  )}
export default Teacherdashboard