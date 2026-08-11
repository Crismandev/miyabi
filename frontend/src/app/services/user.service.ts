import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rol {
  idRol?: number;
  rolId?: number;
  nameRol: string;
  description?: string;
}

export interface UserStaff {
  idUsuario?: number;
  idUser?: number;
  names: string;
  surnames: string;
  email: string;
  password?: string;
  state?: number;
  rol?: Rol;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserStaff[]> {
    return this.http.get<UserStaff[]>(this.apiUrl, { withCredentials: true });
  }

  getUserById(id: number): Observable<UserStaff> {
    return this.http.get<UserStaff>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createUser(user: UserStaff): Observable<UserStaff> {
    return this.http.post<UserStaff>(this.apiUrl, user, { withCredentials: true });
  }

  updateUser(id: number, user: UserStaff): Observable<UserStaff> {
    return this.http.put<UserStaff>(`${this.apiUrl}/${id}`, user, { withCredentials: true });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
