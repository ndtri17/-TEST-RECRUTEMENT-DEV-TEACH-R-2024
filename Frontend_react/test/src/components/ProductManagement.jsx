import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { AddingProduct } from "../hooks/AddingProduct";
import { AddingCategory } from "../hooks/AddingCategory";
import { FetchListProduct } from "../hooks/FetchListProduct";
import { FetchingListCategory } from "../hooks/FetchingListCategory";
import { DeletingProduct } from "../hooks/DeletingProduct";
import api from "../api";

const ProductManagement = () => {
  const [isOpenAddProduct, setIsOpenAddProduct] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [addingNotification, setAddingNotification] = useState("");
  
  const [isOpenAddCategory, setIsOpenAddCategory] = React.useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [isOpenModifyProduct, setIsOpenModifyProduct] = React.useState(false);

  const products = FetchListProduct();
  
  const categories = FetchingListCategory();

  const toggleAddProduct = () => {
    setIsOpenAddProduct(!isOpenAddProduct);
  };

  const { productAdded } = AddingProduct();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await productAdded(name, description, price, category);
      setAddingNotification(response);
      window.location.reload();

    } catch (error) {
      setAddingNotification("Error adding product");
    }
  };

  const { categoryAdded } = AddingCategory();

  const toggleAddCategory = () => {
    setIsOpenAddCategory(!isOpenAddCategory);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await categoryAdded(categoryName);
      setAddingNotification(response);
      window.location.reload();

    } catch (error) {
      setAddingNotification("Error adding category");
    }
  };

  const { productDeleted } = DeletingProduct();

  const handleDeleteProduct = async (id) => {
    try { 
      const response = await productDeleted(id);
      alert(response);
      
      window.location.reload();
      
    } catch (error) {
      alert("Error deleting product");
    }
  }

  const toggleModifyProduct = () => {
    setIsOpenModifyProduct(!isOpenModifyProduct);
  };

  const handleModifyProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/product_update/${id}`,   {
        name,
        description,
        price,
        category
      });

      alert(response.data.message);
      window.location.reload();

    } catch (error) {
      alert("Error updating product");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl mb-4">Products</h1>

        <div className="flex gap-4">
          <div className="mb-6">
            <button
              className="px-6 py-2 hover:text-white  hover:bg-blue-500 transition-all duration-300 rounded transform hover:-translate-y-1 cursor-pointer"
              onClick={toggleAddCategory}
            >
              Add Category
            </button>
          </div>

          <div className="mb-6">
            <button
              className="px-6 py-2 hover:text-white  hover:bg-blue-500 transition-all duration-300 rounded transform hover:-translate-y-1 cursor-pointer"
              onClick={toggleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      {isOpenAddCategory && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Category</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  onClick={handleAddCategory}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-4 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
                  onClick={toggleAddCategory}
                >
                  Cancel
                </button>
              </div>
            </form>

            {addingNotification && (
              <div
                className={`mt-4 p-2 ${
                  addingNotification.includes("successfully")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } rounded-lg`}
              >
                {addingNotification}
              </div>
            )}
          </div>
        </div>
      )}

      {isOpenAddProduct && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value=""> Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  onClick={handleAddProduct}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-4 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
                  onClick={toggleAddProduct}
                >
                  Cancel
                </button>
              </div>
            </form>

            {addingNotification && (
              <div
                className={`mt-4 p-2 ${
                  addingNotification.includes("successfully")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } rounded-lg`}
              >
                {addingNotification}
              </div>
            )}
          </div>
        </div>
      )}

      {isOpenModifyProduct && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Modify Product</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  onClick={handleModifyProduct}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-4 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
                  onClick={toggleModifyProduct} 
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className=" w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">ID</th>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Price</th>
            <th className="px-4 py-2 border-b text-left">Category</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border-b">{product.id}</td>
              <td className="px-4 py-2 border-b">{product.name}</td>
              <td className="px-4 py-2 border-b">{product.price}$</td>
              <td className="px-4 py-2 border-b">{product.category}</td>
              <td className="px-4 py-2 border-b">
                <button className="text-blue-500 hover:text-blue-700 mx-2" onClick={toggleModifyProduct}>
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700 mx-2" onClick={() => handleDeleteProduct(product.id)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
