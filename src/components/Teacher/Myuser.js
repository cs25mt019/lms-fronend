import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import {Routes as Switch, Route} from 'react-router-dom';
function Myuser(){
 return (
    <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Teachersidebar></Teachersidebar>
        </aside>
        <section className="col-md-9">
    <div className="card">
                <h5 className="card-header">My users</h5>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            
                        </thead>
                        <tbody>
                            <tr className="px-2 py-2">
                           
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
             </section>
    </div>
  </div>
 );
}
export default Myuser