type Role = 'admin' | 'user';
type Genre = 'FPS' | 'RPG' | 'MMO' | 'INDIE'
type TypeOfActivity = 'PVP'|'PVE'| 'C-OOP'

type Activity = {
    name: string;
    id: number;
    type: string;
    gameId: number | null; // Ensure this property exists
};

export { Role, Genre, TypeOfActivity, Activity };

