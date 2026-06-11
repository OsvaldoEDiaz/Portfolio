import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language';

// Definimos una estructura para el Modal
export interface SkillDetail {
  name: string;
  descriptionKey: string;
  colorClass: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  lang = inject(LanguageService);
  
  // Signal para controlar la ventana emergente
  selectedSkill = signal<SkillDetail | null>(null);

  openSkill(name: string, descriptionKey: string, colorClass: string = '') {
    this.selectedSkill.set({ name, descriptionKey, colorClass });
  }

  closeSkill() {
    this.selectedSkill.set(null);
  }
}
