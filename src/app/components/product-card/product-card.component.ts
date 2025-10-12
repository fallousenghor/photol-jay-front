import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() viewDetailsClicked = new EventEmitter<Product>();
  @Output() favoriteClicked = new EventEmitter<Product>();

  isFavorite = false;

  get imageUrl(): string {
    if (this.product.images && this.product.images.length > 0) {
      return `http://localhost:3007${this.product.images[0].url}`;
    }
    return 'assets/placeholder-image.jpg'; // Add a placeholder image in assets
  }

  getOriginalPrice(): number {
    const price = this.product.price || 0;
    return price; // No discount in backend, so original price is the price
  }

  getPrice(): number {
    return this.product.price || 0;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteClicked.emit(this.product);
  }

  viewDetails(): void {
    this.viewDetailsClicked.emit(this.product);
  }
}
