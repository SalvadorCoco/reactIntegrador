import { useState } from "react";
import ProductosPage from "./pages/ProductosPage";
import UsuariosPage from "./pages/UsuariosPage";

function App() {
  const [vista, setVista] = useState("productos");

  return (
    <div className="bg-black text-white min-vh-100 py-5 px-3">
      <div className="w-100" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-3">Panel de Administración</h1>
          <div className="btn-group">
            <button
              className={`btn ${vista === "productos" ? "btn-light text-dark" : "btn-outline-light"} me-2`}
              onClick={() => setVista("productos")}
            >
              🛒 Productos
            </button>
            <button
              className={`btn ${vista === "usuarios" ? "btn-light text-dark" : "btn-outline-light"}`}
              onClick={() => setVista("usuarios")}
            >
              👤 Usuarios
            </button>
          </div>
        </header>

        <main className="bg-dark rounded shadow p-4">
          {vista === "productos" ? <ProductosPage /> : <UsuariosPage />}
        </main>

        <footer className="text-center mt-5 text-secondary small">
          <hr className="border-light" />
          © 2025 - CRUD Fullstack con React + Node.js
        </footer>
      </div>
    </div>
  );
}

export default App;
