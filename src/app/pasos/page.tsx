import { listarPasos } from "@/services/pasosService";
import { Step } from "@/types/stepTypes";
import PasosClient from "./components/PasosClient";

export default async function Pasos() {
  const initialData = await listarPasos(5, 1);
  const initialSteps: Step[] = initialData ? initialData.data : [];
  const totalPages = initialData ? initialData.pagination.totalPages : 1;

  return <PasosClient initialSteps={initialSteps} totalPages={totalPages} />;
}
