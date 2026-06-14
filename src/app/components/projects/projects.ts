import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  lang = inject(LanguageService);
  private platformId = inject(PLATFORM_ID); // Protegemos el código para entornos SSR

  // Array dinámico de las 32 imágenes
  galleryImages = Array.from({ length: 32 }, (_, i) => `/img/${i + 1}.png`);

  // Signals de estado
  currentImageIndex = signal(0);
  isFullscreen = signal(false);

  // Funciones de navegación
  nextImage(event?: Event) {
    if (event) event.stopPropagation();
    this.currentImageIndex.update(index => 
      index === this.galleryImages.length - 1 ? 0 : index + 1
    );
    this.scrollToActiveThumbnail(); // <-- LLAMAMOS AL DESPLAZAMIENTO
  }

  prevImage(event?: Event) {
    if (event) event.stopPropagation();
    this.currentImageIndex.update(index => 
      index === 0 ? this.galleryImages.length - 1 : index - 1
    );
    this.scrollToActiveThumbnail(); // <-- LLAMAMOS AL DESPLAZAMIENTO
  }

  setCurrentImage(index: number) {
    this.currentImageIndex.set(index);
    this.scrollToActiveThumbnail(); // <-- LLAMAMOS AL DESPLAZAMIENTO
  }

  toggleFullscreen() {
    this.isFullscreen.update(v => !v);
  }

  /**
   * Busca la miniatura activa en el DOM y desplaza el contenedor horizontal
   * de forma automática para mantenerla siempre centrada a la vista.
   */
  private scrollToActiveThumbnail() {
    if (isPlatformBrowser(this.platformId)) {
      // Le damos un mínimo milisegundo a Angular para que termine de renderizar la clase '.active'
      setTimeout(() => {
        const activeThumb = document.querySelector('.thumb-box.active');
        if (activeThumb) {
          activeThumb.scrollIntoView({
            behavior: 'smooth',   // Desplazamiento suave y fluido
            block: 'nearest',     // Evita que toda la página web salte verticalmente
            inline: 'center'      // Centra perfectamente la miniatura horizontalmente
          });
        }
      }, 50);
    }
  }
}