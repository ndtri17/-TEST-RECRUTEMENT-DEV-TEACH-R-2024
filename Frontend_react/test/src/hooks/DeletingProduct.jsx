import api from "../api";

export const DeletingProduct = () => {
    
    const productDeleted = async (id) => {
            const response = await api.delete(`/product_delete/${id}`);

            return response.data.message;
         } 
    
    return { productDeleted } 
};

