import React, { useState } from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";

// NextUI v2 (aseg�rate de tener las versiones correctas)
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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Eye, Pencil, Trash } from "lucide-react";

/** Interfaz (tipo) para cada Farmacia */
interface Farmacia {
  key: string;             // Se usar� como ID
  name: string;            // Nombre Actual
  location: string;        // Direcci�n
  owner: string;           // Propietario
  lastInspection: string;  // �ltima Inspecci�n
  type: string;            // Tipo (Retail, Hospitalaria, etc.)
  status: string;          // Estado (Aprobada, Pendiente, etc.)
  active: boolean;         // Para manejar soft-delete

  /** Campos extendidos para Detalle (ejemplo de "Apertura") */
  // Datos del Propietario
  ownerName: string;        // Nombre o Raz�n Social
  ownerDocument: string;    // RNC/C�dula
  ownerAddress: string;     // Direcci�n
  ownerPhone: string;       // Tel�fono
  ownerEmail: string;       // Correo
  ownerMobile: string;      // M�vil

  // Datos del Director T�cnico
  directorName: string;
  directorLastName: string;
  directorDocument: string;
  directorProfession: string;
  directorExequatur: string;
  directorIssueDate: string;

  // Datos del Establecimiento
  pharmacyType: string;      // Tipo de Establecimiento
  activityType: string;      // Tipo de Actividad
  pharmacyAddress: string;   // Direcci�n Completa
  pharmacyProvince: string;  // Provincia
  pharmacyMunicipality: string; // Municipio
}

