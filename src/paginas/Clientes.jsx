import  { useState } from "react";

function Clientes() {
  const [clients, setClients] = useState([
    { id: "", name: "", email: "", phone: "", status: "" },

  ]);

  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", status: "" });
  const [editClient, setEditClient] = useState(null);



  //Funciones que simulan agregar al cliente
  const handleAddClient = () => {
    if (newClient.name && newClient.email && newClient.phone && newClient.status) {
      setClients([
        ...clients,
        {
          id: Date.now(),
          name: newClient.name,
          email: newClient.email,
          phone: newClient.phone,
          status: newClient.status,
        },
      ]);
      setNewClient({ name: "", email: "", phone: "", status: "" });
    }
  };

  const handleDeleteClient = (id) => {
    const updatedClients = clients.filter((client) => client.id !== id);
    setClients(updatedClients);
  };

  const handleEditClient = (id) => {
    const clientToEdit = clients.find((client) => client.id === id);
    setEditClient(clientToEdit);
  };

  const handleUpdateClient = () => {
    if (editClient && editClient.name && editClient.email && editClient.phone && editClient.status) {
      const updatedClients = clients.map((client) =>
        client.id === editClient.id ? editClient : client
      );
      setClients(updatedClients);
      setEditClient(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <table className="w-full border-collapse ">
        <thead>
          <tr className="bg-sky-500 text-white ">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border p-2">{client.id}</td>
              <td className="border p-2">
                {editClient && editClient.id === client.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={editClient.name}
                    onChange={(e) =>
                      setEditClient({
                        ...editClient,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  client.name
                )}
              </td>
              <td className="border p-2">
                {editClient && editClient.id === client.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={editClient.email}
                    onChange={(e) =>
                      setEditClient({
                        ...editClient,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  client.email
                )}
              </td>
              <td className="border p-2">
                {editClient && editClient.id === client.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={editClient.phone}
                    onChange={(e) =>
                      setEditClient({
                        ...editClient,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  client.phone
                )}
              </td>
              <td className="border p-2">
                {editClient && editClient.id === client.id ? (
                  <input
                    type="text"
                    className="w-full"
                    value={editClient.status}
                    onChange={(e) =>
                      setEditClient({
                        ...editClient,
                        status: e.target.value,
                      })
                    }
                  />
                ) : (
                  client.status
                )}
              </td>
              <td className="border p-2">
                {editClient && editClient.id === client.id ? (
                  <>
                    <button className="bg-blue-500 rounded-md text-white px-2 py-1 mr-2" onClick={handleUpdateClient}>Guardar</button>
                    <button className="bg-gray-500 rounded-md text-white px-2 py-1" onClick={() => setEditClient(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="bg-green-500 rounded-md text-white px-2 py-1 mr-2" onClick={() => handleEditClient(client.id)}>Editar</button>
                    <button className="bg-red-500 rounded-md text-white px-2 py-1" onClick={() => handleDeleteClient(client.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Agregar Cliente</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Nombre"
            className="w-1/4 p-2 mr-2"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-1/4 p-2 mr-2"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="w-1/4 p-2 mr-2"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Estado"
            className="w-1/4 p-2 mr-2"
            value={newClient.status}
            onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
          />
          <button className="bg-sky-500 rounded-md text-white px-2 py-1" onClick={handleAddClient}>Agregar</button>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
``
