import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Avatar } from "antd";
/* const { Text } = Typography; */
const Userinfo = () => {
  const [user, setUser] = useState(null);
  let id = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/usersaccounts/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, [id]);
  return (
    <div className="p-14 flex flex-row gap-6">
      <Avatar size={40}>{user?.firstname}</Avatar>
      {user?.firstname} &nbsp;&nbsp;
      {user?.lastname}
    </div>
  );
};

export default Userinfo;
