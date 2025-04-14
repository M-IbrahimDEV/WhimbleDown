import React, { useState, useRef, useEffect, useReducer} from "react";
import "./dashboard.scss";

import Navbar from '../../components/navbar/navbar';
import Topbar from "../../components/topbar/topbar";
import Footer from '../../components/footer/footer';

const initialMenuItems = [
  {
    id: 1,
    name: "Brookie",
    price: "300.0 Pkr",
    image: "./Brookie.jpg",
    category: "Cookies",
    isActive: true,
  },
  {
    id: 2,
    name: "Classic Chocolate Chip",
    price: "310.0 Pkr",
    image: "./classic-choc-chip.jpg",
    category: "Cookies",
    isActive: false,
  },
  {
    id: 3,
    name: "Double Chocolate Chip",
    price: "320.0 Pkr",
    image: "./double-choc-chip.jpg",
    category: "Bread",
    isActive: true,
  },
  {
    id: 4,
    name: "Hazelnut Chocolate Chip",
    price: "330.0 Pkr",
    image: "./Hazelnut-chocolate-chip.jpg",
    category: "Brownie",
    isActive: true,
  },
  {
    id: 5,
    name: "Lindt Dark Chocolate Chip",
    price: "340.0 Pkr",
    image: "./Lindt-Dark-Chocolate-Chip.jpg",
    category: "Jumbo",
    isActive: false,
  },
  {
    id: 6,
    name: "Lindt Milk",
    price: "350.0 Pkr",
    image: "./Lindt-Milk.jpg",
    category: "Cookies",
    isActive: true,
  },
  {
    id: 7,
    name: "Pistachio",
    price: "360.0 Pkr",
    image: "./Pistachio.jpg",
    category: "Cookies",
    isActive: true,
  },
  {
    id: 8,
    name: "Red Velvet Cheesecake",
    price: "370.0 Pkr",
    image: "./Red-velvet-cheesecake.jpg",
    category: "Dessert",
    isActive: false,
  },
  {
    id: 9,
    name: "Walnut Chocolate Chip",
    price: "380.0 Pkr",
    image: "./Walnut-Chocolate-chip.jpg",
    category: "Cookies",
    isActive: true,
  },
];

function Dashboard() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [productForm, setProductForm] = useState({
    name: "",
    image: "",
    price: "",
    shortDescription: "",
    longDescription: "",
    category: "",
  });


  // We'll use a ref to hold the mapping from category to color.
  const categoryColorsRef = useRef({});

  // Whenever the menuItems list changes, update our mapping for any new category.
  useEffect(() => {
    
  const presetColors = [
    "#FF5733", // red-orange
    "#33FF57", // light green
    "#3357FF", // blue
    "#FF33A1", // pink
    "#FF8F33", // orange
    "#8F33FF", // purple
    "#33FFF6", // cyan
    "#F633FF", // magenta
    "#33FF8F", // greenish
    "#FF3333", // red
  ];
    let updated = false;
    menuItems.forEach((item) => {
      const cat = item.category;
      if (cat && !categoryColorsRef.current[cat]) {
        const keysCount = Object.keys(categoryColorsRef.current).length;
        if (keysCount < presetColors.length) {
          categoryColorsRef.current[cat] = presetColors[keysCount];
        } else {
          const randomColor =
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")
              .toUpperCase();
          categoryColorsRef.current[cat] = randomColor;
        }
        updated = true;
      }
    });
  
    if (updated) {
      forceUpdate(); // Force re-render
    }
  }, [menuItems]);
  
  
  

  const handleOpenOverlay = () => {
    setProductForm({
      name: "",
      image: "",
      price: "",
      shortDescription: "",
      longDescription: "",
      category: "",
    });
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For demo purposes, adding a product just closes/clears the overlay.
  const handleAddProduct = () => {
    handleCloseOverlay();
  };

  const toggleStatus = (id) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleEdit = (item) => {
    setProductForm({
      name: item.name,
      image: item.image,
      price: item.price,
      shortDescription: "",
      longDescription: "",
      category: item.category,
    });
    setOverlayOpen(true);
  };

  const handleDelete = (id) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="product-manager-container">
        <div className="header-bar">
          <button className="add-btn" onClick={handleOpenOverlay}>
            <span className="material-symbols-outlined">add</span> Add
          </button>
        </div>

        {/* Header row for desktops/tablets */}
        <div className="table-header">
          <div className="col-image">Image</div>
          <div className="col-name">Name</div>
          <div className="col-category">Category</div>
          <div className="col-price">Price</div>
          <div className="col-status">Status</div>
          <div className="col-actions">Actions</div>
        </div>

        <div className="product-list">
          {menuItems.map((item) => (
            <div key={item.id} className="product-card">
              <div className="card-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="card-content">
                <div className="content-row name-row">
                  <span className="label">Name:</span>
                  <span className="value">{item.name}</span>
                </div>
                <div className="content-row category-row">
                  <span className="label">Category:</span>
                  <span
                  className="value category-badge"
                  style={{
                    backgroundColor:
                      categoryColorsRef.current[item.category] || "red",
                  }}
                >
                  {item.category}
                </span>
                </div>
                <div className="content-row price-row">
                  <span className="label">Price:</span>
                  <span className="value">{item.price}</span>
                </div>
                <div className="content-row status-row">
                  <span className="label">Status:</span>
                  <div className="status-container">
                    <span className="status-label">
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.isActive || false}
                        onChange={() => toggleStatus(item.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {isOverlayOpen && (
          <div className="overlay">
            <div className="overlay-content">
              <h3>Add/Edit Product</h3>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Image:
                <input
                  type="text"
                  name="image"
                  value={productForm.image}
                  onChange={handleChange}
                  placeholder="Image URL or path"
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={productForm.price}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={productForm.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                />
              </label>
              <label>
                Short Description:
                <input
                  type="text"
                  name="shortDescription"
                  value={productForm.shortDescription}
                  onChange={handleChange}
                />
              </label>
              <label>
                Long Description:
                <textarea
                  name="longDescription"
                  value={productForm.longDescription}
                  onChange={handleChange}
                />
              </label>
              <div className="overlay-buttons">
                <button onClick={handleCloseOverlay}>Cancel</button>
                <button onClick={handleAddProduct}>Add Product</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
