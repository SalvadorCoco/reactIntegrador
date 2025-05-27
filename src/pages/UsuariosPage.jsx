import { useEffect, useState } from 'react';
import FormUsuario from '../components/Usuarios/FormUsuario';
import ListaUsuarios from '../components/Usuarios/ListaUsuarios';
import axios from 'axios';

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  const fetchUsuarios = async () => {
    const res = await axios.get('http://localhost:3000/usuarios');
    setUsuarios(res.data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="p-4">
      <FormUsuario fetchUsuarios={fetchUsuarios} usuarioEdit={usuarioEdit} setUsuarioEdit={setUsuarioEdit} />
      <ListaUsuarios usuarios={usuarios} fetchUsuarios={fetchUsuarios} setUsuarioEdit={setUsuarioEdit} />
    </div>
  );
};

export default UsuariosPage;
