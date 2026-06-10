export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: Date;
}

export interface CvDownload {
    id?: string;
    email: string;
    name: string;
    date: Date;
}