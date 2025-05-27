import { useState } from 'react';
import axios from 'axios';

const FormProducto = ({ fetchProductos, productoEdit, setProductoEdit }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  useState(() => {
    if (productoEdit) {
      setNombre(productoEdit.nombre);
      setPrecio(productoEdit.precio);
    }
  }, [productoEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoProducto = { nombre, precio: parseFloat(precio) };
  
    if (productoEdit) {
      await axios.put(`http://localhost:3000/productos/${productoEdit.id}`, nuevoProducto);
      setProductoEdit(null);
    } else {
      await axios.post('http://localhost:3000/productos', nuevoProducto);
    }
  
    setNombre('');
    setPrecio('');
    fetchProductos();
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">{productoEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Precio"
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        {productoEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default FormProducto;
