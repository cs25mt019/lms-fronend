import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Teachersidebar from "./Teachersidebar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api/";

function CourseChapters() {
  const [chapterData, setChapterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  const { course_id } = useParams();
  console.log("Course ID:", course_id);

  useEffect(() => {
    fetchChapters();
  }, [course_id]);

  const fetchChapters = async () => {
    try {
      const res = await axios.get(`${baseUrl}course-chapters/${course_id}/`);
      console.log("Chapters:", res.data);

      setChapterData(res.data);
      setTotalResult(res.data.length);
    } catch (error) {
      console.log("Error loading chapters:", error);
      Swal.fire("Error", "Failed to load chapters", "error");
    }
  };

  // Delete Chapter
  const handleDeleteClick = (chapterId, chapterTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete chapter: ${chapterTitle}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}chapter/${chapterId}/`);
          Swal.fire("Deleted!", "Chapter removed successfully.", "success");

          fetchChapters(); // Refresh list
        } catch (error) {
          console.log("Delete Error:", error);
          Swal.fire("Error", "Failed to delete chapter", "error");
        }
      }
    });
  };

  // Fix for video URL
  const getVideoUrl = (video) => {
    if (!video) return "";
    if (typeof video === "string") return video;
    if (video.url) return video.url;
    return "";
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              All Chapters ({totalResult})
            </h5>

            <div className="card-body">
              {chapterData.length === 0 ? (
                <div className="alert alert-info">
                  No chapters found.{" "}
                  <Link to={`/add-chapter/${course_id}`}>
                    Add your first chapter
                  </Link>
                </div>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Video</th>
                      <th>Remarks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {chapterData.map((chapter, index) => (
                      <tr key={chapter.id}>
                        <td>{index + 1}</td>

                        <td>
                          <Link to={`/edit-chapter/${chapter.id}`}>
                            {chapter.title}
                          </Link>
                        </td>

                        <td>
                          {getVideoUrl(chapter.video) ? (
                            <video
                              width="200"
                              controls
                              style={{ maxWidth: "100%" }}
                            >
                              <source
                                src={getVideoUrl(chapter.video)}
                                type="video/mp4"
                              />
                              Your browser does not support video.
                            </video>
                          ) : (
                            <span className="text-muted">No video</span>
                          )}
                        </td>

                        <td>{chapter.remarks || "No remarks"}</td>

                        <td>
                          <Link
                            to={`/edit-chapter/${chapter.id}`}
                            className="btn btn-sm btn-info mx-1 mb-1"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDeleteClick(chapter.id, chapter.title)
                            }
                            className="btn btn-sm btn-danger mx-1 mb-1"
                          >
                            Delete
                          </button>
                          <Link
  to={`/chapter-notes/${chapter.id}`}
  className="btn btn-sm btn-warning mx-1 mb-1"
>
  Notes
</Link>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-3">
                <Link
                  to={`/add-chapter/${course_id}`}
                  className="btn btn-success"
                >
                  + Add New Chapter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CourseChapters;
