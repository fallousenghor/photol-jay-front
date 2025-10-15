import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LOGO_IMAGE } from '../../constants/images';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  userInitials = '';
  isLoggedIn = false;
  logoImage = LOGO_IMAGE;
  private subscriptions = new Subscription();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
      })
    );

    this.subscriptions.add(
      this.authService.userName$.subscribe(userName => {
        if (userName) {
          this.userInitials = userName.substring(0, 2).toUpperCase();
        } else {
          this.userInitials = '';
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  handleProfile(): void {
    console.log('Profile clicked');
    this.isDropdownOpen = false;
  }

  handleSettings(): void {
    console.log('Settings clicked');
    this.isDropdownOpen = false;
  }

  handleLogin(): void {
    this.router.navigate(['/login']);
    this.isDropdownOpen = false;
  }

  handleLogout(): void {
    this.authService.removeToken();
    this.authService.removeUserName();
    this.authService.removeUserId();
    this.router.navigate(['/']);
    this.isDropdownOpen = false;
  }

}
