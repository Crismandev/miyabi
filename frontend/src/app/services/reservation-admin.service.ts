import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

export interface GuestInfo {
  idGuest?: number;
  names?: string;
  surnames?: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  documentNumber?: string;
}

export interface AdminReservation {
  reservationId?: number;
  idReserva?: number;
  reservationCode: string;
  entryDate: string;
  departureDate: string;
  numberNights: number;
  pricePerNight: number;
  roomSubtotal: number;
  totalConsumption?: number;
  totalPay: number;
  state: string;
  observations?: string;
  numAdults?: number;
  numChildren?: number;
  reservationDate?: string;
  checkinDate?: string;
  checkoutDate?: string;
  guest?: GuestInfo;
  room?: Room;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationAdminService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<AdminReservation[]> {
    return this.http.get<AdminReservation[]>(this.apiUrl, { withCredentials: true });
  }

  getReservationById(id: number): Observable<AdminReservation> {
    return this.http.get<AdminReservation>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createReservation(reservation: Partial<AdminReservation>): Observable<AdminReservation> {
    return this.http.post<AdminReservation>(this.apiUrl, reservation, { withCredentials: true });
  }

  updateReservation(id: number, reservation: Partial<AdminReservation>): Observable<AdminReservation> {
    return this.http.put<AdminReservation>(`${this.apiUrl}/${id}`, reservation, { withCredentials: true });
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
