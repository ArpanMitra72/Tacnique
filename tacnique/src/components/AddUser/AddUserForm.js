import React, { useState } from "react";
import "./AddUserForm.css";

const AddUserForm = ({ onAddUser }) => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    company: {
      name: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setUserData({
        ...userData,
        company: {
          name: value,
        },
      });
    } else {
      // For other input fields, update them directly
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    console.log("Form submitted with data:", userData);
    e.preventDefault();
    const { id, name, email, company } = userData;
    if (!id || !name || !email || !company.name) {
      alert("All fields are mandatory. Please fill in all the fields.");
      return;
    }
    onAddUser(userData);
    setUserData({
      id: "",
      name: "",
      email: "",
      company: {
        name: "",
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        name="id"
        value={userData.id}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Company"
        name="company"
        value={userData.company.name}
        onChange={handleInputChange}
      />
      <button type="submit" className="finalAddButton">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
