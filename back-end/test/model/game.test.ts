import { Game } from "../../domain/model/game";
import { Genre } from "../../types";
import { ImageLinks } from '../../util/ImageLinks';



const validGame = {
    id: 1,
    name: 'Destiny 2',
    genre: 'FPS' as Genre,
    logo: Buffer.from(ImageLinks.DESTINY2_BASE64_LOGO || '', 'base64')
};

test('given valid values for a game, when: game is created, then: game is created with those values', () => {
    const gameInstance = new Game({
        id: validGame.id,
        name: validGame.name,
        genre: validGame.genre,
        logo: validGame.logo
    });

    expect(gameInstance.getId()).toEqual(validGame.id);
    expect(gameInstance.getName()).toEqual(validGame.name);
    expect(gameInstance.getGenre()).toEqual(validGame.genre);
    expect(gameInstance.getLogo()).toEqual(validGame.logo.toString('base64'));
});

test('given empty game name, when: game is created, then: it throws error', () => {
    expect(() => {
        new Game({
            id: validGame.id,
            name: '',
            genre: validGame.genre,
            logo: validGame.logo
        });
    }).toThrow('Game name cannot be empty.');
});

test('given game name with only spaces, when: game is created, then: it throws error', () => {
    expect(() => {
        new Game({
            id: validGame.id,
            name: '   ',
            genre: validGame.genre,
            logo: validGame.logo
        });
    }).toThrow('Game name cannot be empty.');
});

test('given valid logo as buffer, when: game is created, then: logo is converted to base64 string', () => {
    const gameInstance = new Game({
        id: validGame.id,
        name: validGame.name,
        genre: validGame.genre,
        logo: validGame.logo
    });

    expect(gameInstance.getLogo()).toEqual(validGame.logo.toString('base64'));
});

test('given two games with same id and name, when: they are compared, then: they are equal', () => {
    const game1 = new Game({
        id: validGame.id,
        name: validGame.name,
        genre: validGame.genre,
        logo: validGame.logo
    });

    const game2 = new Game({
        id: validGame.id,
        name: validGame.name,
        genre: 'Sandbox' as Genre,
        logo: Buffer.from(ImageLinks.BO6_BASE64_LOGO, 'base64')
    });

    expect(game1.equal(game2)).toBe(true);
});

test('given two games with different id or name, when: they are compared, then: they are not equal', () => {
    const game1 = new Game({
        id: validGame.id,
        name: validGame.name,
        genre: validGame.genre,
        logo: validGame.logo
    });

    const game2 = new Game({
        id: 2,
        name: 'Different Game',
        genre: validGame.genre,
        logo: validGame.logo
    });

    expect(game1.equal(game2)).toBe(false);
});
