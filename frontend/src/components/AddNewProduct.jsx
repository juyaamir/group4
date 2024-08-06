import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../firebaseConfig/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Select, Space } from "antd";
import { Upload } from "antd";

const AddNewProduct = () => {
  /*  const handleChangeoption = (value) => {
    console.log(`selected ${value}`);
  }; */

  const [file, setFile] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    category: "",
    image: "",
    brand: "",
    size: "",
    imageDescription: "",
  });

  // console.log(imgurl);

  const { productname, price, category, image, brand, size, imageDescription } =
    formData;

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
    <div className="text-center my-2">
      <form onSubmit={handleSubmit} className="">
        <div className="px-4 my-2">
          <h2 className="text-center text-xl font-bold">Add New Product</h2>

          <input
            className="input input-bordered input-md w-full max-w-xs"
            type="text"
            name="productname"
            id="productname"
            placeholder="Enter Product Name"
            onChange={handleChange}
            value={productname}
            required
          />
        </div>
        <div className="px-4 my-2">
          <input
            className="input input-bordered input-md w-full max-w-xs"
            type="text"
            name="price"
            id="price"
            placeholder="Enter Price"
            onChange={handleChange}
            value={price}
            required
          />
        </div>
        {/*  <div className="px-4">
          <input
            className="border border-2 m-5"
            type="radio"
            name="category"
            id="category"
            onChange={handleChange}
            value="Travel Clothing"
          />
          <label htmlFor="price">Travel Clothing</label>
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
          <label htmlFor="price">Electronics </label>
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
          <label htmlFor="price">Bags </label>
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
          <label htmlFor="price">Cosmetics</label>
        </div> */}

        <div className="px-4 my-2">
          <input
            className="file-input file-input-bordered file-input-xs w-full max-w-xs"
            type="file"
            name="image"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="px-4 my-2">
          <select
            name="category"
            id="category"
            onChange={handleChange}
            className="select select-bordered select-xs w-full max-w-xs"
          >
            <option value="#">Select Category</option>
            <option value="Travel Clothing">Travel Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Bags">Bags</option>
            <option value="Camping Gear">Camping Gear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div className="px-4 my-2">
          <input
            className="input input-bordered input-md w-full max-w-xs"
            type="text"
            name="brand"
            id="brand"
            placeholder="Brand"
            onChange={handleChange}
            value={brand}
          />
        </div>

        <div className="px-4 my-2">
          <input
            className="input input-bordered input-md w-full max-w-xs"
            type="textarea"
            name="imageDescription"
            id="imageDescription"
            placeholder="Image Description"
            onChange={handleChange}
            value={imageDescription}
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
