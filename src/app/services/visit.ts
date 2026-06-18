import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);

@Injectable({
    providedIn: 'root'
})
export class VisitService {
    
    async registerVisit(): Promise<void> {
        try {
        await addDoc(collection(db, 'visitas'), {
            date: Timestamp.now()
        });
        } catch (error) {
        console.error('Error en el radar de visitas:', error);
        }
    }

    async getVisitStats() {
        try {
        const snapshot = await getDocs(collection(db, 'visitas'));
        const now = new Date();
        
        let total = 0;
        let today = 0;
        let thisWeek = 0;
        let thisMonth = 0;
        let thisYear = 0;

        // Calculamos el inicio de la semana estricto (Domingo a las 00:00:00 local)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        snapshot.forEach(doc => {
            const data = doc.data();
            let visitDate: Date;

            // Filtro de blindaje: soporta datos de pruebas viejas y los nuevos Timestamps
            if (data['date'] && data['date'].toDate) {
            visitDate = data['date'].toDate();
            } else if (data['timestamp']) {
            visitDate = new Date(data['timestamp']);
            } else {
            return; // Saltea cualquier registro roto en la base de datos
            }

            // 1. Contador Global
            total++;

            // 2. Filtros de Tiempo Exactos
            if (visitDate.getDate() === now.getDate() && 
                visitDate.getMonth() === now.getMonth() && 
                visitDate.getFullYear() === now.getFullYear()) {
            today++;
            }
            
            if (visitDate >= startOfWeek) {
            thisWeek++;
            }
            
            if (visitDate.getMonth() === now.getMonth() && 
                visitDate.getFullYear() === now.getFullYear()) {
            thisMonth++;
            }
            
            if (visitDate.getFullYear() === now.getFullYear()) {
            thisYear++;
            }
        });

        return { total, today, thisWeek, thisMonth, thisYear };
        } catch (error) {
        console.error('Error calculando estadísticas:', error);
        return { total: 0, today: 0, thisWeek: 0, thisMonth: 0, thisYear: 0 };
        }
    }
}