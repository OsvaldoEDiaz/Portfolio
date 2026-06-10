import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'es' | 'en';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly STORAGE_KEY = 'portfolio-lang';
    private platformId = inject(PLATFORM_ID);
    
    currentLang = signal<Language>('es');

    private translations = signal<Record<string, any>>({
        es: {},
        en: {}
    });

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
        const saved = localStorage.getItem(this.STORAGE_KEY) as Language;
        if (saved && (saved === 'es' || saved === 'en')) {
            this.currentLang.set(saved);
        }
        }
        this.loadTranslations(this.currentLang());
    }

    async setLanguage(lang: Language) {
        this.currentLang.set(lang);
        if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.STORAGE_KEY, lang);
        }
        await this.loadTranslations(lang);
    }

    toggleLanguage() {
        const newLang = this.currentLang() === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
    }

    private async loadTranslations(lang: Language) {
        if (isPlatformBrowser(this.platformId)) {
            try {
                // 1. Agregamos la barra '/' al inicio para que la ruta sea absoluta desde la raíz
                const response = await fetch(`/i18n/${lang}.json`);
                
                // 2. Verificamos si la respuesta del servidor fue exitosa (código 200-299)
                if (!response.ok) {
                    throw new Error(`Archivo no encontrado o error del servidor: ${response.status} ${response.statusText}`);
                }

                // 3. Si todo está bien, recién ahí parseamos el JSON
                const data = await response.json();
                
                // 2. Actualizamos la Signal con las nuevas traducciones
                this.translations.update(t => ({
                    ...t,
                    [lang]: data
                }));
            } catch (e) {
                console.error(`Error cargando las traducciones para el idioma '${lang}':`, e);
            }
        }
    }

    translate(key: string): string {
        const keys = key.split('.');
        let value: any = this.translations()[this.currentLang()];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return typeof value === 'string' ? value : key;
    }

    t(key: string): string {
        return this.translate(key);
    }
}