import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useContexts';
import { ProductCard } from '../components/ProductCard';

export function Productos() {
  const { getAllProducts } = useProducts();
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 3000]);

  const products = getAllProducts();
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = !category || product.category === category;
      const matchSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchCategory && matchSearch && matchPrice;
    });
  }, [products, category, searchTerm, priceRange]);

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="container my-5">
      <h1 className="mb-5">Nuestros Productos</h1>

      <div className="row mb-5">
        <div className="col-md-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Precio máximo: ${priceRange[1]}</label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          />
        </div>
        <div className="col-md-3 mb-3">
          <button 
            className="btn btn-secondary w-100"
            onClick={() => {
              setCategory('');
              setSearchTerm('');
              setPriceRange([0, 3000]);
            }}
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-info text-center">
          No se encontraron productos con los criterios de búsqueda
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
