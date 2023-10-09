import React, { useEffect, useState } from "react";
import axios from "axios";
import TableHead from "../TableHead/TableHead";
import AddUserForm from "../AddUser/AddUserForm";
import Pagination from "../Pagination/Pagination";
import "./UsersList.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users. Please try again later.");
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (userId) => {
    setEditingUser(userId);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Error deleting user. Please try again later.");
      console.error("Error deleting user:", error);
    }
  };

  const handleAdd = () => {
    setShowForm(!showForm);
  };

  const handleAddUser = async (newUser) => {
    try {
      // Simulate a successful response
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      // Add the new user to the users list
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      setError("Error adding user. Please try again later.");
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = (userId, field, value) => {
    console.log(field);
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            [field]: value,
          }
        : user
    );
    setUsers(updatedUsers);
  };

  const handleSave = (userId) => {
    console.log("Save user with ID:", userId);
    setEditingUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const usersToDisplay = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <table className="MainTable">
        <TableHead />
        <tbody>
          {usersToDisplay.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={user.name.split(" ")[0]}
                    onChange={(e) =>
                      handleUpdateUser(
                        user.id,
                        "name",
                        `${e.target.value} ${user.name.split(" ")[1]}`
                      )
                    }
                  />
                ) : (
                  user.name.split(" ")[0]
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={user.name.split(" ")[1]}
                    onChange={(e) =>
                      handleUpdateUser(
                        user.id,
                        "name",
                        `${user.name.split(" ")[0]} ${e.target.value}`
                      )
                    }
                  />
                ) : (
                  user.name.split(" ")[1]
                )}
              </td>

              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      handleUpdateUser(user.id, "email", e.target.value)
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={user.company.name}
                    onChange={(e) =>
                      handleUpdateUser(user.id, "company", {
                        ...user.company,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.company.name
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <>
                    <button
                      className="save-button"
                      onClick={() => handleSave(user.id)}
                    >
                      Save
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <button onClick={handleAdd} className="add-user-button">
        {showForm ? "Hide Form" : "Add User"}
      </button>
      {showForm && <AddUserForm onAddUser={handleAddUser} />}
    </div>
  );
}
export default UsersList;
