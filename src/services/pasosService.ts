import axiosInstance from "@/lib/axiosInstance";
import { CrearPasoPayload, StepsResponse } from "@/types/stepTypes";

const PATH = {
  STEPS_API: "/products/v1/steps",
};

export const listarPasos = async (
  limit: number = 5,
  offset: number = 1
): Promise<StepsResponse | null> => {
  try {
    const response = await axiosInstance.get<StepsResponse>(PATH.STEPS_API, {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching steps:", error);
    return null;
  }
};

export const crearPaso = async (
  nuevoPaso: CrearPasoPayload
): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(PATH.STEPS_API, nuevoPaso);
    return response.data;
  } catch (error) {
    console.error("Error creating step:", error);
    return null;
  }
};

export const editarPaso = async (
  id: string,
  pasoActualizado: CrearPasoPayload
): Promise<any | null> => {
  try {
    const response = await axiosInstance.patch(
      `${PATH.STEPS_API}/${id}`,
      pasoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Error editing step:", error);
    return null;
  }
};

export const eliminarPaso = async (id: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`${PATH.STEPS_API}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting step:", error);
    return false;
  }
};
