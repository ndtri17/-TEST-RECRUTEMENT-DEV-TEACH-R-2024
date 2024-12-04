import api from "../api";

export const AddingCategory = () => {
    
    const categoryAdded = async (name) => {
            const response = await api.post("/category_add", {
                name
            });

            return response.data.message;
         } 
    
    return { categoryAdded }
};


