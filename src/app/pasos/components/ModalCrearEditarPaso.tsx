"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import { toast } from "react-toastify";
import { Step } from "@/types/stepTypes";

interface ModalCrearEditarPasoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (nuevoPaso: any) => Promise<void>;
  pasoData?: Step | null;
}

const marcas = [
  { name: "KENTUCKY FC", value: "KFC" },
  { name: "BURGER KING", value: "BK" },
  { name: "STARBUCKS", value: "SB" },
  { name: "PIZZA HUT", value: "PH" },
  { name: "PINKBERRY", value: "PB" },
  { name: "WANTA", value: "WT" },
  { name: "MADAME TUSAN", value: "MT" },
  { name: "CHILLIS", value: "CH" },
];

export default function ModalCrearEditarPaso({
  isOpen,
  onClose,
  onConfirm,
  pasoData = null,
}: Readonly<ModalCrearEditarPasoProps>) {
  const [marca, setMarca] = useState("");
  const [nombreInterno, setNombreInterno] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [descripcionComercial, setDescripcionComercial] = useState("");
  const [status, setStatus] = useState("A");

  useEffect(() => {
    if (pasoData) {
      setMarca(pasoData.brand.id);
      setNombreInterno(pasoData.name);
      setNombreComercial(pasoData.commercialName);
      setDescripcionComercial(pasoData.commercialDescription);
      setStatus(pasoData.status.id);
    }
  }, [pasoData]);

  const handleSave = async () => {
    const nuevoPaso = {
      brand: marca,
      Name: nombreInterno,
      CommercialName: nombreComercial,
      CommercialDescription: descripcionComercial,
      Status: status,
    };

    try {
      await onConfirm(nuevoPaso);
      onClose();
      handleClear();
    } catch (error) {
      toast.error("Error al guardar el paso.");
      console.error("Error al guardar el paso.", error);
    }
  };

  const handleClear = () => {
    setMarca("");
    setNombreInterno("");
    setNombreComercial("");
    setDescripcionComercial("");
    setStatus("A");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        handleClear();
      }}
      title={pasoData ? "Editar Paso" : "Crear Nuevo Paso"}
    >
      <div className="flex flex-col space-y-4">
        <select
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Selecciona una Marca</option>
          {marcas.map((marca) => (
            <option key={marca.value} value={marca.value}>
              {marca.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={nombreInterno}
          onChange={(e) => setNombreInterno(e.target.value)}
          placeholder="Nombre Interno"
          className="p-2 border rounded"
        />

        <input
          type="text"
          value={nombreComercial}
          onChange={(e) => setNombreComercial(e.target.value)}
          placeholder="Nombre Comercial"
          className="p-2 border rounded"
        />

        <textarea
          value={descripcionComercial}
          onChange={(e) => setDescripcionComercial(e.target.value)}
          placeholder="Descripción Comercial"
          className="p-2 border rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="A">Activo</option>
          <option value="I">Inactivo</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Limpiar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            {pasoData ? "Guardar Cambios" : "Crear Paso"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
