import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Updatestudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    course: "",
    city: "",
    phone: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`
      );

      const data = await response.json();

      setStudent({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        gender: data.gender || "",
        dob: data.dob || "",
        email: data.email || "",
        password: data.password || "",
        course: data.course || "",
        city: data.city || "",
        phone: data.phone || "",
      });

      if (data.profileImage) {
        setPreview(`http://localhost:5000${data.profileImage}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setProfileImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(student).forEach((key) => {
      formData.append(key, student[key]);
    });

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Student Updated Successfully");
        navigate("/students");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Update Student
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={student.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={student.lastname}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="mb-3">
            <label>Gender</label>
            <br />

            <input
              type="radio"
              name="gender"
              value="Male"
              checked={student.gender === "Male"}
              onChange={handleChange}
            /> Male

            &nbsp;&nbsp;

            <input
              type="radio"
              name="gender"
              value="Female"
              checked={student.gender === "Female"}
              onChange={handleChange}
            /> Female
          </div>

          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={student.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Course</label>
            <input
              type="text"
              className="form-control"
              name="course"
              value={student.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={student.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Profile Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImage}
            />
          </div>

          {preview && (
            <div className="text-center mb-3">
              <img
                src={preview}
                alt="Preview"
                width="120"
                height="120"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Update Student
          </button>

        </form>

        {message && (
          <p className="text-danger mt-3">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default Updatestudent;