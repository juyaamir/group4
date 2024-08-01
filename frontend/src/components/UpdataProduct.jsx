import axios from "axios";
import { useState, useEffect } from "react";
import { storage } from "../firebaseConfig/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UpdataProduct = ({ itemid, ct }) => {
  const [file, setFile] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [updateFormData, setUpdateFormData] = useState({
    productname: "",
    price: "",
    category: ct,
    image: "",
  });

  const { productname, price, category, image } = updateFormData;

  const handleChange1 = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });

    console.log(updateFormData);
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/product/${itemid}`,
        updateFormData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
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
    setUpdateFormData({ ...updateFormData, image: imgurl });
  }, [imgurl]);

  return (
    <div>
      <form onSubmit={handleSubmit1} className="flex flex-col border-1">
        <div className="flex-col px-2 my-2">
          <h2 className="text-center text-xl font-bold">Edit</h2>
          {/*  <label htmlFor="productname">Enter Product Name </label> */}
          <input
            className="input input-bordered input-md w-full max-w-xs"
            type="text"
            name="productname"
            id="productname"
            placeholder="Enter Product Name"
            onChange={handleChange1}
            value={productname}
            required
          />
        </div>
        <div className="px-2 my-2">
          {/* <label htmlFor="price">Enter Product Price </label> */}
          <input
            className="input input-bordered input-md w-full max-w-xs "
            type="text"
            name="price"
            id="price"
            placeholder="Enter Product Price"
            onChange={handleChange1}
            value={price}
            required
          />
        </div>
        {/*   <div className="px-4">
          <input
            className="border border-2 "
            type="radio"
            name="category"
            id="category"
            onChange={handleChange1}
            value={ct}
          />
          <label htmlFor="category">&nbsp;{ct}</label>
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

export default UpdataProduct;
