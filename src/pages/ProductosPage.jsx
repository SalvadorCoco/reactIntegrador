import { useEffect, useState } from "react";
import FormProducto from "../components/Productos/FormProducto";
import ListaProductos from "../components/Productos/ListaProductos";
import axios from "axios";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="bg-dark min-vh-100 text-white d-flex justify-content-center align-items-start py-5 px-3">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold">Panel de Administración</h1>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <a href="/" className="btn btn-primary">Productos</a>
            <a href="/usuarios" className="btn btn-outline-light">Usuarios</a>
          </div>
        </div>

        <div className="card bg-secondary bg-opacity-50 text-white shadow rounded mb-4">
          <div className="card-body">
            <h4 className="card-title">Agregar Producto</h4>
            <FormProducto cargarProductos={cargarProductos} />
          </div>
        </div>

        <div className="card bg-secondary bg-opacity-50 text-white shadow rounded">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="card-title mb-0">Lista de Productos</h4>
              <button className="btn btn-dark">Exportar PDF</button>
            </div>
            <ListaProductos productos={productos} cargarProductos={cargarProductos} />
          </div>
        </div>

        <footer className="text-center mt-5 text-muted small">
          © 2025 - CRUD Fullstack con React + Node.js
        </footer>
      </div>
    </div>
  );
};

export default ProductosPage;
