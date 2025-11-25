import React from 'react';

export function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Contacto</h5>
            <p>
              Email: info@techstore.com<br />
              Teléfono: +1 (555) 123-4567
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Enlaces Útiles</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Política de Privacidad</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Términos de Servicio</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Devoluciones</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Síguenos</h5>
            <div>
              <a href="#" className="text-muted me-3">Facebook</a>
              <a href="#" className="text-muted me-3">Twitter</a>
              <a href="#" className="text-muted">Instagram</a>
            </div>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="text-center text-muted">
          <p>&copy; 2024 TechStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
