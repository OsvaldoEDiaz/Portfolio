import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { VisitService } from './services/visit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  
    Navbar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  title = 'portfolio-metal';

  stats = {
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0
  };

  constructor(
    private visitService: VisitService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    // Registrar la visita actual
    await this.visitService.registerVisit();
    // Obtener estadísticas de visitas
    this.stats = await this.visitService.getVisitStats();
    this.cdr.detectChanges();
  }
}
