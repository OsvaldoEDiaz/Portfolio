import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  lang = inject(LanguageService);
}