const PharmaciesManagementPage: React.FC = () => {
  // Estado de b�squeda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado principal: listado de farmacias
  const [farmacias, setFarmacias] = useState<Farmacia[]>([
    {
      key: "1",
      name: "Farmacia Central",
      location: "Calle Principal 123",
      owner: "Juan P�rez",
      lastInspection: "2023-05-01",
      type: "Retail",
      status: "Aprobada",
      active: true,
      // Datos del Propietario (simulados)
      ownerName: "Juan P�rez",
      ownerDocument: "123456789",
      ownerAddress: "Calle Principal 123",
      ownerPhone: "809-555-1234",
      ownerEmail: "juan@example.com",
      ownerMobile: "809-555-5678",
      // Director T�cnico
      directorName: "Pedro",
      directorLastName: "L�pez",
      directorDocument: "987654321",
      directorProfession: "Farmac�utico",
      directorExequatur: "34567",
      directorIssueDate: "2022-01-01",
      // Establecimiento
      pharmacyType: "Farmacia Retail",
      activityType: "Venta de Medicamentos",
      pharmacyAddress: "Calle Principal 123, Sector Centro",
      pharmacyProvince: "Provincia 1",
      pharmacyMunicipality: "Municipio 1",
    },
    {
      key: "2",
      name: "Farmacia Hospital General",
      location: "Av. Salud 456",
      owner: "Mar�a Garc�a",
      lastInspection: "2023-04-15",
      type: "Hospitalaria",
      status: "Pendiente",
      active: true,
      // Propietario
      ownerName: "Mar�a Garc�a",
      ownerDocument: "789456123",
      ownerAddress: "Av. Salud 456",
      ownerPhone: "809-555-2222",
      ownerEmail: "maria@example.com",
      ownerMobile: "809-555-3333",
      // Director T�cnico
      directorName: "Ana",
      directorLastName: "Torres",
      directorDocument: "222333444",
      directorProfession: "Farmac�utica",
      directorExequatur: "45678",
      directorIssueDate: "2023-02-10",
      // Establecimiento
      pharmacyType: "Farmacia Hospitalaria",
      activityType: "Venta y Suministro",
      pharmacyAddress: "Av. Salud 456, Sector Hospital",
      pharmacyProvince: "Provincia 1",
      pharmacyMunicipality: "Municipio 2",
    },
    {
      key: "3",
      name: "Farmacia Norte",
      location: "Calle Norte 789",
      owner: "Pedro S�nchez",
      lastInspection: "2023-03-20",
      type: "Retail",
      status: "En Inspecci�n",
      active: true,
      // Propietario
      ownerName: "Pedro S�nchez",
      ownerDocument: "147258369",
      ownerAddress: "Calle Norte 789",
      ownerPhone: "809-444-1111",
      ownerEmail: "pedro@example.com",
      ownerMobile: "809-444-2222",
      // Director T�cnico
      directorName: "Laura",
      directorLastName: "G�mez",
      directorDocument: "111222333",
      directorProfession: "Farmac�utica",
      directorExequatur: "56789",
      directorIssueDate: "2021-12-01",
      // Establecimiento
      pharmacyType: "Farmacia Retail",
      activityType: "Venta de Medicamentos",
      pharmacyAddress: "Calle Norte 789, Sector Norte",
      pharmacyProvince: "Provincia 2",
      pharmacyMunicipality: "Municipio 2",
    },
    {
      key: "4",
      name: "Farmacia Sur",
      location: "Calle Sur 101",
      owner: "Ana L�pez",
      lastInspection: "2023-02-10",
      type: "Retail",
      status: "Rechazada",
      active: true,
      // Propietario
      ownerName: "Ana L�pez",
      ownerDocument: "753951456",
      ownerAddress: "Calle Sur 101",
      ownerPhone: "809-555-8888",
      ownerEmail: "ana@example.com",
      ownerMobile: "809-555-9999",
      // Director T�cnico
      directorName: "Carlos",
      directorLastName: "Mart�nez",
      directorDocument: "999888777",
      directorProfession: "Farmac�utico",
      directorExequatur: "67890",
      directorIssueDate: "2020-07-15",
      // Establecimiento
      pharmacyType: "Farmacia Retail",
      activityType: "Venta de Medicamentos",
      pharmacyAddress: "Calle Sur 101, Sector Sur",
      pharmacyProvince: "Provincia 3",
      pharmacyMunicipality: "Municipio 3",
    },
  ]);

  // Filtrado por nombre o ID (aqu� "key")
  // COMENTARIO: En la vida real, se har�a una llamada a la API
  //            (por ejemplo: fetch o axios.get("/api/farmacias?search=..."))
  //            en cada cambio de searchTerm.
  const filteredPharmacies = farmacias.filter((farmacia) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      farmacia.name.toLowerCase().includes(lowerSearch) ||
      farmacia.key.toLowerCase().includes(lowerSearch)
    );
  });

  // Columnas para la tabla
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "location", label: "Ubicaci�n" },
    { key: "owner", label: "Propietario" },
    { key: "lastInspection", label: "�ltima Inspecci�n" },
    { key: "type", label: "Tipo" },
    { key: "status", label: "Estado" },
    { key: "actions", label: "Acciones" },
  ];

  // Estados para modales
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Farmacia seleccionada (para ver detalle o editar)
  const [selectedPharmacy, setSelectedPharmacy] = useState<Farmacia | null>(
    null
  );

  // Estado para manejar la edici�n
  const [editData, setEditData] = useState<Farmacia | null>(null);

  // Estado para manejar la adici�n (nueva farmacia)
  const [newPharmacyData, setNewPharmacyData] = useState<Farmacia>({
    key: "",
    name: "",
    location: "",
    owner: "",
    lastInspection: "",
    type: "",
    status: "Pendiente", // Por default
    active: true,

    // Datos del Propietario
    ownerName: "",
    ownerDocument: "",
    ownerAddress: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerMobile: "",
    // Director T�cnico
    directorName: "",
    directorLastName: "",
    directorDocument: "",
    directorProfession: "",
    directorExequatur: "",
    directorIssueDate: "",
    // Establecimiento
    pharmacyType: "",
    activityType: "",
    pharmacyAddress: "",
    pharmacyProvince: "",
    pharmacyMunicipality: "",
  });

  /** 
   * Bot�n Ojo: Ver Detalle 
   * Muestra en un modal toda la info (propietario, director, establecimiento).
   */
  const handleOpenDetail = (farmacia: Farmacia) => {
    setSelectedPharmacy(farmacia);
    setIsDetailModalOpen(true);
  };

  /**
   * Bot�n L�piz: Editar
   * Copia la info al estado editData y abre modal.
   */
  const handleOpenEdit = (farmacia: Farmacia) => {
    setSelectedPharmacy(farmacia);
    setEditData({ ...farmacia });
    setIsEditModalOpen(true);
  };

  /**
   * Bot�n Basura: Desactivar (soft delete)
   */
  const handleDeletePharmacy = (farmacia: Farmacia) => {
    // COMENTARIO: Aqu� llamar�as a tu API para "desactivar" la farmacia en la base de datos
    // e.g. axios.put(`/api/farmacias/${farmacia.key}/desactivar`)

    // Actualizamos en local
    const updated = farmacias.map((f) =>
      f.key === farmacia.key ? { ...f, active: false } : f
    );
    setFarmacias(updated);
    alert(`Farmacia "${farmacia.name}" desactivada (soft delete).`);
  };

  /**
   * Guardar cambios de edici�n (modal de Edici�n)
   */
  const handleSaveEdit = () => {
    if (!editData) return;
    // COMENTARIO: Aqu� ir�a la llamada a la API 
    // e.g. axios.put(`/api/farmacias/${editData.key}`, editData)

    const updated = farmacias.map((f) =>
      f.key === editData.key ? { ...editData } : f
    );
    setFarmacias(updated);
    setIsEditModalOpen(false);
    alert(`Cambios guardados en la Farmacia "${editData.name}".`);
  };

  /**
   * Agregar nueva farmacia
   */
  const handleAddPharmacy = () => {
    if (!newPharmacyData.key || !newPharmacyData.name) {
      alert("Complete al menos el ID y el Nombre de la farmacia.");
      return;
    }

    // COMENTARIO: Aqu� llamada a la API
    // e.g. axios.post("/api/farmacias", newPharmacyData)

    setFarmacias([...farmacias, newPharmacyData]);
    setIsAddModalOpen(false);

    // Reseteamos newPharmacyData
    setNewPharmacyData({
      key: "",
      name: "",
      location: "",
      owner: "",
      lastInspection: "",
      type: "",
      status: "Pendiente",
      active: true,
      // Propietario
      ownerName: "",
      ownerDocument: "",
      ownerAddress: "",
      ownerPhone: "",
      ownerEmail: "",
      ownerMobile: "",
      // Director
      directorName: "",
      directorLastName: "",
      directorDocument: "",
      directorProfession: "",
      directorExequatur: "",
      directorIssueDate: "",
      // Establecimiento
      pharmacyType: "",
      activityType: "",
      pharmacyAddress: "",
      pharmacyProvince: "",
      pharmacyMunicipality: "",
    });
    alert(`Nueva Farmacia "${newPharmacyData.name}" agregada.`);
  };

  /**
   * Renderiza celdas personalizadas
   */
  const renderCell = (farmacia: Farmacia, columnKey: string) => {
    const cellValue = (farmacia as any)[columnKey];

    switch (columnKey) {
      case "status":
        // Mostramos con colores
        return (
          <span
            className={`capitalize text-xs font-semibold ${
              cellValue === "Aprobada"
                ? "text-green-500"
                : cellValue === "Pendiente"
                ? "text-yellow-500"
                : cellValue === "En Inspecci�n"
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {cellValue}
          </span>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            {/* OJO (Detalle) */}
            <Button
              isIconOnly
              variant="light"
              aria-label="Ver detalles"
              onPress={() => handleOpenDetail(farmacia)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            {/* L�PIZ (Editar) */}
            <Button
              isIconOnly
              variant="light"
              aria-label="Editar farmacia"
              onPress={() => handleOpenEdit(farmacia)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            {/* BASURA (Desactivar) */}
            <Button
              isIconOnly
              variant="light"
              color="danger"
              aria-label="Desactivar farmacia"
              onPress={() => handleDeletePharmacy(farmacia)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        // Si est� inactiva, lo mostramos con estilo "inactivo"
        if (!farmacia.active && (columnKey === "name" || columnKey === "owner")) {
          return (
            <span className="text-gray-400 line-through">
              {cellValue}
            </span>
          );
        }
        return cellValue;
    }
  };

  return (
    <AdministradorLayout>
      <div>
        <h1 className="text-3xl font-semibold mb-6">Gesti�n de Farmacias</h1>

        {/* Buscador */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Buscar farmacias..."
            className="w-1/3"
            value={searchTerm}
            onValueChange={(val) => setSearchTerm(val)}
          />
          <Button color="primary" size="lg" onPress={() => setIsAddModalOpen(true)}>
            Agregar Farmacia
          </Button>
        </div>

        {/* Tabla */}
        <Table
          aria-label="Tabla de farmacias"
          css={{ height: "auto", minWidth: "100%" }}
        >
          <TableHeader>
            {columns.map((col) => (
              <TableColumn key={col.key}>{col.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredPharmacies.map((farmacia) => (
              <TableRow key={farmacia.key}>
                {columns.map((col) => (
                  <TableCell key={`${farmacia.key}-${col.key}`}>
                    {renderCell(farmacia, col.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DE DETALLE (Ojo) */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h2>Detalles de la Farmacia</h2>
          </ModalHeader>
          <ModalBody>
            {selectedPharmacy && (
              <div className="space-y-4">
                {/* Datos del Propietario */}
                <div className="border-b pb-2">
                  <h3 className="font-semibold">Datos del Propietario</h3>
                  <p><strong>Nombre/Raz�n Social:</strong> {selectedPharmacy.ownerName}</p>
                  <p><strong>RNC/C�dula:</strong> {selectedPharmacy.ownerDocument}</p>
                  <p><strong>Direcci�n:</strong> {selectedPharmacy.ownerAddress}</p>
                  <p><strong>Tel�fono:</strong> {selectedPharmacy.ownerPhone}</p>
                  <p><strong>Correo:</strong> {selectedPharmacy.ownerEmail}</p>
                  <p><strong>Tel. M�vil:</strong> {selectedPharmacy.ownerMobile}</p>
                </div>

                {/* Datos del Director T�cnico */}
                <div className="border-b pb-2">
                  <h3 className="font-semibold">Datos del Director T�cnico</h3>
                  <p><strong>Nombre:</strong> {selectedPharmacy.directorName}</p>
                  <p><strong>Apellidos:</strong> {selectedPharmacy.directorLastName}</p>
                  <p><strong>No. C�dula:</strong> {selectedPharmacy.directorDocument}</p>
                  <p><strong>Profesi�n:</strong> {selectedPharmacy.directorProfession}</p>
                  <p><strong>No. Exequatur:</strong> {selectedPharmacy.directorExequatur}</p>
                  <p><strong>Fecha de Emisi�n:</strong> {selectedPharmacy.directorIssueDate}</p>
                </div>

                {/* Datos del Establecimiento */}
                <div>
                  <h3 className="font-semibold">Datos del Establecimiento</h3>
                  <p><strong>Tipo de Establecimiento:</strong> {selectedPharmacy.pharmacyType}</p>
                  <p><strong>Tipo de Actividad:</strong> {selectedPharmacy.activityType}</p>
                  <p><strong>Direcci�n Completa:</strong> {selectedPharmacy.pharmacyAddress}</p>
                  <p><strong>Provincia:</strong> {selectedPharmacy.pharmacyProvince}</p>
                  <p><strong>Municipio:</strong> {selectedPharmacy.pharmacyMunicipality}</p>
                </div>
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

      {/* MODAL DE EDICI�N (L�piz) */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h2>Editar Farmacia</h2>
          </ModalHeader>
          <ModalBody>
            {editData && (
              <div className="space-y-4">
                {/* Aqu� solo pongo algunos campos a modo de ejemplo.
                    Agrega o quita campos seg�n necesites. */}
                <Input
                  label="ID (key) - Solo lectura"
                  value={editData.key}
                  isReadOnly
                />
                <Input
                  label="Nombre"
                  value={editData.name}
                  onValueChange={(val) =>
                    setEditData((prev) => prev && { ...prev, name: val })
                  }
                />
                <Input
                  label="Ubicaci�n"
                  value={editData.location}
                  onValueChange={(val) =>
                    setEditData((prev) => prev && { ...prev, location: val })
                  }
                />
                <Input
                  label="Propietario"
                  value={editData.owner}
                  onValueChange={(val) =>
                    setEditData((prev) => prev && { ...prev, owner: val })
                  }
                />
                <Input
                  label="�ltima Inspecci�n"
                  type="date"
                  value={editData.lastInspection}
                  onValueChange={(val) =>
                    setEditData((prev) => prev && { ...prev, lastInspection: val })
                  }
                />
                <Input
                  label="Tipo"
                  value={editData.type}
                  onValueChange={(val) =>
                    setEditData((prev) => prev && { ...prev, type: val })
                  }
                />
                <Select
                  label="Estado"
                  selectedKeys={new Set([editData.status])}
                  onChange={(items) => {
                    const val = Array.from(items)[0]?.toString() || "Pendiente";
                    setEditData((prev) => prev && { ...prev, status: val });
                  }}
                >
                  <SelectItem key="Aprobada">Aprobada</SelectItem>
                  <SelectItem key="Pendiente">Pendiente</SelectItem>
                  <SelectItem key="En Inspecci�n">En Inspecci�n</SelectItem>
                  <SelectItem key="Rechazada">Rechazada</SelectItem>
                </Select>
              </div>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="bordered" onPress={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSaveEdit}>
                Guardar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* MODAL DE AGREGAR (Bot�n "Agregar Farmacia") */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <h2>Agregar Farmacia</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="ID (key)"
                value={newPharmacyData.key}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, key: val }))
                }
              />
              <Input
                label="Nombre Actual"
                value={newPharmacyData.name}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, name: val }))
                }
              />
              <Input
                label="Ubicaci�n"
                value={newPharmacyData.location}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, location: val }))
                }
              />
              <Input
                label="Propietario (campo corto)"
                value={newPharmacyData.owner}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, owner: val }))
                }
              />
              <Input
                label="�ltima Inspecci�n"
                type="date"
                value={newPharmacyData.lastInspection}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    lastInspection: val,
                  }))
                }
              />
              <Input
                label="Tipo (Retail, Hospitalaria, etc.)"
                value={newPharmacyData.type}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, type: val }))
                }
              />
              {/* Por si quieres setear un estado inicial */}
              <Select
                label="Estado"
                selectedKeys={new Set([newPharmacyData.status])}
                onChange={(items) => {
                  const val = Array.from(items)[0]?.toString() || "Pendiente";
                  setNewPharmacyData((prev) => ({ ...prev, status: val }));
                }}
              >
                <SelectItem key="Aprobada">Aprobada</SelectItem>
                <SelectItem key="Pendiente">Pendiente</SelectItem>
                <SelectItem key="En Inspecci�n">En Inspecci�n</SelectItem>
                <SelectItem key="Rechazada">Rechazada</SelectItem>
              </Select>

              {/* DATOS DE PROPIETARIO */}
              <hr />
              <h3 className="font-semibold">Datos del Propietario</h3>
              <Input
                label="Nombre/Raz�n Social"
                value={newPharmacyData.ownerName}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, ownerName: val }))
                }
              />
              <Input
                label="RNC/C�dula"
                value={newPharmacyData.ownerDocument}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, ownerDocument: val }))
                }
              />
              <Input
                label="Direcci�n"
                value={newPharmacyData.ownerAddress}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, ownerAddress: val }))
                }
              />
              <Input
                label="Tel�fono"
                value={newPharmacyData.ownerPhone}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, ownerPhone: val }))
                }
              />
              <Input
                label="Correo Electr�nico"
                value={newPharmacyData.ownerEmail}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, ownerEmail: val }))
                }
              />
              <Input
                label="Tel. M�vil"
                value={newPharmacyData.ownerMobile}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, ownerMobile: val }))
                }
              />

              {/* DATOS DEL DIRECTOR T�CNICO */}
              <hr />
              <h3 className="font-semibold">Datos del Director T�cnico</h3>
              <Input
                label="Nombre"
                value={newPharmacyData.directorName}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({ ...prev, directorName: val }))
                }
              />
              <Input
                label="Apellidos"
                value={newPharmacyData.directorLastName}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    directorLastName: val,
                  }))
                }
              />
              <Input
                label="No. C�dula"
                value={newPharmacyData.directorDocument}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    directorDocument: val,
                  }))
                }
              />
              <Input
                label="Profesi�n"
                value={newPharmacyData.directorProfession}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    directorProfession: val,
                  }))
                }
              />
              <Input
                label="No. de Exequatur"
                value={newPharmacyData.directorExequatur}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    directorExequatur: val,
                  }))
                }
              />
              <Input
                label="Fecha de Emisi�n"
                type="date"
                value={newPharmacyData.directorIssueDate}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    directorIssueDate: val,
                  }))
                }
              />

              {/* DATOS DEL ESTABLECIMIENTO */}
              <hr />
              <h3 className="font-semibold">Datos del Establecimiento</h3>
              <Input
                label="Tipo de Establecimiento"
                value={newPharmacyData.pharmacyType}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    pharmacyType: val,
                  }))
                }
              />
              <Input
                label="Tipo de Actividad"
                value={newPharmacyData.activityType}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    activityType: val,
                  }))
                }
              />
              <Input
                label="Direcci�n Completa"
                value={newPharmacyData.pharmacyAddress}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    pharmacyAddress: val,
                  }))
                }
              />
              <Input
                label="Provincia"
                value={newPharmacyData.pharmacyProvince}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    pharmacyProvince: val,
                  }))
                }
              />
              <Input
                label="Municipio"
                value={newPharmacyData.pharmacyMunicipality}
                onValueChange={(val) =>
                  setNewPharmacyData((prev) => ({
                    ...prev,
                    pharmacyMunicipality: val,
                  }))
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
              <Button color="primary" onPress={handleAddPharmacy}>
                Agregar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AdministradorLayout>
  );
};

export default PharmaciesManagementPage;
