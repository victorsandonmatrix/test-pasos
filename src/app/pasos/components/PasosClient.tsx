"use client";

import { usePasosClient } from "../hooks/usePasosClient";
import { Step } from "@/types/stepTypes";
import ModalCrearEditarPaso from "./ModalCrearEditarPaso";
import ModalConfirmacionEliminar from "./ModalConfirmacionEliminar";
import { useState } from "react";

interface PasosClientProps {
  initialSteps: Step[];
  totalPages: number;
}

export default function PasosClient({
  initialSteps,
  totalPages,
}: Readonly<PasosClientProps>) {
  const {
    steps,
    currentPage,
    error,
    nextPage,
    prevPage,
    isModalOpen,
    isDeleteModalOpen,
    selectedPaso,
    openModalForCreate,
    openModalForEdit,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    onConfirmSavePaso,
    confirmDeletePaso,
    applyFilters,
  } = usePasosClient({
    initialSteps,
    totalPages,
  });

  // Estados para los filtros
  const [filterBrand, setFilterBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = () => {
    applyFilters(filterBrand, filterStatus, searchTerm);
  };

  return (
    <div className="flex">
      <nav className="w-64 h-screen bg-gray-800 text-white p-6">
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="text-lg font-semibold block p-2 bg-gray-700 rounded"
            >
              Pasos
            </a>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">PASOS</h1>
          <button
            onClick={openModalForCreate}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Añadir paso
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Marca</option>
            <option value="KFC">KFC</option>
            <option value="BK">BURGER KING</option>
            <option value="SB">STARBUCKS</option>
            <option value="PH">PIZZA HUT</option>
            <option value="PB">PINKBERRY</option>
            <option value="WT">WANTA</option>
            <option value="MT">MADAME TUSAN</option>
            <option value="CH">CHILLIS</option>
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar"
            className="p-2 border rounded"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Estado</option>
            <option value="A">Activo</option>
            <option value="I">Inactivo</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Filtrar
          </button>
        </div>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <table className="min-w-full bg-white shadow-md rounded mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b">Brand</th>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Commercial Name</th>
                  <th className="py-2 px-4 border-b">Commercial Description</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">EDIT</th>
                  <th className="py-2 px-4 border-b">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step) => (
                  <tr key={step.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{step.brand.name}</td>
                    <td className="py-2 px-4 border-b">{step.id}</td>
                    <td className="py-2 px-4 border-b">{step.name}</td>
                    <td className="py-2 px-4 border-b">
                      {step.commercialName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {step.commercialDescription}
                    </td>
                    <td className="py-2 px-4 border-b">{step.status.name}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => openModalForEdit(step)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => openDeleteModal(step)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        <ModalCrearEditarPaso
          isOpen={isModalOpen}
          onClose={closeModal}
          pasoData={selectedPaso}
          onConfirm={onConfirmSavePaso}
        />

        <ModalConfirmacionEliminar
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeletePaso}
        >
          <p>¿Estás seguro de que deseas eliminar este paso?</p>
        </ModalConfirmacionEliminar>
      </main>
    </div>
  );
}
