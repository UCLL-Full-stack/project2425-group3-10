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
        <Card sx={{ Width:'20%' , marginBottom: 10}}>
            <CardMedia
                component="img"
                height="300"
                image={imageUrl}
                alt={`${game.name} cover`}
                sx={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />
        </Card>
    );
}

export default GameCard