import { PrismaClient } from '@prisma/client';
import { ImageLinks } from './ImageLinks';
import bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.activity.deleteMany();
    await prisma.game.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.group.deleteMany();

    // Create users
    const users = [
        { email: 'user1@example.com', password: await bcrypt.hash("password1", 12), role: 'USER' },
        { email: 'user2@example.com', password: await bcrypt.hash("password2", 12), role: 'ADMIN' },
        { email: 'user3@example.com', password: await bcrypt.hash("password3", 12), role: 'USER' },
    ];

    const createdUsers = [];
    for (const user of users) {
        const createdUser = await prisma.user.create({
            data: user,
        });
        createdUsers.push(createdUser);
    }

    // Create games
    const games = [
        { name: 'Destiny 2', genre: 'FPS', logo: Buffer.from(ImageLinks.DESTINY2_BASE64_LOGO || '', 'base64') },
        { name: 'Valorant', genre: 'FPS', logo: Buffer.from(ImageLinks.VALORANT_BASE64_LOGO || '', 'base64') },
        { name: 'Minecraft', genre: 'Sandbox', logo: Buffer.from(ImageLinks.BO6_BASE64_LOGO || '', 'base64') },
    ];

    const createdGames = [];
    for (const game of games) {
        const createdGame = await prisma.game.create({
            data: game,
        });
        createdGames.push(createdGame);
    }

    console.log('Seed data created: Users and Games');

    // Create Activities for each game
    const activitiesData = [
        { gameName: 'Destiny 2', activities: [{ name: 'Nightfall Raid', type: 'PvE' }, { name: 'Crucible Match', type: 'PvP' }] },
        { gameName: 'Valorant', activities: [{ name: 'Competitive Match', type: 'Ranked' }, { name: 'Spike Rush', type: 'Casual' }] },
        { gameName: 'Minecraft', activities: [{ name: 'Survival Mode', type: 'Adventure' }, { name: 'Creative Building', type: 'Sandbox' }] }
    ];

    for (const gameData of activitiesData) {
        const game = createdGames.find(g => g.name === gameData.gameName);
        if (game) {
            for (const activity of gameData.activities) {
                const existingActivity = await prisma.activity.findFirst({
                    where: {
                        name: activity.name,
                        game: { id: game.id }  // Fix here: using the `game` relation
                    },
                });

                if (!existingActivity) {
                    await prisma.activity.create({
                        data: {
                            name: activity.name,
                            type: activity.type,
                            game: { connect: { id: game.id } }
                        }
                    });
                } else {
                    console.log(`Activity "${activity.name}" already exists for game "${game.name}"`);
                }
            }
        }
    }

    console.log('Activities have been added to games');

    // Create profiles for users
    const profiles = [
        { username: 'PlayerOne', pfp: Buffer.from(''), userId: createdUsers[0].id, games: [createdGames[0], createdGames[1]] },
        { username: 'AdminUser', pfp: Buffer.from(''), userId: createdUsers[1].id, games: [createdGames[1], createdGames[2]] },
        { username: 'CasualGamer', pfp: Buffer.from(''), userId: createdUsers[2].id, games: [createdGames[0], createdGames[2]] },
    ];

    for (const profile of profiles) {
        const profileGames = profile.games.map(game => ({
            game: { connect: { id: game.id } }
        }));

        await prisma.profile.create({
            data: {
                username: profile.username,
                pfp: profile.pfp,
                user: { connect: { id: profile.userId } },
                games: {
                    create: profileGames,
                },
            },
        });
    }

    console.log('Profiles have been added for users');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
