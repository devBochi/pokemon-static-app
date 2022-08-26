import React, { FC } from 'react'
import { Card, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Props {
    pokemonId: number;
    key: number;
}

export const FavoritePokemonCard = ({pokemonId,key}:Props) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/pokemon/${pokemonId}`)
    }
    
    return (
    <Grid xs={6} sm={3} md={2} xl={1} key={key}>
        <Card isHoverable isPressable css={{padding: 10}} onClick={handleClick}>
            <Card.Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                alt='favoPokemon'
                width={'100%'}
                height={140}
            />  
        </Card>
    </Grid>
  )
}
