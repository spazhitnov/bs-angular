export interface Course {
    id: string;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}