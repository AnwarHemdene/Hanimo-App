export interface User {
    id:string;
    email: string;
    password: string;
    nom:string;
    prenom:string;
    connectionType: string;
    numTel: string;
    imageUrl: string;
    habiter: string;
    naissanceDate: string;
    sexe: string;
    displayName: string;
    fistConnection: boolean;
    reputation: number;
    currentPositionLat : string;
    currentPositionLng : string;
}