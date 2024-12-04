import api from "../api";

export const AddingProduct = () => {
    
    const productAdded = async (name, description, price, category) => {
            const response = await api.post("/product_add", {
                name,
                description,
                price,
                category
            });
            
            return response.data.message;
         } 
    
    return { productAdded }
};

