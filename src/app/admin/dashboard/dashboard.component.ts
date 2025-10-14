import { Component, OnInit } from '@angular/core';
import { HeaderdashboardComponent } from "../headerdashboard/headerdashboard.component";
import { MatricecardComponent } from "../matricecard/matricecard.component";
import { SalechartComponent } from "../salechart/salechart.component";
import { OrdermatriceComponent } from "../ordermatrice/ordermatrice.component";
import { RecentComponent } from "../recent/recent.component";
import { SalerateComponent } from "../salerate/salerate.component";
import { AdminService, AdminStats, PendingProduct } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    HeaderdashboardComponent,
    MatricecardComponent,
    SalechartComponent,
    OrdermatriceComponent,
    RecentComponent,
    SalerateComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  dashboardData: AdminStats | null = null;
  pendingProducts: PendingProduct[] = [];
  loading = true;
  previousStats: AdminStats | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    // Rafraîchir les données toutes les 5 minutes
    setInterval(() => this.loadDashboardData(), 5 * 60 * 1000);
  }

  getDailyChange(value: number, key: keyof AdminStats): number {
    if (!this.previousStats || !value) return 0;
    return ((value - (this.previousStats[key] as number)) / (this.previousStats[key] as number || 1)) * 100;
  }

  loadDashboardData(): void {
    this.loading = true;
    // Sauvegarder les stats précédentes pour calculer les variations
    if (this.dashboardData) {
      this.previousStats = {...this.dashboardData};
    }

    this.adminService.getAdminStats().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
        // Update pending approvals count to use status-based query
        this.adminService.getPendingProducts().subscribe({
          next: (pendingProducts) => {
            this.pendingProducts = pendingProducts;
            if (this.dashboardData) {
              this.dashboardData.pendingApprovals = pendingProducts.length;
            }
          },
          error: (error) => {
            console.error("Erreur chargement produits en attente:", error);
          }
        });
      },
      error: (error) => {
        console.error("Erreur chargement stats admin:", error);
        this.loading = false;
      }
    });
  }

  onApproveProduct(productId: number): void {
    if (!productId) return;
    this.loading = true;
    this.adminService.approveProduct(productId).subscribe({
      next: () => {
        console.log('Produit approuvé avec succès');
        this.loadDashboardData();
      },
      error: (error) => {
        console.error('Erreur lors de l\'approbation du produit:', error);
        this.loading = false;
      }
    });
  }

  onRejectProduct({ productId, reason }: { productId: number; reason: string }): void {
    if (!productId || !reason) return;
    this.loading = true;
    this.adminService.rejectProduct(productId, reason).subscribe({
      next: () => {
        console.log('Produit rejeté avec succès');
        this.loadDashboardData();
      },
      error: (error) => {
        console.error('Erreur lors du rejet du produit:', error);
        this.loading = false;
      }
    });
  }
}
