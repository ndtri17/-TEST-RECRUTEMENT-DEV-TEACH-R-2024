import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProductManagement from "../components/ProductManagement";

const AdminDashboard = () => {
  const [page, setPage] = useState("products");

  return (
    <div className="flex mx-6 h-screen">
      <Sidebar setPage={setPage} />

      <div className="py-8 pl-6 w-[85%]">
        {page === "products" && <ProductManagement />}
        {page === "orders" && <p>Order Management Content</p>}
        {page === "customers" && <p>Customer Management Content</p>}
        {page === "settings" && <p>Settings Content</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
