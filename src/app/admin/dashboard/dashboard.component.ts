import { Component, OnInit } from '@angular/core';
import { HeaderdashboardComponent } from "../headerdashboard/headerdashboard.component";
import { MatricecardComponent } from "../matricecard/matricecard.component";
import { SalechartComponent } from "../salechart/salechart.component";
import { OrdermatriceComponent } from "../ordermatrice/ordermatrice.component";
import { RecentComponent } from "../recent/recent.component";
import { SalerateComponent } from "../salerate/salerate.component";
import { AdminService, AdminStats, PendingProduct } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderdashboardComponent, MatricecardComponent, SalechartComponent, OrdermatriceComponent, RecentComponent, SalerateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  dashboardData: AdminStats | null = null;
  pendingProducts: PendingProduct[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.adminService.getAdminStats().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur chargement stats admin:', error);
        this.loading = false;
      }
    });

    this.adminService.getPendingProducts().subscribe({
      next: (products) => {
        this.pendingProducts = products;
      },
      error: (error) => {
        console.error('Erreur chargement produits en attente:', error);
      }
    });
  }

  onApproveProduct(productId: number): void {
    this.adminService.approveProduct(productId).subscribe({
      next: () => {
        this.loadDashboardData(); // Recharger les données
      },
      error: (error) => {
        console.error('Erreur approbation produit:', error);
      }
    });
  }

  onRejectProduct(productId: number, reason: string): void {
    this.adminService.rejectProduct(productId, reason).subscribe({
      next: () => {
        this.loadDashboardData(); // Recharger les données
      },
      error: (error) => {
        console.error('Erreur rejet produit:', error);
      }
    });
  }
}
