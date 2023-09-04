import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import clienteAxios from '../config/clienteAxios';

const socket = io('http://localhost:8080'); // Make sure the URL matches your server

function Clientes() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ Name: '', Surname: '', Email: '', Phone: '', Status: '' });

  useEffect(() => {
    //Cargar Clientes 
    loadClients();

    //Socket IO
    socket.on('nuevoCliente', (cliente) => {
      setClients([...clients, cliente]);
    });

    return () => {
      socket.disconnect();
    };
  }, [clients]);

  const loadClients = async () => {
    try {
      const response = await clienteAxios.get('/clients'); 
      setClients(response.data);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const handleAddClient = async () => {
    if (
      newClient.Name &&
      newClient.Surname &&
      newClient.Email &&
      newClient.Phone &&
      newClient.Status
    ) {
      try {
      
        const response = await clienteAxios.post('/clients', newClient);
        const createdClient = response.data.cliente;
        socket.emit('clienteCreado', createdClient);
        setNewClient({
          Name: '',
          Surname: '',
          Email: '',
          Phone: '',
          Status: '',
        });
      } catch (error) {
        console.error('Error adding the client:', error.response.data);
      }
    } else {
      console.error('Please fill out all required fields.');
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      // Delete al server
      await clienteAxios.delete(`/clients/${id}`); 

      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
    } catch (error) {
      console.error('Error deleting the client:', error);
    }
  };

  const handleUpdateClient = async (client) => {
    if (client.Name && client.Surname && client.Email && client.Phone && client.Status) {
      try {
      // Update al server
      await clienteAxios.put(`/clients/${client._id}`, client); 
      } catch (error) {
        console.error('Error updating the client:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Agregar Cliente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newClient.Name}
            onChange={(e) => setNewClient({ ...newClient, Name: e.target.value })}
            className="border rounded py-2 px-3"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={newClient.Surname}
            onChange={(e) => setNewClient({ ...newClient, Surname: e.target.value })}
            className="border rounded py-2 px-3"
          />
          <input
            type="text"
            placeholder="Email"
            value={newClient.Email}
            onChange={(e) => setNewClient({ ...newClient, Email: e.target.value })}
            className="border rounded py-2 px-3"
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={newClient.Phone}
            onChange={(e) => setNewClient({ ...newClient, Phone: e.target.value })}
            className="border rounded py-2 px-3"
          />
          <input
            type="text"
            placeholder="Estado"
            value={newClient.Status}
            onChange={(e) => setNewClient({ ...newClient, Status: e.target.value })}
            className="border rounded py-2 px-3"
          />
        </div>
        <button onClick={handleAddClient} className="mt-2 bg-sky-500 text-white py-2 px-4 rounded">
          Agregar
        </button>
      </div>
      <div className="w-full overflow-x-auto">
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2">ID</th>
        <th className="border border-gray-300 p-2">Nombre</th>
        <th className="border border-gray-300 p-2">Apellido</th>
        <th className="border border-gray-300 p-2">Email</th>
        <th className="border border-gray-300 p-2">Teléfono</th>
        <th className="border border-gray-300 p-2">Estado</th>
        <th className="border border-gray-300 p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {clients.map((client) => (
        <tr key={client.id} className="hover:bg-gray-50">
          <td className="border border-gray-300 p-2">{client._id}</td>
          <td className="border border-gray-300 p-2">
            <input
              type="text"
              value={client.Name}
              onChange={(e) => handleUpdateClient({ ...client, Name: e.target.value })}
              className="border rounded py-1 px-2 w-full"
            />
          </td>
          <td className="border border-gray-300 p-2">
            <input
              type="text"
              value={client.Surname}
              onChange={(e) => handleUpdateClient({ ...client, Surname: e.target.value })}
              className="border rounded py-1 px-2 w-full"
            />
          </td>
          <td className="border border-gray-300 p-2">
            <input
              type="text"
              value={client.Email}
              onChange={(e) => handleUpdateClient({ ...client, Email: e.target.value })}
              className="border rounded py-1 px-2 w-full"
            />
          </td>
          <td className="border border-gray-300 p-2">
            <input
              type="text"
              value={client.Phone}
              onChange={(e) => handleUpdateClient({ ...client, Phone: e.target.value })}
              className="border rounded py-1 px-2 w-full"
            />
          </td>
          <td className="border border-gray-300 p-2">
            <input
              type="text"
              value={client.Status}
              onChange={(e) => handleUpdateClient({ ...client, Status: e.target.value })}
              className="border rounded py-1 px-2 w-full"
            />
          </td>
          <td className="border border-gray-300 p-2">
            <button onClick={() => handleDeleteClient(client._id)} className="bg-red-500 text-white py-1 px-2 rounded">
              Eliminar
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

export default Clientes;
