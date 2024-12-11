import {Activity, Game} from "@/types";

const getActivitiesFromGame = async (game: Game): Promise<Activity[]> => {
    // Mocking data for now
    return [
        {
            id: 1,
            name: "Treasure Hunt",
            description: "Find hidden treasures scattered across the map.",
            type: "Adventure",
        },
        {
            id: 2,
            name: "Battle Royale",
            description: "Compete against other players to be the last one standing.",
            type: "Combat",
        },
        {
            id: 3,
            name: "Puzzle Challenge",
            description: "Solve intricate puzzles to earn rewards.",
            type: "Puzzle",
        },
    ];
};
export default {getActivitiesFromGame};