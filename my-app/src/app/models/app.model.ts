export interface Course {
    id: string | string;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;
    authors?: Author[]
}

export interface Author {
    id: number;
    lastName: string;
    name: string;
}