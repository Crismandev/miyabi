import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomType } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`, { withCredentials: true });
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/rooms/${id}`, { withCredentials: true });
  }

  getAllRoomTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(`${this.apiUrl}/room-types`, { withCredentials: true });
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/rooms`, room, { withCredentials: true });
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/rooms/${id}`, room, { withCredentials: true });
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/rooms/${id}`, { withCredentials: true });
  }
}
