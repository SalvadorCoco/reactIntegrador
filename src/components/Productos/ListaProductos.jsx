import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ListaProductos = ({ productos, fetchProductos, setProductoEdit }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/productos/${id}`);
    fetchProductos();
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Nombre', 'Precio']],
      body: productos.map(p => [p.nombre, `$${p.precio}`]),
    });
    doc.save('productos.pdf');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
      <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded" onClick={exportarPDF}>Exportar PDF</button>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2">${p.precio}</td>
              <td className="border p-2">
                <button onClick={() => setProductoEdit(p)} className="mr-2 bg-yellow-400 px-2 py-1 rounded">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
