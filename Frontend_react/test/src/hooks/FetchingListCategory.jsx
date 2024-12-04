import React , { useEffect, useState} from "react";
import api from "../api";

export const FetchingListCategory = () => {
  const [ category, setCategory] = useState([]);   

  const getCategory = async () => { 
    
    const response = await api.get("/category");
    setCategory(response.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return category;
};
