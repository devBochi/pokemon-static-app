import { Card, Grid } from '@nextui-org/react'
import { FavoritePokemonCard } from './'
import React, { FC } from 'react'

interface Props {
  pokemons: number[]
}

export const FavoritePokemons = ({pokemons}:Props) => {

  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
              {
                pokemons.map( pokemonId => <FavoritePokemonCard pokemonId={pokemonId} key={pokemonId}/>  )
              }
    </Grid.Container>
  )
}
