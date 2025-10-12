import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  isPullingToRefresh = false;
  startY = 0;
  private readonly PULL_THRESHOLD = 80;
  isFavorite: any;

  constructor(
    private productService: ProductService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (window.pageYOffset === 0) {
      this.startY = event.touches[0].pageY;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.startY > 0 && window.pageYOffset === 0) {
      const pull = event.touches[0].pageY - this.startY;
      if (pull > 0) {
        this.isPullingToRefresh = pull > this.PULL_THRESHOLD;
        event.preventDefault();
      }
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    if (this.isPullingToRefresh) {
      this.refreshProducts();
    }
    this.startY = 0;
    this.isPullingToRefresh = false;
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.uiService.showError('Erreur lors du chargement des produits');
      }
    });
  }

  refreshProducts(): void {
    this.uiService.showInfo('Actualisation...');
    this.loadProducts();
  }

  onViewDetails(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  onFavoriteToggle(product: Product): void {
    this.uiService.showSuccess(`${product.title} ${this.isFavorite ? 'retiré des' : 'ajouté aux'} favoris`);
  }
}
