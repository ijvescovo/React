import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5" style={{ minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-4">Bienvenido a TechStore</h1>
              <p className="lead mb-4">
                Descubre los mejores productos tecnológicos a los mejores precios
              </p>
              <Link to="/productos" className="btn btn-light btn-lg">
                Comprar Ahora
              </Link>
            </div>
            <div className="col-md-4 text-center" style={{ fontSize: '5rem' }}>
              💻📱⌚
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">¿Por Qué Elegirnos?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h3 style={{ fontSize: '2.5rem' }}>🚚</h3>
                  <h5 className="card-title">Envío Rápido</h5>
                  <p className="card-text">Entrega en 24-48 horas a todo el país</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h3 style={{ fontSize: '2.5rem' }}>✅</h3>
                  <h5 className="card-title">Garantía</h5>
                  <p className="card-text">Todos nuestros productos tienen garantía oficial</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h3 style={{ fontSize: '2.5rem' }}>💳</h3>
                  <h5 className="card-title">Pagos Seguros</h5>
                  <p className="card-text">Múltiples opciones de pago y 100% seguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">¿Listo para Empezar?</h2>
          <p className="lead mb-4">Explora nuestro catálogo completo de productos</p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            Ver Productos
          </Link>
        </div>
      </section>
    </div>
  );
}
