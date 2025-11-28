import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Datos iniciales de productos
  const initialProducts = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      category: 'laptops',
      price: 2499.99,
      image: '💻',
      description: 'Laptop de alta performance con procesador M2 Pro',
      rating: 4.8,
      stock: 15,
      author: 'Admin'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      category: 'phones',
      price: 1199.99,
      image: '📱',
      description: 'Último modelo de Apple con cámara avanzada',
      rating: 4.9,
      stock: 20,
      author: 'Admin'
    },
    {
      id: 3,
      name: 'iPad Air',
      category: 'tablets',
      price: 599.99,
      image: '📱',
      description: 'Tablet de 11 pulgadas con pantalla Retina',
      rating: 4.7,
      stock: 12,
      author: 'Admin'
    },
    {
      id: 4,
      name: 'AirPods Pro',
      category: 'accesories',
      price: 249.99,
      image: '🎧',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      rating: 4.8,
      stock: 50,
      author: 'Admin'
    },
    {
      id: 5,
      name: 'Dell XPS 13',
      category: 'laptops',
      price: 1299.99,
      image: '💻',
      description: 'Laptop ultraportátil con pantalla OLED',
      rating: 4.6,
      stock: 8,
      author: 'Admin'
    }
  ];

  // Cargar productos
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  // Crear producto (CREATE)
  const createProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      author: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).name : 'Admin'
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  // Obtener producto por ID (READ)
  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  // Obtener todos los productos (READ)
  const getAllProducts = () => {
    return products;
  };

  // Actualizar producto (UPDATE)
  const updateProduct = (id, updatedData) => {
    const updatedProducts = products.map(p =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return updatedProducts.find(p => p.id === id);
  };

  // Eliminar producto (DELETE)
  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Filtrar productos
  const filterProducts = (category, minPrice, maxPrice, searchTerm) => {
    return products.filter(product => {
      const matchCategory = !category || product.category === category;
      const matchPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchCategory && matchPrice && matchSearch;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        createProduct,
        getProductById,
        getAllProducts,
        updateProduct,
        deleteProduct,
        filterProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
