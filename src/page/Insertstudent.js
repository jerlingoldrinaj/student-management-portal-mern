import { useState } from "react";

function Insertstudent({ handleClose }) {
  const [formData, setFormData] = useState({
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
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/students",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Student Registered Successfully");

        setFormData({
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

        setProfileImage(null);

        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="insert">
      <h3 className="text-center mb-3">
        Student Registration
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={formData.firstname}
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
              value={formData.lastname}
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
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male

          &nbsp;&nbsp;

          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>

          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
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
            value={formData.email}
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
            value={formData.password}
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
            value={formData.course}
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
            value={formData.city}
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
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Profile Image</label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
        >
          Register Student
        </button>

      </form>

      {message && (
        <p className="mt-3 text-success text-center">
          {message}
        </p>
      )}
    </div>
  );
}

export default Insertstudent;