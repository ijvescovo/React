import React, { useState } from 'react';
import { useProducts } from '../hooks/useContexts';

export function Admin() {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'laptops',
    price: '',
    description: '',
    stock: '',
    rating: ''
  });

  const categories = ['laptops', 'phones', 'tablets', 'accesories'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating),
      image: '💻' // Por defecto
    };

    if (editingId) {
      updateProduct(editingId, productData);
      setEditingId(null);
    } else {
      createProduct(productData);
    }

    setFormData({
      name: '',
      category: 'laptops',
      price: '',
      description: '',
      stock: '',
      rating: ''
    });
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock,
      rating: product.rating
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      category: 'laptops',
      price: '',
      description: '',
      stock: '',
      rating: ''
    });
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Panel de Administración</h1>

      <div className="mb-4">
        {!showForm ? (
          <button 
            className="btn btn-success"
            onClick={() => setShowForm(true)}
          >
            ➕ Crear Nuevo Producto
          </button>
        ) : null}
      </div>

      {showForm && (
        <div className="card mb-4 shadow">
          <div className="card-body">
            <h5 className="card-title">
              {editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h5>
            
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    className="form-control"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>⭐ {product.rating}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(product)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (confirm(`¿Eliminar ${product.name}?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
