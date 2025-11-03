import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../styles/CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const subCategories = ["DailyWear", "PartyWear", "OfficeWear", "Casual"];

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       // let url = `http://localhost:3030/api/products/category/${categoryName}`;
  //       // let url = `/products/category/${categoryName}`;

  //       const params = [];

  //       if (subCategory) params.push(`subCategory=${subCategory}`);
  //       if (params.length) url += "?" + params.join("&");

  //       // const res = await axiosInstance.get(url);
  //       //  const res = await axiosInstance.get(url, { params });
  //       const res = await axiosInstance.get(`/products/category/${categoryName}`,{params});
  //       //checking

  //       let data = res.data;

  //       // Apply local sorting by price or name
  //       if (priceOrder === "low-high") data.sort((a, b) => a.price - b.price);
  //       if (priceOrder === "high-low") data.sort((a, b) => b.price - a.price);
  //       if (sortOption === "a-z") data.sort((a, b) => a.name.localeCompare(b.name));
  //       if (sortOption === "z-a") data.sort((a, b) => b.name.localeCompare(a.name));

  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, [categoryName, subCategory, priceOrder, sortOption]);
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {};
      if (subCategory) params.subCategory = subCategory;
      if (minPrice && minPrice !== "") params.minPrice = minPrice;
      if (maxPrice && maxPrice !== "") params.maxPrice = maxPrice;

      const res = await axiosInstance.get(`/products/category/${categoryName}`, { params });
      let data = res.data;

      // Local sorting
      if (priceOrder === "low-high") data.sort((a, b) => a.price - b.price);
      if (priceOrder === "high-low") data.sort((a, b) => b.price - a.price);
      if (sortOption === "a-z") data.sort((a, b) => a.name.localeCompare(b.name));
      if (sortOption === "z-a") data.sort((a, b) => b.name.localeCompare(a.name));

      setProducts(data);
    } catch (error) {
      console.error("❌ Error fetching products:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [categoryName, subCategory, priceOrder, sortOption, minPrice, maxPrice]);

  const handleProductClick = (id) => {
    if (isLoggedIn) {
      navigate(`/product/${id}`);
    } else {
      navigate("/login");
    }
  };
const hideFilter =
  categoryName === "school-shoes" || categoryName === "accessories";

  return (
    <div className="category-page">
      <h2 className="category-title">{categoryName.replace("-", " ")}</h2>

      {!hideFilter &&
      <div className="filter-bar">
        <div className="filter-group">
          <label>Filter:</label>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="">All</option>
            {subCategories.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      

        <div className="filter-group">
          <label>Price:</label>
          <select value={priceOrder} onChange={(e) => setPriceOrder(e.target.value)}>
            <option value="">Default</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Default</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      
        }

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="product-grid-container">
          {products.map((p) => (
            <div key={p._id} className="product-card" onClick={() => handleProductClick(p._id)}>
              <div className="product-img-wrapper">
                <img src={p.images?.[0]} alt={p.name} className="product-img" />
              </div>
              <div className="product-info">
                <h4>{p.name}</h4>
                <p className="category">{p.category}</p>
                <p className="price">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
