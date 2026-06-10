import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly STORAGE_KEY = 'portfolio-theme';
    private platformId = inject(PLATFORM_ID);
    
    isDarkMode = signal<boolean>(true);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            const isDark = saved ? saved === 'dark' : true;
            this.isDarkMode.set(isDark);
            this.applyTheme(isDark);
        }

        effect(() => {
        const dark = this.isDarkMode();
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
        }
        this.applyTheme(dark);
        });
    }

    toggleTheme() {
        this.isDarkMode.update(dark => !dark);
    }

    private applyTheme(isDark: boolean) {
        if (isPlatformBrowser(this.platformId)) {
        if (isDark) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
        }
    }
}