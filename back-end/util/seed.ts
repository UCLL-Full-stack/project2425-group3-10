import { database } from './db.server';
import { ImageLinks } from './ImageLinks';

async function main() {

    await database.profileAchievement.deleteMany();
    await database.profileGames.deleteMany();
    await database.group.deleteMany();
    await database.activity.deleteMany();
    await database.achievement.deleteMany();
    await database.game.deleteMany();
    await database.profile.deleteMany();
    await database.user.deleteMany();

    const users = [
        {
            email: 'Pepe@example.com',
            password: 'password1',
            role: 'USER',
            profile: {
                create: {
                    username: 'UserOne',
                    pfp: 'user1_pfp.png',
                    achievements: {
                        create: [
                            {
                                achievement: {
                                    create: {
                                        name: 'First Win',
                                        description: 'Awarded for the first victory.'
                                    }
                                },
                                earned: true,
                                achievedDate: new Date(),
                            },
                        ],
                    },
                    games: {
                        create: [
                            {
                                game: {
                                    create: {
                                        name: 'Destiny 2',
                                        genre: 'FPS',
                                        logo: Buffer.from(ImageLinks.DESTINY2_BASE64_LOGO || '', 'base64'),  // Added logo field
                                        activities: {
                                            create: [
                                                {
                                                    name: 'KingsFall',
                                                    genre: 'PVE',
                                                    groups: {
                                                        create: {
                                                            name: 'Group One',
                                                            maxPlayers: 6,
                                                            currentPlayer: 5,
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        },
        {
            email: 'ValorantE2@example.com',
            password: 'password2',
            role: 'ADMIN',
            profile: {
                create: {
                    username: 'AdminUser',
                    pfp: 'admin_pfp.png',
                    achievements: {
                        create: [
                            {
                                achievement: {
                                    create: {
                                        name: 'Master Admin',
                                        description: 'Awarded for reaching admin level.'
                                    }
                                },
                                earned: true,
                                achievedDate: new Date(),
                            },
                        ],
                    },
                    games: {
                        create: [
                            {
                                game: {
                                    create: {
                                        name: 'BLACK OPS 6',
                                        genre: 'FPS',
                                        logo: Buffer.from(ImageLinks.BO6_BASE64_LOGO, 'base64'),  // Added logo field
                                        activities: {
                                            create: [
                                                {
                                                    name: 'Zombies',
                                                    genre: 'PVE',
                                                    groups: {
                                                        create: {
                                                            name: 'Easteregg',
                                                            maxPlayers: 4,
                                                            currentPlayer: 3,
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    ];

    // Loop over the users array to create users and their relations in the database
    for (const user of users) {
        await database.user.create({
            data: user,
        });
    }

    // Additional Game Data - Valorant with base64 logo
    const games = [
        {
            name: 'Valorant',
            genre: 'FPS',
            logo: Buffer.from(ImageLinks.VALORANT_BASE64_LOGO, 'base64'),
            activities: {
                create: [
                    {
                        name: 'Ranked Match',
                        genre: 'Competitive',
                        groups: {
                            create: {
                                name: 'Competitive Group',
                                maxPlayers: 10,
                                currentPlayer: 10,
                            }
                        }
                    }
                ]
            }
        }
    ];

    // Loop over the games array to create games in the database
    for (const game of games) {
        await database.game.create({
            data: game,
        });
    }

    console.log('Seed data has been successfully created');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await database.$disconnect();
    });