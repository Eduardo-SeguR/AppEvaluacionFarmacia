import React, { useState, useEffect } from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";

/**
 * Importaciones de NextUI v2:
 * - Table, TableHeader, TableBody, TableColumn, TableRow, TableCell
 * - Modal, ModalContent, ModalHeader, ModalBody
 * - Button, Input, etc.
 */
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

import { Eye, Pencil, Trash } from "lucide-react";

/** Interfaz para cada usuario */
interface Usuario {
  id: string;          // O number, seg�n tu DB
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;     // Para manejar "desactivado" en lugar de eliminar
}

export default function UserManagementPage() {
  /**
   * 1. Para evitar problemas de caracteres extra�os (tildes):
   *    - Aseg�rate de que este archivo est� guardado en UTF-8.
   *    - Si tu entorno soporta "React Strict Mode" con UTF-8, 
   *      deber�a verse bien "Mar�a", "Jos�", etc.
   */

  // Estado para la lista de usuarios (simulada inicialmente)
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: "1",
      nombre: "Juan P�rez",
      email: "juan@example.com",
      rol: "Inspector",
      activo: true,
    },
    {
      id: "2",
      nombre: "Mar�a Garc�a",
      email: "maria@example.com",
      rol: "Propietario",
      activo: true,
    },
    {
      id: "3",
      nombre: "Carlos Rodr�guez",
      email: "carlos@example.com",
      rol: "Inspector",
      activo: true,
    },
  ]);

  // Estado para el t�rmino de b�squeda
  const [searchTerm, setSearchTerm] = useState("");

  // Manejo de modales (ver detalle, editar, agregar)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Usuario seleccionado (para ver detalle o editar)
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  // Estado para los campos de edici�n / agregado
  const [editData, setEditData] = useState<Usuario>({
    id: "",
    nombre: "",
    email: "",
    rol: "Inspector",
    activo: true,
  });

  // 2. B�squeda de usuarios por nombre o ID.
  // COMENTARIO: En un escenario real, la b�squeda
  //            podr�a llamar a la API en cada cambio de searchTerm.
  //            Aqu� filtramos localmente. 
  const filteredUsers = usuarios.filter((user) => {
    // busco coincidencia en nombre o ID
    const lowerSearch = searchTerm.toLowerCase();
    return (
      user.nombre.toLowerCase().includes(lowerSearch) ||
      user.id.toLowerCase().includes(lowerSearch)
    );
  });

  // Columnas para la tabla
  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "email", label: "Correo Electr�nico" },
    { key: "rol", label: "Rol" },
    { key: "acciones", label: "Acciones" },
  ];

  /**
   * Funci�n para manejar la apertura del modal de detalle
   */
  const handleOpenDetail = (user: Usuario) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  /**
   * Funci�n para manejar la apertura del modal de edici�n
   */
  const handleOpenEdit = (user: Usuario) => {
    setSelectedUser(user);
    // Copiamos los datos del usuario al estado editData
    setEditData({ ...user });
    setIsEditModalOpen(true);
  };

  /**
   * Funci�n para manejar "desactivaci�n" (soft delete)
   * de un usuario
   */
  const handleDeleteUser = (user: Usuario) => {
    // COMENTARIO: En la vida real, har�as una llamada a tu API, 
    //            pas�ndole user.id para desactivarlo en DB (soft delete).
    // Por ahora, simulamos poni�ndolo inactivo en local:
    const updatedUsers = usuarios.map((u) =>
      u.id === user.id ? { ...u, activo: false } : u
    );
    setUsuarios(updatedUsers);
    alert(`Usuario "${user.nombre}" desactivado (soft delete).`);
  };

  /**
   * 3. Guardar cambios de edici�n en la tabla
   * (y en la API / base de datos)
   */
  const handleSaveEdit = () => {
    if (!editData.id) {
      alert("Falta el ID del usuario (error)...");
      return;
    }
    // Simulamos guardar en local:
    const updatedUsers = usuarios.map((u) =>
      u.id === editData.id ? { ...editData } : u
    );
    setUsuarios(updatedUsers);

    // COMENTARIO: Aqu� har�as la llamada a la API,
    //            e.g. axios.put(`/api/usuarios/${editData.id}`, editData)

    setIsEditModalOpen(false);
    alert(`Usuario "${editData.nombre}" actualizado correctamente.`);
  };

  /**
   * 4. Agregar un nuevo usuario
   */
  const [newUserData, setNewUserData] = useState<Usuario>({
    id: "",
    nombre: "",
    email: "",
    rol: "Inspector",
    activo: true,
  });

  const handleAddUser = () => {
    // Validar campos m�nimos
    if (!newUserData.id || !newUserData.nombre || !newUserData.email) {
      alert("Complete todos los campos obligatorios.");
      return;
    }

    // COMENTARIO: Aqu� har�as la llamada a la API,
    //            e.g. axios.post("/api/usuarios", newUserData)

    // Agregamos localmente
    setUsuarios([...usuarios, newUserData]);

    // Reseteamos
    setNewUserData({
      id: "",
      nombre: "",
      email: "",
      rol: "Inspector",
      activo: true,
    });
    setIsAddModalOpen(false);
    alert(`Usuario "${newUserData.nombre}" agregado correctamente.`);
  };

  /**
   * Renderiza la celda de la tabla
   */
  const renderCell = (user: Usuario, columnKey: string) => {
    switch (columnKey) {
      case "acciones":
        return (
          <div className="flex gap-2">
            {/* Bot�n del Ojo (ver detalle) */}
            <Button
              isIconOnly
              variant="light"
              aria-label="Ver detalles"
              onPress={() => handleOpenDetail(user)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            {/* Bot�n del L�piz (editar) */}
            <Button
              isIconOnly
              variant="light"
              aria-label="Editar usuario"
              onPress={() => handleOpenEdit(user)}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            {/* Bot�n de la Basura (desactivar usuario) */}
            <Button
              isIconOnly
              variant="light"
              color="danger"
              aria-label="Desactivar usuario"
              onPress={() => handleDeleteUser(user)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        // Si el usuario est� inactivo, podemos marcarlo en rojo, 
        // o mostrar un tag "Inactivo" en la UI. Como ejemplo:
        if (!user.activo && (columnKey === "nombre" || columnKey === "email")) {
          return (
            <span className="text-gray-400 line-through">
              {(user as any)[columnKey]}
            </span>
          );
        }
        return (user as any)[columnKey];
    }
  };

  return (
    <AdministradorLayout>
      <div>
        {/* T�tulo con acentos */}
        <h1 className="text-3xl font-semibold mb-6">
          Gesti�n de Usuarios
        </h1>

        {/* Buscador y Bot�n de Agregar Usuario */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Buscar usuarios..."
            className="w-1/3"
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value)}
          />
          <Button color="primary" size="lg" onPress={() => setIsAddModalOpen(true)}>
            Agregar Usuario
          </Button>
        </div>

        {/* Tabla */}
        <Table aria-label="Tabla de usuarios" css={{ height: "auto", minWidth: "100%" }}>
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                {columns.map((column) => (
                  <TableCell key={`${user.id}-${column.key}`}>
                    {renderCell(user, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DE DETALLE (Eye) */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h2>Detalle del Usuario</h2>
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <div className="space-y-2">
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
                <p><strong>Correo:</strong> {selectedUser.email}</p>
                <p><strong>Rol:</strong> {selectedUser.rol}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {selectedUser.activo ? "Activo" : "Inactivo"}
                </p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Button variant="bordered" onPress={() => setIsDetailModalOpen(false)}>
                Cerrar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* MODAL DE EDICI�N (Pencil) */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h2>Editar Usuario</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="ID (no se debe cambiar)"
                value={editData.id}
                isReadOnly
              />
              <Input
                label="Nombre"
                value={editData.nombre}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, nombre: val }))
                }
              />
              <Input
                label="Correo"
                value={editData.email}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, email: val }))
                }
              />
              <Input
                label="Rol"
                value={editData.rol}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, rol: val }))
                }
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="bordered"
                onPress={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSaveEdit}>
                Guardar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* MODAL DE AGREGAR (Bot�n "Agregar Usuario") */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h2>Agregar Usuario</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="ID (Obligatorio)"
                value={newUserData.id}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, id: val }))
                }
              />
              <Input
                label="Nombre"
                value={newUserData.nombre}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, nombre: val }))
                }
              />
              <Input
                label="Correo"
                value={newUserData.email}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, email: val }))
                }
              />
              <Input
                label="Rol"
                value={newUserData.rol}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, rol: val }))
                }
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="bordered"
                onPress={() => setIsAddModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button color="primary" onPress={handleAddUser}>
                Agregar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AdministradorLayout>
  );
}
