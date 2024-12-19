import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Game } from '@/types';

type Props = {
    game: Game;
};

const GameCard: React.FC<Props> = ({ game }: Props) => {
    const imageUrl = `data:image/png;base64,${game.logo}`;

    return (
        <Card
            sx={{
                width: 150, // Standard width
                height: 200, // Standard height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 3,
                overflow: 'hidden',
                backgroundColor: '#1e1e2f',
                borderRadius: '8px',
            }}
        >
            <CardMedia
                component="img"
                image={imageUrl}
                alt={`${game.name} cover`}
                sx={{
                    width: '80%', // Scaled to fit
                    height: '80%', // Scaled to fit
                    objectFit: 'contain', // Ensure the full image is visible without cropping
                    objectPosition: 'center',
                }}
            />
        </Card>
    );
};

export default GameCard;
