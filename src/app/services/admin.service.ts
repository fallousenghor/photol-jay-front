import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminStats {
  totalProducts: number;
  pendingApprovals: number;
  totalVipUsers: number;
  totalViews: number;
  totalModerations: number;
  recentModerations: any[];
  approvalTrends: any[];
  viewTrends: any[];
}

export interface PendingProduct {
  id: number;
  title: string;
  description: string;
  user: {
    userName: string;
    email: string;
  };
  images: { url: string }[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAdminStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.apiUrl}/api/admin/stats`);
  }

  getPendingProducts(): Observable<PendingProduct[]> {
    return this.http.get<PendingProduct[]>(`${this.apiUrl}/api/admin/pending-products`);
  }

  approveProduct(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admin/products/${productId}/approve`, { productId });
  }

  rejectProduct(productId: number, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admin/products/${productId}/reject`, { productId, reason });
  }

  getVipUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/admin/vip-users`);
  }

  toggleVipStatus(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admin/users/${userId}/toggle-vip`, { userId });
  }
}
