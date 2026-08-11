import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem {
  serviceId?: number;
  idServicio?: number;
  serviceName: string;
  description?: string;
  price: number;
  category?: string;
  season?: string;
  available?: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/services-catalog';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(this.apiUrl, { withCredentials: true });
  }

  getItemById(id: number): Observable<ServiceItem> {
    return this.http.get<ServiceItem>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createItem(item: ServiceItem): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(this.apiUrl, item, { withCredentials: true });
  }

  updateItem(id: number, item: ServiceItem): Observable<ServiceItem> {
    return this.http.put<ServiceItem>(`${this.apiUrl}/${id}`, item, { withCredentials: true });
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
