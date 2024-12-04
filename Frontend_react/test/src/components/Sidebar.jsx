import React from "react";

const Sidebar = ({ setPage }) => {
  return (
    <div className="flex flex-col py-8 w-[15%] h-screen border-r border-blue-bg-blue-500">
      <h1 className="text-3xl mb-4">Admin's Dashboard</h1>
      <div className="pr-8">
        <div className="my-4 w-full text-center" onClick={() => setPage("products")}>
          <p className="hover:bg-blue-500 hover:text-white px-4 py-2 transition-all duration-300 rounded transform hover:-translate-y-1 cursor-pointer">
            Product Management
          </p>
        </div>

        <div className="my-4 w-full text-center" onClick={() => setPage("orders")}>
          <p className="hover:bg-blue-500 hover:text-white px-4 py-2 transition-all duration-300 rounded transform hover:-translate-y-1 cursor-pointer">
            Order Management
          </p>
        </div>

        <div className="my-4 w-full text-center" onClick={() => setPage("customers")}>
          <p className="hover:bg-blue-500 hover:text-white px-4 py-2 transition-all duration-300 rounded transform hover:-translate-y-1 cursor-pointer">
            Customer Management
          </p>
        </div>

        <div className="my-4 w-full text-center" onClick={() => setPage("settings")}>
          <p className="hover:bg-blue-500 hover:text-white px-4 py-2 transition-all duration-300 rounded transform hover:-translate-y-1 cursor-pointer">
            Setting
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
