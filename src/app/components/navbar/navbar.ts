import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],  // ← Importamos directivas de routing
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  theme = inject(ThemeService);
  lang = inject(LanguageService);
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
