import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useContexts';
import { useCart } from '../hooks/useContexts';

export function ProductoDetalle() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h2>Producto no encontrado</h2>
        <button className="btn btn-primary" onClick={() => navigate('/productos')}>
          Volver a Productos
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`${quantity} ${product.name} agregado(s) al carrito!`);
    navigate('/carrito');
  };

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/productos')}>
        ← Volver a Productos
      </button>

      <div className="row">
        <div className="col-md-5">
          <div 
            style={{ 
              fontSize: '10rem',
              textAlign: 'center',
              background: '#f8f9fa',
              padding: '2rem',
              borderRadius: '8px'
            }}
          >
            {product.image}
          </div>
        </div>

        <div className="col-md-7">
          <h1 className="mb-3">{product.name}</h1>
          
          <div className="mb-3">
            <span className="badge bg-info me-2">{product.category}</span>
            <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
          </div>

          <p className="text-muted mb-3">{product.description}</p>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title mb-0">${product.price.toFixed(2)}</h3>
            </div>
          </div>

          <div className="mb-4">
            <p><strong>Stock disponible:</strong> {product.stock} unidades</p>
            <p><strong>Creado por:</strong> {product.author || 'Admin'}</p>
          </div>

          {product.stock > 0 ? (
            <div>
              <div className="input-group mb-3" style={{ maxWidth: '200px' }}>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <input 
                  type="number" 
                  className="form-control text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                />
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>

              <button 
                className="btn btn-primary btn-lg w-100"
                onClick={handleAddToCart}
              >
                Agregar al Carrito
              </button>
            </div>
          ) : (
            <div className="alert alert-danger">
              Producto sin stock disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
