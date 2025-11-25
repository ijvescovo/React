import React from 'react';
import { useCart } from '../hooks/useContexts';
import { Link } from 'react-router-dom';

export function Carrito() {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    alert(`Compra realizada!\nTotal: $${total.toFixed(2)}`);
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p className="text-muted mb-4">Agrega productos para comenzar</p>
        <Link to="/productos" className="btn btn-primary">
          Ir a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Tu Carrito</h1>

      <div className="row">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="align-middle">
                    <td>
                      <div className="d-flex align-items-center">
                        <span style={{ fontSize: '2rem', marginRight: '10px' }}>
                          {item.image}
                        </span>
                        <div>
                          <strong>{item.name}</strong><br />
                          <small className="text-muted">{item.category}</small>
                        </div>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="input-group" style={{ maxWidth: '100px' }}>
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <input 
                          type="number" 
                          className="form-control form-control-sm text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            className="btn btn-warning me-2"
            onClick={clearCart}
          >
            Vaciar Carrito
          </button>
          <Link to="/productos" className="btn btn-secondary">
            Seguir Comprando
          </Link>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Resumen del Pedido</h5>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span className="text-success">Gratis</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong className="h5 mb-0">${total.toFixed(2)}</strong>
                </div>
              </div>

              <button 
                className="btn btn-primary w-100 mb-2"
                onClick={handleCheckout}
              >
                Ir a Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
