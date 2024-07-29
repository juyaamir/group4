import React, { useEffect } from "react";
import { storage } from "../firebaseConfig/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import AddNewProduct from "./AddNewProduct";

const Newimage = () => {
  const [file, setFile] = useState("");
  const [imgurl, setImgurl] = useState("");

  console.log(file);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      //console.log(name);
      const storageRef = ref(storage, "images/file.name");

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
  return (
    <div>
      <div>
        <img src={imgurl} alt="image" />
      </div>
      <form className="border border-2 my-8 ">
        <div className="px-4">
          <h2 className="text-center text-xl font-bold">Add New Product</h2>
          <label for="name">Enter Product Name </label>
          <input
            className="border border-2 m-5"
            type="file"
            name="file"
            id="file "
            onChange={(e) => setFile(e.target.files[0])}
            value={imgurl}
          />
        </div>

        <div className="px-4">
          <input
            className="border border-solid rounded-md text-white bg-black p-2 my-6 justify-end"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      {/*  <AddNewProduct url={imgurl} /> */}
      <AddNewProduct />
    </div>
  );
};

export default Newimage;
