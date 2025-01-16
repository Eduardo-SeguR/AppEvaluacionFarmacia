import React, { useState } from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";

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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Eye } from "lucide-react";

/** Interfaz para cada Inspecci�n en la tabla */
interface Inspeccion {
  key: string;            
  pharmacyName: string;   
  location: string;       
  ownerName: string;      
  status: string;         
  submissionDate: string; 
  inspectionDate: string; 
  inspectors: string[];   
}

/** Interfaz para la farmacia simulada en el dropdown */
interface FarmaciaSimulada {
  id: string;          
  name: string;        
  owner: string;       
  location: string;    
  // Puedes agregar un "risk" u otro campo extra si lo deseas
}

/** Interfaz para la nueva inspecci�n */
interface NuevaInspeccion {
  pharmacyName: string;
  location: string;
  ownerName: string;
  status: string;         
  submissionDate: string; 
  inspectionDate: string; 
  inspectors: string[];   
}

export default function InspectionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lista principal de inspecciones
  const [inspections, setInspections] = useState<Inspeccion[]>([
    {
      key: "1",
      pharmacyName: "Farmacia Central",
      location: "Calle Principal 123",
      ownerName: "Juan P�rez",
      status: "Pendiente",
      submissionDate: "2023-05-01",
      inspectionDate: "2023-05-10",
      inspectors: ["Inspector Thomas"],
    },
    {
      key: "2",
      pharmacyName: "Farmacia del Hospital",
      location: "Av. Salud 456",
      ownerName: "Mar�a Garc�a",
      status: "Aprobada",
      submissionDate: "2023-05-02",
      inspectionDate: "2023-05-07",
      inspectors: ["Inspector Lucy", "Inspector Ram�rez"],
    },
    {
      key: "3",
      pharmacyName: "Farmacia Norte",
      location: "Calle Norte 789",
      ownerName: "Pedro S�nchez",
      status: "En Inspecci�n",
      submissionDate: "2023-05-03",
      inspectionDate: "2023-05-08",
      inspectors: ["Inspector Ram�rez"],
    },
    {
      key: "4",
      pharmacyName: "Farmacia Sur",
      location: "Calle Sur 101",
      ownerName: "Ana L�pez",
      status: "Rechazada",
      submissionDate: "2023-05-04",
      inspectionDate: "2023-05-09",
      inspectors: ["Inspector Lucy"],
    },
  ]);

  // Simulaci�n de farmacias (para el dropdown)
  const [farmaciasSimuladas] = useState<FarmaciaSimulada[]>([
    { id: "f001", name: "Farmacia Alpha", owner: "Carlos Rodr�guez", location: "Calle Alpha 123" },
    { id: "f002", name: "Farmacia Beta", owner: "Ana Mart�nez", location: "Calle Beta 456" },
    { id: "f003", name: "Farmacia Gamma", owner: "Luis Fern�ndez", location: "Calle Gamma 789" },
  ]);

  // Filtro de inspecciones por nombre/key
  const filteredInspections = inspections.filter((insp) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      insp.pharmacyName.toLowerCase().includes(lowerSearch) ||
      insp.key.toLowerCase().includes(lowerSearch)
    );
  });

  // Columnas de la tabla
  const columns = [
    { key: "pharmacyName", label: "Nombre" },
    { key: "location", label: "Ubicaci�n" },
    { key: "ownerName", label: "Propietario" },
    { key: "status", label: "Estado" },
    { key: "submissionDate", label: "Fecha de Solicitud" },
    { key: "inspectionDate", label: "Fecha de Inspecci�n" },
    { key: "inspectors", label: "Inspectores Asignados" },
    { key: "actions", label: "Acciones" },
  ];

  // Modal de detalle
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspeccion | null>(
    null
  );

  // Modal de "Agendar Inspecci�n"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Inspectores disponibles
  const [allInspectors] = useState<string[]>([
    "Inspector Thomas",
    "Inspector Lucy",
    "Inspector Ram�rez",
    "Inspector Smith",
  ]);

  // Inspectores asignados al agendar (m�nimo 2)
  const [tempAssignedInspectors, setTempAssignedInspectors] = useState<string[]>([]);

  // Nueva inspecci�n (sin key). Status siempre "Pendiente".
  const [newInspectionData, setNewInspectionData] = useState<NuevaInspeccion>({
    pharmacyName: "",
    location: "",
    ownerName: "",
    status: "Pendiente",
    submissionDate: "",
    inspectionDate: "",
    inspectors: [],
  });

  /** Abre modal de detalle (Ojo) */
  const handleOpenDetail = (insp: Inspeccion) => {
    setSelectedInspection(insp);
    setIsDetailModalOpen(true);
  };

  /** Asignar/deseleccionar Inspectores al hacer click */
  const handleSelectInspector = (inspector: string) => {
    // NUEVO: si el inspector YA existe, lo quitamos (deseleccionar).
    // Si no est�, lo agregamos.
    setTempAssignedInspectors((prev) => {
      if (prev.includes(inspector)) {
        // lo removemos
        return prev.filter((i) => i !== inspector);
      }
      // lo agregamos
      return [...prev, inspector];
    });
  };

  /** Selecci�n de Farmacia del dropdown (simulaci�n) */
  const handleSelectFarmacia = (farmaciaId: string) => {
    const found = farmaciasSimuladas.find((f) => f.id === farmaciaId);
    if (found) {
      setNewInspectionData((prev) => ({
        ...prev,
        pharmacyName: found.name,
        location: found.location,
        ownerName: found.owner,
      }));
    }
  };

  /** Agregar Nueva Inspecci�n */
  const handleAddInspection = () => {
    // Validar: al menos una farmacia seleccionada
    if (!newInspectionData.pharmacyName) {
      alert("Debe seleccionar una Farmacia.");
      return;
    }
    // Validar: al menos 2 inspectores
    if (tempAssignedInspectors.length < 2) {
      alert("Debe asignar al menos 2 inspectores.");
      return;
    }
    // Fecha de Solicitud (momento actual)
    const today = new Date().toISOString().split("T")[0];
    const submissionDate = today;
    // Validar que la fecha de inspecci�n sea > submissionDate
    if (
      newInspectionData.inspectionDate &&
      new Date(newInspectionData.inspectionDate) <= new Date(submissionDate)
    ) {
      alert("La fecha de inspecci�n debe ser posterior a la fecha de solicitud.");
      return;
    }

    // Generamos un key local
    const generatedKey = String(Math.floor(Math.random() * 1000000));

    // Nuevo entry
    const newEntry: Inspeccion = {
      key: generatedKey,
      pharmacyName: newInspectionData.pharmacyName,
      location: newInspectionData.location,
      ownerName: newInspectionData.ownerName,
      status: "Pendiente",
      submissionDate: submissionDate,
      inspectionDate: newInspectionData.inspectionDate,
      inspectors: [...tempAssignedInspectors],
    };

    setInspections([...inspections, newEntry]);
    setIsAddModalOpen(false);

    // Reseteo
    setNewInspectionData({
      pharmacyName: "",
      location: "",
      ownerName: "",
      status: "Pendiente",
      submissionDate: "",
      inspectionDate: "",
      inspectors: [],
    });
    setTempAssignedInspectors([]);

    alert(`Inspecci�n agendada para "${newEntry.pharmacyName}".`);
  };

  /** Renderiza celdas de la tabla */
  const renderCell = (insp: Inspeccion, columnKey: string) => {
    switch (columnKey) {
      case "status":
        return (
          <span
            className={`capitalize text-xs font-semibold ${
              insp.status === "Aprobada"
                ? "text-green-500"
                : insp.status === "Pendiente"
                ? "text-yellow-500"
                : insp.status === "En Inspecci�n"
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {insp.status}
          </span>
        );
      case "inspectors":
        return (
          <span className="text-sm">
            {insp.inspectors.length > 0
              ? insp.inspectors.join(", ")
              : "�"}
          </span>
        );
      case "actions":
        return (
          <Button
            isIconOnly
            variant="light"
            aria-label="Ver detalles de la inspecci�n"
            onPress={() => handleOpenDetail(insp)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      default:
        // Devuelve la propiedad correspondiente
        return (insp as any)[columnKey];
    }
  };

  return (
    <AdministradorLayout>
      <div>
        <h1 className="text-3xl font-semibold mb-6">Historial de Inspecciones</h1>

        {/* Buscador */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Buscar inspecciones..."
            className="w-1/3"
            value={searchTerm}
            onValueChange={(val) => setSearchTerm(val)}
          />
          <Button color="primary" size="lg" onPress={() => setIsAddModalOpen(true)}>
            Agendar Inspecci�n
          </Button>
        </div>

        {/* Tabla */}
        <Table
          aria-label="Inspection History Table"
          css={{ height: "auto", minWidth: "100%" }}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredInspections.map((insp) => (
              <TableRow key={insp.key}>
                {columns.map((col) => (
                  <TableCell key={`${insp.key}-${col.key}`}>
                    {renderCell(insp, col.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DETALLE DE INSPECCI�N */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h2>Detalles de la Inspecci�n</h2>
          </ModalHeader>
          <ModalBody>
            {selectedInspection && (
              <div className="space-y-2">
                <p>
                  <strong>ID:</strong> {selectedInspection.key}
                </p>
                <p>
                  <strong>Farmacia:</strong> {selectedInspection.pharmacyName}
                </p>
                <p>
                  <strong>Ubicaci�n:</strong> {selectedInspection.location}
                </p>
                <p>
                  <strong>Propietario:</strong> {selectedInspection.ownerName}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedInspection.status}
                </p>
                <p>
                  <strong>Fecha de Solicitud:</strong>{" "}
                  {selectedInspection.submissionDate}
                </p>
                <p>
                  <strong>Fecha de Inspecci�n:</strong>{" "}
                  {selectedInspection.inspectionDate || "No asignada"}
                </p>
                <p>
                  <strong>Inspectores:</strong>{" "}
                  {selectedInspection.inspectors.join(", ") || "Ninguno"}
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

      {/* MODAL AGENDAR INSPECCI�N */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h2>Agendar Nueva Inspecci�n</h2>
          </ModalHeader>
          <ModalBody>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Seleccione la Farmacia
              </label>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    {newInspectionData.pharmacyName
                      ? newInspectionData.pharmacyName
                      : "Elija Farmacia"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Farmacias Disponibles"
                  onAction={(id) => handleSelectFarmacia(id.toString())}
                >
                  {farmaciasSimuladas.map((f) => (
                    <DropdownItem key={f.id}>
                      {f.name}
                      {/* Podr�as mostrar un subtexto o riesgo */}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Ubicacion y Propietario en readOnly */}
            <Input
              label="Ubicaci�n"
              value={newInspectionData.location}
              isReadOnly
            />
            <Input
              label="Propietario"
              value={newInspectionData.ownerName}
              isReadOnly
            />
            {/* Estado fijo */}
            <Input
              label="Estado"
              value={newInspectionData.status}
              isReadOnly
            />
            {/* Fecha de Inspecci�n */}
            <Input
              label="Fecha de Inspecci�n"
              type="date"
              value={newInspectionData.inspectionDate}
              onValueChange={(val) =>
                setNewInspectionData((prev) => ({
                  ...prev,
                  inspectionDate: val,
                }))
              }
            />

            {/* Asignar Inspectores (al menos 2) */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Inspectores Asignados
              </label>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    {tempAssignedInspectors.length > 0
                      ? `Elegidos: ${tempAssignedInspectors.join(", ")}`
                      : "Seleccione Inspectores"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Inspectores Disponibles"
                  onAction={(key) => handleSelectInspector(key.toString())}
                >
                  {allInspectors.map((ins) => (
                    <DropdownItem
                      key={ins}
                      // Indicamos si ya est� seleccionado
                      description={
                        tempAssignedInspectors.includes(ins)
                          ? "Actual: Seleccionado (vuelva a clickear para quitar)"
                          : undefined
                      }
                    >
                      {ins}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="bordered"
                onPress={() => {
                  setIsAddModalOpen(false);
                  setTempAssignedInspectors([]);
                  setNewInspectionData({
                    pharmacyName: "",
                    location: "",
                    ownerName: "",
                    status: "Pendiente",
                    submissionDate: "",
                    inspectionDate: "",
                    inspectors: [],
                  });
                }}
              >
                Cancelar
              </Button>
              <Button color="primary" onPress={handleAddInspection}>
                Agendar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AdministradorLayout>
  );
}
