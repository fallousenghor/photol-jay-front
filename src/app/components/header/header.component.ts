import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() searchChanged = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<string>();

  searchTerm: string = '';
  selectedCategory: string = 'all';
  showCategories: boolean = false;

  categories: string[] = [
    'all',
    'vip',
    'récent',
    'populaire',
    'électronique',
    'mode',
    'maison'
  ];

  private readonly categoryCounts: { [key: string]: number } = {
    'all': 150,
    'vip': 25,
    'récent': 45,
    'populaire': 78,
    'électronique': 32,
    'mode': 56,
    'maison': 43
  };

  private readonly categoryIcons: { [key: string]: string } = {
    'all': 'fa-th-large',
    'vip': 'fa-crown',
    'récent': 'fa-clock',
    'populaire': 'fa-fire',
    'électronique': 'fa-mobile-alt',
    'mode': 'fa-tshirt',
    'maison': 'fa-home'
  };

  getCategoryIcon(category: string): string {
    return this.categoryIcons[category] || 'fa-folder';
  }

  getCategoryCount(category: string): number {
    return this.categoryCounts[category] || 0;
  }

  openCamera(): void {
    console.log('Opening camera...');
    // TODO: Implémenter la capture photo
  }

  onSearchChange(): void {
    this.searchChanged.emit(this.searchTerm);
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.showCategories = false;
    this.categorySelected.emit(category);
  }
}
