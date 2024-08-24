import { useState, useEffect } from "react";
import {
  listarPasos,
  crearPaso,
  editarPaso,
  eliminarPaso,
} from "@/services/pasosService";
import { Step } from "@/types/stepTypes";
import { toast } from "react-toastify";

interface UsePasosClientProps {
  initialSteps: Step[];
  totalPages: number;
}

export function usePasosClient({
  initialSteps,
  totalPages,
}: UsePasosClientProps) {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPaso, setSelectedPaso] = useState<Step | null>(null);

  const fetchSteps = async () => {
    setError(null);

    try {
      const data = await listarPasos(5, currentPage);
      if (data) {
        setSteps(data.data);
      }
    } catch (err) {
      setError("Error fetching steps. Please try again later.");
    }
  };

  useEffect(() => {
    if (currentPage !== 1 || steps !== initialSteps) {
      fetchSteps();
    }
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const openModalForCreate = () => {
    setSelectedPaso(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (paso: Step) => {
    setSelectedPaso(paso);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (paso: Step) => {
    setSelectedPaso(paso);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeletePaso = async () => {
    if (selectedPaso) {
      const success = await eliminarPaso(selectedPaso.id);
      if (success) {
        setSteps((prevSteps) =>
          prevSteps.filter((step) => step.id !== selectedPaso.id)
        );
        toast.success("Paso eliminado con éxito");
      } else {
        toast.error(
          "El paso seleccionado se encuentra configurado para 1 o más producto(s)."
        );
      }
      closeDeleteModal();
    }
  };

  const onConfirmSavePaso = async (nuevoPaso: any) => {
    try {
      if (selectedPaso) {
        await editarPaso(selectedPaso.id, nuevoPaso);
      } else {
        await crearPaso(nuevoPaso);
      }

      toast.success("Paso guardado con éxito");
      closeModal();
      await fetchSteps();
    } catch (error) {
      toast.error("Error al guardar el paso.");
      console.error("Error al guardar el paso.", error);
    }
  };

  const applyFilters = (brand: string, status: string, searchTerm: string) => {
    let filteredSteps = [...initialSteps];

    if (brand) {
      filteredSteps = filteredSteps.filter((step) => step.brand.id === brand);
    }

    if (status) {
      filteredSteps = filteredSteps.filter((step) => step.status.id === status);
    }

    if (searchTerm) {
      filteredSteps = filteredSteps.filter(
        (step) =>
          step.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          step.commercialName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setSteps(filteredSteps);
  };

  return {
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
    confirmDeletePaso,
    onConfirmSavePaso,
    applyFilters, 
  };
}
