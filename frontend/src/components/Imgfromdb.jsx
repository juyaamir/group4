import React from "react";
import axios from "axios";
import { useState } from "react";

import { useEffect } from "react";

const Imgfromdb = () => {
  const [imgId, setImgId] = useState(null);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchuserimage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user-image/${id}`
        );
        setImgId(response.data);
      } catch (error) {
        console.error(`Error in fetching Product data: ${error}`);
      }
    };

    fetchuserimage();
  }, [id]);
  imgId?.map((item) => item.userid);

  if (imgId) {
    return (
      <div>
        <img src={imgId?.image} alt={imgId.userid} />
      </div>
    );
  }
};

export default Imgfromdb;
