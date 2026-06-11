import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  lang = inject(LanguageService);
}
