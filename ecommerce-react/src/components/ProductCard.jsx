import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useContexts';

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    alert(`${product.name} agregado al carrito!`);
  };

  return (
    <div className="card h-100 shadow-sm hover-shadow" style={{ cursor: 'pointer' }}>
      <div 
        className="card-body text-center" 
        style={{ fontSize: '3rem', background: '#f8f9fa', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {product.image}
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small">{product.category}</p>
        <p className="card-text">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="h5 mb-0">${product.price.toFixed(2)}</span>
          <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
        </div>
        <p className="text-muted small">Stock: {product.stock}</p>
        <div className="d-grid gap-2">
          <Link 
            to={`/producto/${product.id}`} 
            className="btn btn-info btn-sm"
          >
            Ver Detalles
          </Link>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
