import axios from "./axios";

export const cartApi = {
  getCart: async (userId: string) => {
    const response = await axios.get(`/cart/${userId}`);
    return response.data;
  },

  addToCart: async (cartData: {
    userId: string;
    productId: string;
    quantity: number;
  }) => {
    const response = await axios.post("/cart", cartData);
    return response.data;
  },

  updateQuantity: async (cartId: string, quantity: number) => {
    const response = await axios.patch(`/cart/${cartId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (cartId: string) => {
    const response = await axios.delete(`/cart/${cartId}`);
    return response.data;
  },
};
