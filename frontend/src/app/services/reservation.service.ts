import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingPayload, Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl, { withCredentials: true });
  }

  getReservationsByGuest(idGuest: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/guest/${idGuest}`, { withCredentials: true });
  }

  confirmBooking(payload: BookingPayload): Observable<{ message: string; reservationCode: string }> {
    return this.http.post<{ message: string; reservationCode: string }>(`${this.apiUrl}/confirm`, payload, { withCredentials: true });
  }

  getUnavailableDates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/unavailable-dates`, { withCredentials: true });
  }

  updateReservationState(id: number, state: string): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}/state?state=${state}`, {}, { withCredentials: true });
  }
}
