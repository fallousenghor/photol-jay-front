import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./pages/navbar/navbar.component";
import { ToastComponent } from "./components/toast/toast.component";
import { ScrollTopComponent } from "./components/scroll-top/scroll-top.component";
import { HeaderComponent } from "./components/header/header.component";
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    ToastComponent,
    ScrollTopComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private filterService: FilterService) {}

  onSearch(searchTerm: string) {
    console.log('Recherche:', searchTerm);
    // TODO: Implement search logic
  }

  onCategorySelect(category: string) {
    console.log('Catégorie sélectionnée:', category);
    // Convert category name to ID if needed
    if (category === 'all') {
      this.filterService.setSelectedCategoryId(null);
    } else {
      // For now, map hardcoded categories to IDs
      const categoryMap: { [key: string]: number | null } = {
        'électronique': 1,
        'electroniques': 1, // Handle both spellings
        'mode': 2,
        'maison': 3,
        'vip': null, // Special categories
        'récent': null,
        'populaire': null
      };
      this.filterService.setSelectedCategoryId(categoryMap[category] || null);
    }
  }
}
