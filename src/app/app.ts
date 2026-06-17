import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { VisitService } from './services/visit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,      // ← Renderiza el componente de la ruta activa
    Navbar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'portfolio-metal';

  stats = {
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0
  };

  constructor(private visitService: VisitService) {}

  async ngOnInit() {
    // Registrar la visita actual
    await this.visitService.registerVisit();

    // Obtener estadísticas de visitas
    this.stats = await this.visitService.getVisitStats();
  }
}
