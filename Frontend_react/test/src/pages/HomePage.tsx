import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaChevronDown } from "react-icons/fa";
import { FetchListProduct } from "../hooks/FetchListProduct";

const HomePage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sortOption, setSortOption] = React.useState("priceLowToHigh");
  const products = FetchListProduct();

  const sortedProducts = React.useMemo(() => {
    switch (sortOption) {
      case "priceLowToHigh":
        return [...products].sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return [...products].sort((a, b) => b.price - a.price);
      case "nameAToZ":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "nameZToA":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }, [products, sortOption]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortSelection = (option) => {
    setSortOption(option);
    setIsOpen(false); 
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-between mx-24 my-6 items-center">
        <h1 className="text-3xl">Products</h1>
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            onClick={toggleDropdown}
          >
            <span>Sort by</span>
            <FaChevronDown className="text-sm" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg z-10">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortSelection("priceLowToHigh")}
                >
                  Price: Low to High
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortSelection("priceHighToLow")}
                >
                  Price: High to Low
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortSelection("nameAToZ")}
                >
                  Name: A to Z
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSortSelection("nameZToA")}
                >
                  Name: Z to A
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 mx-24 my-12">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-500">{product.price}$</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white transition-all duration-300 rounded transform hover:-translate-y-1 cursor-pointer">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
