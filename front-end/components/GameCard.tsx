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
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', marginBottom: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={game.logo}
                alt={`${game.name} cover`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" >
                    {game.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default GameCard