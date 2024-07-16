// src/mockApi/api.js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const categories = [
  { id: 1, name: "Sell Sheets", section: "promo" },
  { id: 2, name: "Business Cards", section: "promo" },
  { id: 3, name: "Card Hand-outs", section: "promo" },
  { id: 4, name: "Door Hangers", section: "promo" },
  { id: 5, name: "Vehicle Graphics", section: "promo" },
  { id: 6, name: "Brochures", section: "promo" },
  { id: 7, name: "Signage", section: "promo" },
  { id: 8, name: "Folders", section: "promo" },
  { id: 9, name: "T-shirts", section: "promo" },
  { id: 10, name: "Thank You Cards", section: "promo" },
  { id: 11, name: "Billboards", section: "billboard" },
];

let products = [
  { 
    id: 1, 
    number: "P001", 
    title: "Premium Business Card", 
    specs: "3.5 x 2 inches, 350gsm matte", 
    category: 2, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["new", "customizable"],
    sides: "double-sided"
  },
  { 
    id: 2, 
    number: "P002", 
    title: "Glossy Brochure", 
    specs: "8.5 x 11 inches, tri-fold", 
    category: 6, 
    images: ["https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "single-sided"
  },
  { 
    id: 3, 
    number: "P003", 
    title: "Large Format Billboard", 
    specs: "48 x 14 feet, vinyl", 
    category: 11, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["new"],
    sides: "gallery"
  },
  { 
    id: 4, 
    number: "P004", 
    title: "Company Folder", 
    specs: "9 x 12 inches, 14pt paper stock", 
    category: 8, 
    images: ["https://placehold.it/300x200"],
    tags: ["new"],
    sides: "single-sided"
  },
  { 
    id: 5, 
    number: "P005", 
    title: "Custom T-Shirt", 
    specs: "100% cotton, screen printed", 
    category: 9, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "double-sided"
  },
  { 
    id: 6, 
    number: "P006", 
    title: "Door Hanger", 
    specs: "4.25 x 11 inches, 14pt paper stock", 
    category: 4, 
    images: ["https://placehold.it/300x200"],
    tags: [],
    sides: "single-sided"
  },
  { 
    id: 7, 
    number: "P007", 
    title: "Vehicle Wrap", 
    specs: "Custom size, premium vinyl", 
    category: 5, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "gallery"
  },
  { 
    id: 8, 
    number: "P008", 
    title: "Outdoor Sign", 
    specs: "36 x 24 inches, corrugated plastic", 
    category: 7, 
    images: ["https://placehold.it/300x200"],
    tags: [],
    sides: "single-sided"
  },
  { 
    id: 9, 
    number: "P009", 
    title: "Thank You Card", 
    specs: "5 x 7 inches, folded, 120lb paper", 
    category: 10, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "double-sided"
  },
  { 
    id: 10, 
    number: "P010", 
    title: "Sell Sheet", 
    specs: "8.5 x 11 inches, full color, 100lb gloss", 
    category: 1, 
    images: ["https://placehold.it/300x200"],
    tags: ["new"],
    sides: "single-sided"
  },
  { 
    id: 11, 
    number: "P011", 
    title: "Digital Billboard", 
    specs: "14 x 48 feet, LED display", 
    category: 11, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["new", "customizable"],
    sides: "gallery"
  },
  { 
    id: 12, 
    number: "P012", 
    title: "Luxury Business Card", 
    specs: "3.5 x 2 inches, 600gsm, gold foil", 
    category: 2, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["new", "customizable"],
    sides: "double-sided"
  },
  { 
    id: 13, 
    number: "P013", 
    title: "Tri-Fold Brochure", 
    specs: "8.5 x 11 inches, 100lb gloss text", 
    category: 6, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "double-sided"
  },
  { 
    id: 14, 
    number: "P014", 
    title: "Magnetic Car Sign", 
    specs: "12 x 18 inches, 30 mil magnet", 
    category: 5, 
    images: ["https://placehold.it/300x200"],
    tags: [],
    sides: "single-sided"
  },
  { 
    id: 15, 
    number: "P015", 
    title: "Presentation Folder", 
    specs: "9 x 12 inches, 100lb gloss cover", 
    category: 8, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "double-sided"
  },
  { 
    id: 16, 
    number: "P016", 
    title: "Polo Shirt", 
    specs: "100% cotton pique, embroidered", 
    category: 9, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["new", "customizable"],
    sides: "gallery"
  },
  { 
    id: 17, 
    number: "P017", 
    title: "Sidewalk Sign", 
    specs: "24 x 36 inches, A-frame", 
    category: 7, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: [],
    sides: "double-sided"
  },
  { 
    id: 18, 
    number: "P018", 
    title: "Holiday Card", 
    specs: "5 x 7 inches, folded, 14pt paper stock", 
    category: 10, 
    images: ["https://placehold.it/300x200"],
    tags: ["new", "customizable"],
    sides: "single-sided"
  },
  { 
    id: 19, 
    number: "P019", 
    title: "Product Sell Sheet", 
    specs: "8.5 x 11 inches, full color, 100lb gloss", 
    category: 1, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "double-sided"
  },
  { 
    id: 20, 
    number: "P020", 
    title: "Highway Billboard", 
    specs: "14 x 48 feet, printed vinyl", 
    category: 11, 
    images: ["https://placehold.it/300x200"],
    tags: [],
    sides: "single-sided"
  },
  { 
    id: 21, 
    number: "P021", 
    title: "Promotional Postcard", 
    specs: "4 x 6 inches, 14pt paper stock", 
    category: 3, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["new"],
    sides: "double-sided"
  },
  { 
    id: 22, 
    number: "P022", 
    title: "Embossed Business Card", 
    specs: "3.5 x 2 inches, 400gsm, embossed", 
    category: 2, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["premium"],
    sides: "gallery"
  },
  { 
    id: 23, 
    number: "P023", 
    title: "Vinyl Banner", 
    specs: "3 x 6 feet, 13oz scrim vinyl", 
    category: 7, 
    images: ["https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "single-sided"
  },
  { 
    id: 24, 
    number: "P024", 
    title: "Booklet", 
    specs: "8.5 x 11 inches, 8 pages, saddle-stitched", 
    category: 6, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["new"],
    sides: "gallery"
  },
  { 
    id: 25, 
    number: "P025", 
    title: "Car Decal", 
    specs: "12 x 18 inches, removable vinyl", 
    category: 5, 
    images: ["https://placehold.it/300x200", "https://placehold.it/300x200"],
    tags: ["customizable"],
    sides: "double-sided"
  }
];

let userList = [];

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

  addToList: async (productId) => {
    await delay(300);
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      userList.push(product);
      return { success: true, message: "Product added to list" };
    }
    throw new Error("Product not found");
  },

  getUserList: async () => {
    await delay(500);
    return userList;
  },

  removeFromList: async (productId) => {
    await delay(300);
    userList = userList.filter(p => p.id !== parseInt(productId));
    return { success: true, message: "Product removed from list" };
  },

  clearList: async () => {
    await delay(300);
    userList = [];
    return { success: true, message: "List cleared" };
  },

  addProduct: async (productData) => {
    await delay(500);
    const newProduct = {
      id: products.length + 1,
      number: `P${String(products.length + 1).padStart(3, '0')}`,
      tags: [],
      ...productData
    };
    products.push(newProduct);
    return newProduct;
  },

  editProduct: async (productData) => {
    await delay(500);
    const index = products.findIndex(p => p.id === productData.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      return products[index];
    }
    throw new Error("Product not found");
  },
};