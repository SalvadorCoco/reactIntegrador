import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ListaUsuarios = ({ usuarios, fetchUsuarios, setUsuarioEdit }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/usuarios/${id}`);
    fetchUsuarios();
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Nombre', 'Email', 'Edad']],
      body: usuarios.map(u => [u.nombre, u.email, u.edad]),
    });
    doc.save('usuarios.pdf');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded" onClick={exportarPDF}>Exportar PDF</button>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Edad</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.nombre}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.edad}</td>
              <td className="border p-2">
                <button onClick={() => setUsuarioEdit(u)} className="mr-2 bg-yellow-400 px-2 py-1 rounded">Editar</button>
                <button onClick={() => handleDelete(u.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;
