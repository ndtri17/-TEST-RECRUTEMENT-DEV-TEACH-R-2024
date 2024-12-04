import React , { useEffect, useState} from "react";
import api from "../api";

export const FetchListProduct = () => {
  const [products, setProducts] = useState([]);   

  const getProducts = async () => { 
    
    const response = await api.get("/products");
    setProducts(response.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return products;
};
