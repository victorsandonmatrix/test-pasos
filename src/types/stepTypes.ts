export interface Step {
  id: string;
  name: string;
  commercialName: string;
  commercialNameEng: string;
  commercialDescription: string;
  commercialDescriptionEng: string;
  brand: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: string;
  };
  auditInformation: {
    creationUser: string;
    creationDate: string;
    modificationUser: string;
    modificationDate: string;
  };
}

export interface StepsResponse {
  data: Step[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface CrearPasoPayload {
  brand: string;
  Name: string;
  CommercialName: string;
  CommercialDescription: string;
  Status: string;
}
