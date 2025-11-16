import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

function ChapterNotes() {
  const { chapter_id } = useParams();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
  `${baseUrl}lecture-notes/?chapter=${chapter_id}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  }
);

      setNotes(res.data);
    } catch (err) {
      console.log("Error loading notes:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, [chapter_id]);

  const handleDelete = async (noteId) => {
    if (window.confirm("Delete this note?")) {
      await axios.delete(
  `${baseUrl}lecture-notes/${noteId}/`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  }
);

      fetchNotes();
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        
        {/* Sidebar */}
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        {/* Notes Section */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              Lecture Notes ({notes.length})
            </h5>

            <div className="card-body">
              <Link to={`/add-lecture-note/${chapter_id}`} className="btn btn-success mb-3">
                + Add Lecture Note
              </Link>

              {loading ? (
                <p>Loading...</p>
              ) : notes.length === 0 ? (
                <div className="alert alert-info">No notes available.</div>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>File</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note, index) => (
                      <tr key={note.id}>
                        <td>{index + 1}</td>
                        <td>{note.title}</td>

                        <td>
                          {note.file ? (
                            <a
                              href={note.file}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-primary"
                            >
                              View File
                            </a>
                          ) : (
                            <span className="text-muted">No file</span>
                          )}
                        </td>

                        <td>{note.description || "—"}</td>

                        <td>
                          <button
                            onClick={() => handleDelete(note.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                          <Link
  to={`/edit-lecture-note/${note.id}`}
  className="btn btn-sm btn-info mx-1"
>
  Edit
</Link>

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

export default ChapterNotes;
