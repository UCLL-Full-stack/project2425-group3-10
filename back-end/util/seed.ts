import { PrismaClient } from '@prisma/client';
import { ImageLinks } from './ImageLinks';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.group.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const users = [
        {
            email: 'user1@example.com',
            password: 'password1',
            role: 'USER',
        },
        {
            email: 'user2@example.com',
            password: 'password2',
            role: 'ADMIN',
        },
        {
            email: 'user3@example.com',
            password: 'password3',
            role: 'USER',
        },
    ];

    for (const user of users) {
        await prisma.user.create({
            data: user,
        });
    }

    // Create games
    const games = [
        {
            name: 'Destiny 2',
            genre: 'FPS',
            logo: Buffer.from(ImageLinks.DESTINY2_BASE64_LOGO || '', 'base64'),
        },
        {
            name: 'Valorant',
            genre: 'FPS',
            logo: Buffer.from(ImageLinks.VALORANT_BASE64_LOGO || '', 'base64'),
        },
        {
            name: 'Minecraft',
            genre: 'Sandbox',
            logo: Buffer.from(ImageLinks.BO6_BASE64_LOGO || '', 'base64'),
        },
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
        {
            gameName: 'Destiny 2',
            activities: [
                { name: 'Nightfall Raid', type: 'PvE' },
                { name: 'Crucible Match', type: 'PvP' }
            ]
        },
        {
            gameName: 'Valorant',
            activities: [
                { name: 'Competitive Match', type: 'Ranked' },
                { name: 'Spike Rush', type: 'Casual' }
            ]
        },
        {
            gameName: 'Minecraft',
            activities: [
                { name: 'Survival Mode', type: 'Adventure' },
                { name: 'Creative Building', type: 'Sandbox' }
            ]
        }
    ];

    for (const gameData of activitiesData) {
        const game = createdGames.find(g => g.name === gameData.gameName);
        if (game) {
            for (const activity of gameData.activities) {
                await prisma.activity.create({
                    data: {
                        name: activity.name,
                        type: activity.type,
                        game: {
                            connect: { id: game.id }
                        }
                        // Prisma will auto-increment the `id` field
                    }
                });
            }
        }
    }

    console.log('Activities have been added to games');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
