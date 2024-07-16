// src/mockApi/data.js
export const categories = [
    { id: 1, name: "Sell Sheets", section: "promo" },
    { id: 2, name: "Business Cards", section: "promo" },
    // ... add more categories ...
    { id: 11, name: "Billboards", section: "billboard" },
  ];
  
  export const products = [
    {
      id: 1,
      number: "P001",
      title: "Premium Business Card",
      specs: "3.5 x 2 inches, 350gsm matte",
      category: 2,
      images: ["/mock-images/business-card-1.jpg", "/mock-images/business-card-2.jpg"],
    },
    // ... add more products ...
  ];
  
  // src/mockApi/api.js
  import { categories, products } from './data';
  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const api = {
    getCategories: async () => {
      await delay(300);
      return categories;
    },
  
    getProducts: async (categoryId) => {
      await delay(500);
      return products.filter(p => p.category === parseInt(categoryId));
    },
  
    getProduct: async (productId) => {
      await delay(200);
      return products.find(p => p.id === parseInt(productId));
    },
  
    login: async (username, password) => {
      await delay(500);
      if (username === "client" && password === "password") {
        return { role: "client", token: "mock-client-token" };
      } else if (username === "employee" && password === "password") {
        return { role: "employee", token: "mock-employee-token" };
      }
      throw new Error("Invalid credentials");
    },
  
    // ... add more API methods as needed ...
  };