import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Viewstudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Student Deleted Successfully");
        fetchStudents();
      } else {
        alert("Unable to delete student");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-3">
        Student List
      </h2>

      <h5 className="mb-3">
        Total Students : {students.length}
      </h5>

      <div className="table-responsive">

        <table className="table table-bordered table-striped table-hover">

          <thead className="table-success">

            <tr>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Course</th>
              <th>City</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>

          </thead>

          <tbody>

            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>

                  <td>
                    {student.profileImage ? (
                      <img
                        src={`http://localhost:5000${student.profileImage}`}
                        alt="Student"
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.gender}</td>
                  <td>{student.dob}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.city}</td>
                  <td>{student.phone}</td>

                  <td>
                    <Link to={`/update/${student._id}`}>
                      <button className="btn btn-warning btn-sm">
                        Update
                      </button>
                    </Link>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">
                  No Students Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Viewstudent;