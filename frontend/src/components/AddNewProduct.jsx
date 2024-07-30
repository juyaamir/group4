import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../firebaseConfig/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddNewProduct = () => {
  const [file, setFile] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    category: "",
    image: "",
  });

  // console.log(imgurl);

  const { productname, price, category, image } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  ///Create Product//
  const handleSubmit = (e) => {
    // e.preventDefault();
    // axios.post(`http://localhost:8000/api/v1/product/${newitem}`);
    axios
      .post("http://localhost:8000/api/v1/product", formData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      //console.log(name);
      const storageRef = ref(storage, `images/file.${name}`);

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

  useEffect(() => {
    setFormData({ ...formData, image: imgurl });
  }, [imgurl]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="border border-2 my-8 ">
        <div className="px-4">
          <h2 className="text-center text-xl font-bold">Add New Product</h2>
          <label for="name">Enter Product Name </label>
          <input
            className="border border-2 m-5"
            type="text"
            name="productname"
            id="productname"
            onChange={handleChange}
            value={productname}
            required
          />
        </div>
        <div className="px-4">
          <label for="price">Enter Product Price </label>
          <input
            className="border border-2 m-5"
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            value={price}
            required
          />
        </div>
        <div className="px-4">
          <input
            className="border border-2 m-5"
            type="radio"
            name="category"
            id="category"
            onChange={handleChange}
            value="Travel Clothing"
          />
          <label for="price">Travel Clothing</label>
        </div>

        <div className="px-4">
          <input
            className="border border-2 m-5"
            type="radio"
            name="category"
            id="category"
            onChange={handleChange}
            value="Electronics"
          />
          <label for="price">Electronics </label>
        </div>
        <div className="px-4">
          <input
            className="border border-2 m-5"
            type="radio"
            name="category"
            id="category"
            onChange={handleChange}
            value="Bags"
          />
          <label for="price">Bags </label>
        </div>

        <div className="px-4">
          <input
            className="border border-2 m-5"
            type="radio"
            name="category"
            id="category"
            onChange={handleChange}
            value="Cosmetics"
          />
          <label for="price">Cosmetics</label>
        </div>

        <div className="px-4">
          <label for="name">Add Image</label>
          <input
            className=""
            type="file"
            name="image"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
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
    </div>
  );
};

export default AddNewProduct;
