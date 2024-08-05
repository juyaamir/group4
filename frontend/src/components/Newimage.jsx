import React, { useEffect, useInsertionEffect } from "react";
import { storage } from "../firebaseConfig/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRef, useState } from "react";
import { Image } from "antd";
import { Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Imgfromdb from "./Imgfromdb.jsx";

const Newimage = () => {
  const [file, setFile] = useState("");
  const [imgurl, setImgurl] = useState("");
  const inputRef = useRef(null);
  const [imgId, setImgId] = useState(null);

  let id = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userid: id,
    image: "",
  });

  //console.log(imgurl);

  const { userid, image } = formData;

  /* const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  }; */

  ///Create Product//
  const handleSubmit = (e) => {
    // e.preventDefault();

    axios
      .post("http://localhost:8000/api/v1/user-image", formData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /*  console.log(file); */
  const handleImageClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      //console.log(name);
      const storageRef = ref(storage, "userimages/file.name");

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImgurl(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  //user image from db fetching"///
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

  useEffect(() => {
    setFormData({ ...formData, image: imgurl });
  }, [imgurl]);
  const latestimg = imgId && imgId[imgId.length - 1];
  // console.log(latestimg);
  return (
    <>
      {/* <div>
        {imgId ? (
          <img src={imgId.image} height="100" width="100" />
        ) : (
          "No image found"
        )}
      </div> */}
      {/* <div>
        {latestimg ? (
          <img src={latestimg.image} height="100" width="100" />
        ) : (
          "No image found"
        )}
      </div> */}

      <form onSubmit={handleSubmit} className="flex flex row">
        <div onClick={handleImageClick} className="px-4">
          {latestimg ? (
            <img src={latestimg.image} height="100" width="100" />
          ) : (
            <div className="">
              <Avatar icon={<PlusOutlined />} />
            </div>
          )}

          {/* <input
          type="text"
          onChange={handleChange}
          name="userid"
          value={userid}
          style={{ display: "none" }}
        /> */}
          <input
            type="file"
            ref={inputRef}
            name="file"
            id="file "
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
            /*  value={imgurl} */
          />
        </div>

        <input
          className="text-end text-black bg-base-100 right-0 bottom-0"
          type="submit"
          value="Save"
        />
      </form>
    </>
  );
};

export default Newimage;
