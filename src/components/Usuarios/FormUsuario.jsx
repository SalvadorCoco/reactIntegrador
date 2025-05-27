import { useEffect, useState } from 'react';
import axios from 'axios';

const FormUsuario = ({ fetchUsuarios, usuarioEdit, setUsuarioEdit }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');

  useEffect(() => {
    if (usuarioEdit) {
      setNombre(usuarioEdit.nombre);
      setEmail(usuarioEdit.email);
      setEdad(usuarioEdit.edad);
    }
  }, [usuarioEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoUsuario = { nombre, email, edad };

    if (usuarioEdit) {
      await axios.put(`http://localhost:3000/usuarios/${usuarioEdit.id}`, nuevoUsuario);
      setUsuarioEdit(null);
    } else {
      await axios.post('http://localhost:3000/usuarios', nuevoUsuario);
    }

    setNombre('');
    setEmail('');
    setEdad('');
    fetchUsuarios();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">{usuarioEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        type="number"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        {usuarioEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default FormUsuario;
