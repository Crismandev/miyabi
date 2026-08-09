import { Guest } from './guest.model';
import { Room } from './room.model';

export interface Reservation {
  idReserva?: number;
  reservationCode?: string;
  guest?: Guest;
  room?: Room;
  entryDate: string;
  departureDate: string;
  numAdults?: number;
  numChildren?: number;
  totalPay: number;
  state: 'Pending' | 'Confirmed' | 'CheckedIn' | 'CheckedOut' | 'Cancelled';
  observations?: string;
  registrationDate?: string;
}

export interface BookingPayload {
  names: string;
  surnames: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  country?: string;
  address?: string;
  roomId: number;
  entryDate: string;
  departureDate: string;
  numAdults: number;
  numChildren: number;
  totalPay: number;
  paymentMethod: string;
  observations?: string;
}
