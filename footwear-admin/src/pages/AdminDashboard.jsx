import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (images.length === 0) {
      setPreviewImages([]);
      return;
    }

    const objectUrls = Array.from(images).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return setMsg("Please select at least one image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("description", description);

    Array.from(images).forEach((file) => formData.append("images", file));

    try {
      await axiosInstance.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMsg("Product added successfully!");
      const timer = setTimeout(() => {
        setMsg("");
      }, 3000);
      setName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImages([]);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.msg || "Upload failed");
    }
  };

  const isSuccess = msg.includes("successfully");

  return (
    <div
      className={styles["admin-dashboard-container"]}
      style={{ maxWidth: "700px", margin: "50px auto" }}
    >
      <h2>Admin Dashboard - Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            padding: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            height:"50px"
          }}
        >
          <option value="">Select Category</option>
          <option value="for-her">For Her</option>
          <option value="for-him">For Him</option>
          <option value="kids">Kidswear</option>
          <option value="unisex">Unisex</option>
          <option value="school-shoes">School Shoes</option>
          <option value="accessories">Accessories</option>
        </select> */}
        <select
  value={subCategory}
  onChange={(e) => setSubCategory(e.target.value)}
  required
  style={{
    padding: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    height: "50px"
  }}
>
  <option value="">Select Sub Category</option>

  {/* For Her */}
  {category === "for-her" && (
    <>
      <option value="heels">Heels</option>
      <option value="flats">Flats</option>
      <option value="sandals">Sandals</option>
    </>
  )}

  {/* For Him */}
  {category === "for-him" && (
    <>
      <option value="formal">Formal</option>
      <option value="casual">Casual</option>
      <option value="sneakers">Sneakers</option>
    </>
  )}

  {/* Kids */}
  {category === "kids" && (
    <>
      <option value="boys">Boys</option>
      <option value="girls">Girls</option>
      <option value="toddlers">Toddlers</option>
    </>
  )}

  {/* Others */}
  {category === "unisex" && (
    <>
      <option value="casual">Casual</option>
      <option value="sports">Sports</option>
    </>
  )}
  {category === "school-shoes" && <option value="uniform">Uniform</option>}
  {category === "accessories" && <option value="belts">Belts</option>}
</select>


        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
        />

        {previewImages.length > 0 && (
          <div className={styles["image-preview-container"]}>
            {previewImages.map((src, idx) => (
              <img key={idx} src={src} alt={`preview-${idx}`} />
            ))}
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>

      {msg && (
        <p className={isSuccess ? styles["success-msg"] : styles["error-msg"]}>
          {msg}
        </p>
      )}
    </div>
  );
};

export default AdminDashboard;
