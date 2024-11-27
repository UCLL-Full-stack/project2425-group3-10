type Genre = 'FPS' | 'RPG' | 'MMO' | 'INDIE'


export type Game = {
    id: number;
    genre: Genre;
    name: string;
    logo: string
}

export type CardType = {
    title: string;
    genre: string;
    imgUrl: string;
    // color: string;
};
