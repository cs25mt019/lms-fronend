import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import api from "../../utils/api";

function Favoritecourses() {
  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?.id;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api
      .get(`favorites/${studentId}/`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Fav load error:", err));
  }, []);

  const removeFavorite = async (courseId) => {
    try {
      await api.delete(`favorites/remove/${studentId}/${courseId}/`);
      setFavorites(favorites.filter((f) => f.course !== courseId));
    } catch (err) {
      console.error("Failed to delete favorite:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Favorite Courses</h5>

            <div className="card-body">
              {favorites.length === 0 ? (
                <p className="text-muted">No favorite courses yet.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Teacher</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((f) => (
                      <tr key={f.id}>
                        <td>
  <Link to={`/detail/${f.course}`} className="text-decoration-none">
    {f.course_title}
  </Link>
</td>

                        <td>
                          <Link to={`/teacher-detail/${f.teacher_id}`}>
                            {f.teacher_name}
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeFavorite(f.course)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Favoritecourses;
