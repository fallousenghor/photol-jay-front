import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./pages/navbar/navbar.component";
import { ToastComponent } from "./components/toast/toast.component";
import { ScrollTopComponent } from "./components/scroll-top/scroll-top.component";
import { HeaderComponent } from "./components/header/header.component";

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

  onSearch(searchTerm: string) {
    console.log('Recherche:', searchTerm);
    // TODO: Implement search logic
  }

  onCategorySelect(category: string) {
    console.log('Catégorie sélectionnée:', category);
    // TODO: Implement category selection and filter logic
  }
}
