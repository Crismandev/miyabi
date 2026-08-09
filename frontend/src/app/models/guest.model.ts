export interface Guest {
  idGuest?: number;
  names: string;
  surnames: string;
  documentType: string;
  documentNumber: string;
  phone?: string;
  email: string;
  country?: string;
  address?: string;
}
