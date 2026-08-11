import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UserSession {
  isLoggedIn: boolean;
  role?: string;
  guestName?: string;
  guestId?: number;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  currentUser = signal<UserSession>(this.getInitialSession());

  constructor(private http: HttpClient) {
    this.checkSession().subscribe();
  }

  getInitialSession(): UserSession {
    try {
      const saved = localStorage.getItem('miyabi_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { isLoggedIn: false };
  }

  setSession(session: UserSession) {
    this.currentUser.set(session);
    if (session.isLoggedIn) {
      localStorage.setItem('miyabi_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('miyabi_session');
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(res => {
        this.setSession({
          isLoggedIn: true,
          role: res.role,
          guestName: res.guestName,
          guestId: res.guestId,
          userId: res.userId
        });
      })
    );
  }

  register(guestData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, guestData, { withCredentials: true }).pipe(
      tap(res => {
        this.setSession({
          isLoggedIn: true,
          role: 'GUEST',
          guestName: res.guestName,
          guestId: res.guestId
        });
      })
    );
  }

  checkSession(): Observable<UserSession> {
    return this.http.get<UserSession>(`${this.apiUrl}/check`, { withCredentials: true }).pipe(
      tap(session => {
        this.setSession(session);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true, responseType: 'text' }).pipe(
      tap(() => {
        this.setSession({ isLoggedIn: false });
      })
    );
  }
}
