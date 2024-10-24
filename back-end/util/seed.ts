import { PrismaClient } from '@prisma/client';
import { database } from './db.server';

async function main() {
    // Users with profiles
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
                                        name: 'Battle Arena',
                                        genre: 'Action',
                                        activities: {
                                            create: [
                                                {
                                                    name: 'Team Battle',
                                                    genre: 'PvP',
                                                    groups: {
                                                        create: {
                                                            name: 'Group One',
                                                            maxPlayers: 10,
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
                                        name: 'Puzzle World',
                                        genre: 'Puzzle',
                                        activities: {
                                            create: [
                                                {
                                                    name: 'Solo Puzzle',
                                                    genre: 'Single Player',
                                                    groups: {
                                                        create: {
                                                            name: 'Puzzle Group',
                                                            maxPlayers: 1,
                                                            currentPlayer: 1,
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

    // Additional Game Data
    const games = [
        {
            name: 'Adventure Quest',
            genre: 'RPG',
            activities: {
                create: [
                    {
                        name: 'Dungeon Raid',
                        genre: 'Co-op',
                        groups: {
                            create: {
                                name: 'Raiders Group',
                                maxPlayers: 20,
                                currentPlayer: 15,
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
