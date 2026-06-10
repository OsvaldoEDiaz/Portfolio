import { Service } from '@angular/core';

import { Injectable } from '@angular/core';
import { ContactMessage, CvDownload } from '../models/contact';
import { environment } from '../../environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    async saveContactMessage(data: Omit<ContactMessage, 'id' | 'date'>): Promise<void> {
        try {
        await addDoc(collection(db, 'contacts'), {
            ...data,
            date: Timestamp.now()
        });
        } catch (error) {
        console.error('Error saving contact:', error);
        throw error;
        }
    }

    async saveCvDownload(data: Omit<CvDownload, 'id' | 'date'>): Promise<void> {
        try {
        await addDoc(collection(db, 'cv_downloads'), {
            ...data,
            date: Timestamp.now()
        });
        } catch (error) {
        console.error('Error saving CV download:', error);
        throw error;
        }
    }
}
