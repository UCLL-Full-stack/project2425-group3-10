// GameCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Game } from '@/types';
import img from '@/components/9KZm2AH.png'

type Props= {
    game:Game
}

const GameCard: React.FC<Props> = ({game}: Props) =>{
    const imageUrl = `data:image/png;base64,${game.logo}`
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', marginBottom: 2 }}>
            <CardMedia
                component="img"
                height="300"
                image={imageUrl}
                alt={`${game.name} cover`}
                sx={{
                    objectFit: 'cover', // This ensures the image fully covers the area without distortion
                    objectPosition: 'center', // This centers the image within the CardMedia component
                }}
            />
        </Card>
    );
}

export default GameCard