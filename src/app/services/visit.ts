import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

// Inicializamos Firebase igual que en tu contact.ts
const app = initializeApp(environment.firebase);
const db = getFirestore(app);

@Injectable({
    providedIn: 'root'
})
export class VisitService {
    
    // 1. Guarda la visita actual
    async registerVisit(): Promise<void> {
        try {
        await addDoc(collection(db, 'visitas'), {
            date: Timestamp.now()
        });
        } catch (error) {
        console.error('Error en el radar de visitas:', error);
        }
    }

    // 2. Trae la base de datos y calcula las estadísticas
    async getVisitStats() {
        try {
        const snapshot = await getDocs(collection(db, 'visitas'));
        const now = new Date();
        
        let today = 0;
        let thisWeek = 0;
        let thisMonth = 0;
        let thisYear = 0;

        // Calculamos el inicio de esta semana (Domingo)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        snapshot.forEach(doc => {
            // Convertimos el Timestamp de Firebase a una Fecha de JavaScript
            const visitDate = doc.data()['date'].toDate();
            
            // Filtros
            if (visitDate.toDateString() === now.toDateString()) {
                today++;
            }
            if (visitDate >= startOfWeek) {
                thisWeek++;
            }
            if (visitDate.getMonth() === now.getMonth() && visitDate.getFullYear() === now.getFullYear()) {
                thisMonth++;
            }
            if (visitDate.getFullYear() === now.getFullYear()) {
                thisYear++;
            }
        });

        return { today, thisWeek, thisMonth, thisYear };
        } catch (error) {
            console.error('Error calculando estadísticas:', error);
            return { today: 0, thisWeek: 0, thisMonth: 0, thisYear: 0 };
        }
    }
}
