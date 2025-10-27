import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import {Routes as Switch, Route} from 'react-router-dom';
function Mycourses(){
 return (
    <div className="container mt-4">
    <div className="row">
        <aside className="col-md-3">
            <Sidebar></Sidebar>
        </aside>
        <section className="col-md-9">
    <div className="card">
                <h5 className="card-header">My dashboard</h5>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Created by</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="px-2 py-2">
                            <td>Php developement</td>
                            <td><Link to="">Ashish</Link></td>
                            <td>
                                <button className="btn bg-primary text-light px-2">Watch</button>
                            </td>
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
export default Mycourses