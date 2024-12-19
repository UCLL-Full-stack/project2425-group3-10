type Genre = 'FPS' | 'RPG' | 'MMO' | 'INDIE'


export type Game = {
    id: number;
    genre: Genre;
    name: string;
    logo: string
}

export type Activity = {
    id: number;
    name: string;
    description: string;
    type: string;
}

export type User = {
    id: number;
    email: string;
    password: string;
    role: string
}

export type Login = {
    email: string;
    password: string;
}

export type Profile = {
    user: User;
    username: string;
}

export type CardType = {
    title: string;
    genre: string;
    imgUrl: string;
    // color: string;
};

export type Group = {
    id: number
    name: string;
    maxPlayers: number
    currentPlayers: number
}
