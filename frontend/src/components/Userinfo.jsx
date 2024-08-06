import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Avatar } from "antd";
/* const { Text } = Typography; */
import { UserOutlined } from "@ant-design/icons";
const Userinfo = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  let id = localStorage.getItem("userId");
  //console.log(id);
  const [userimg, setuserimg] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/usersaccounts/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching user data");
      });
  }, [id]);

  useEffect(() => {
    const fetchuserimage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user-image/${id}`
        );
        setuserimg(response.data);
      } catch (error) {
        console.error(`Error in fetching Product data: ${error}`);
      }
    };

    fetchuserimage();
  }, []);
  const lastuserimg = userimg && userimg[userimg.length - 1];
  //console.log(lastuserimg);
  return (
    <div className="p-14 flex flex-row gap-6">
      <div className="w-10 border border-2 rounded-full">
        {lastuserimg ? (
          <img src={lastuserimg.image} height="100" width="100" />
        ) : (
          <div className="">
            <Avatar size={40}>{user?.firstname}</Avatar>
          </div>
        )}
      </div>
      {user?.firstname} &nbsp;&nbsp;
      {user?.lastname}
    </div>
  );
};

export default Userinfo;
