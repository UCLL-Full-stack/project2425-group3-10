export type Role = 'admin' | 'user';
export type Genre = 'FPS' | 'RPG' | 'MMO' | 'INDIE'
export type TypeOfActivity = 'PVP'|'PVE'| 'C-OOP'

export type UserInput = {
    id?: number;
    password?: string
    email?: string
    role? : string
}

export type Activity = {
    name: string;
    id: number;
    type: string;
    gameId: number | null; // Ensure this property exists
};


