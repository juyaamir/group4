import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddAdmin from "../components/AddAdmin";
import WelcomeMessage from "../components/WelcomeMessage";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/usersaccounts/${id}`)
      .then((response) => {
        setUser(response.data);
        setFormData({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          password: 'response.data.password'
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/v1/usersaccounts/${id}`, formData)
      .then((response) => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error updating user data");
      });
  };

  if (error) {
    return (
      <div className="w-50 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50">{error}</div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="w-50 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50">Loading...</div>
      </div>
    );
  }
  return (
    <>
      {user && (
        <div>
          <WelcomeMessage firstName={user.firstname} />
          <div className="w-100 vh-100 d-flex justify-center items-center  border border-1 rounded-md m-8">
            {!editMode ? (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Is Admin</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{"••••••••"}</td>
                      <td>{localStorage.getItem("isAdmin")}</td>
                      <td>
                        <button className="text-blue-500" onClick={() => setEditMode(true)}>Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="w-50 flex flex-col items-center p-2">
                <div className="mb-4">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 bg-white rounded text-black"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control mt-1 p-2 bg-white rounded text-black"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control mt-1 p-2 bg-white rounded text-black"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control mt-1 p-2 bg-white rounded text-black"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="m-4">
                <button type="submit" className="btn btn-primary w-20 mr-4">Save</button>
                <button type="button" className="btn btn-secondary w-20" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
          <div className="w-100 vh-100 d-flex justify-center items-center border border-1 rounded-md m-8">
            <h2>Orders History</h2>
          </div>
          <AddAdmin />
        </div>
      )}
    </>
  );
}

export default Profile;
