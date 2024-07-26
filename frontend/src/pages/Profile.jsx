import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  //console.log(id);

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/usersaccounts/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, [id]);

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
      <div className="w-100 vh-100 d-flex justify-center items-center  border border-1 rounded-md m-8">
        {/* <div className='w-50'> */}
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-100 vh-100 d-flex justify-center items-center border border-1 rounded-md m-8">
        <h2>Orders History</h2>
      </div>
    </>
  );
}
export default Profile;
