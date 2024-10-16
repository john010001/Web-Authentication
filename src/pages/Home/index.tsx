import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import { registerService, deleteUserService, obtenerUsuariosService } from '../../services/authServices'; // Asegúrate de tener la función para obtener usuarios

type User = {
  correo: string;
  password: string | null; // Cambiar a null, ya que el back devuelve null
  fechaRegistro: string;
};

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [apiResponse, setApiResponse] = useState({ code: 0, message: '', data: false });

  // Funcion para obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const result = await obtenerUsuariosService();
      console.log('El resultado de la petición:', result); 
      if (result) {
        setUsers(result); // Suponiendo que result es un array de usuarios
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setApiResponse({ code: 1, message: 'Error al obtener usuarios', data: false });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!formData.correo || !formData.password) {
      setApiResponse({ code: 1, message: 'Correo y contraseña son obligatorios', data: false });
      return;
    }

    const newUser: User = {
      correo: formData.correo,
      password: null, 
      fechaRegistro: new Date().toISOString(),
    };

    try {
      const result = await registerService(formData.correo, formData.password);
      setApiResponse(result);

      if (result.data) {
        setUsers([...users, newUser]);
        setFormData({ correo: '', password: '' });
      }
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      setApiResponse({ code: 1, message: 'Error al agregar el usuario', data: false });
    }
  };

  const deleteUser = async (correo: string) => {
    try {
      const result = await deleteUserService(correo);
      setApiResponse(result);

      if (result.data) {
        setUsers(users.filter(user => user.correo !== correo));
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setApiResponse({ code: 1, message: 'Error al eliminar el usuario', data: false });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter(user =>
    user.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Usuario</h1>

      <input 
        className={styles.searchInput}
        type="text" 
        placeholder="Buscar..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      {apiResponse.message && (
        <div className={styles.apiResponse}>
          {apiResponse.message}
        </div>
      )}

      <div className={styles.form}>
        <input 
          className={styles.inputField}
          type="email" 
          placeholder="Correo" 
          name="correo" 
          value={formData.correo} 
          onChange={handleInputChange} 
        />
        <input 
          className={styles.inputField}
          type="password" 
          placeholder="Password" 
          name="password" 
          value={formData.password} 
          onChange={handleInputChange} 
        />
        <button className={styles.button} onClick={addUser}>Registrar</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Correo</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.correo}>
              <td>{user.correo}</td>
              <td>{new Date(user.fechaRegistro).toLocaleDateString()}</td>
              <td>
                <button className={styles.editButton}>Editar</button>
                <button className={styles.deleteButton} onClick={() => deleteUser(user.correo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
