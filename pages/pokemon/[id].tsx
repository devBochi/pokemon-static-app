import { useState } from "react"

import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react"
import { GetStaticPaths, GetStaticProps } from "next"

import confetti from 'canvas-confetti';

import { pokeApi } from "../../api"
import { Layout } from "../../components/layouts"
import { Pokemon } from '../../interfaces';
import { localFavorites } from "../../utils"
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
    pokemon: Pokemon
}

export const PokemonPage = ({pokemon}:Props) => {
    
  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existsInFavorites(pokemon.id))

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{padding: '30px'}}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
            <Container display="flex" direction="row" alignItems="center">
                  <Text transform="capitalize" h1>{pokemon.name}</Text>
                  <Button
                    color="gradient"
                    ghost={!isInFavorites}
                    onPress={onToggleFavorite}
                  >
                    {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos' }
                  </Button>
                </Container>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display="flex" gap={0} >
                <Image 
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map( (value,index) => `${index + 1}`)
  
  return {
    paths: pokemons151.map( id => ({
      params: {id}
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
 
  const {id} = params as {id: string};

  const pokemon = await getPokemonInfo(id)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400
  }
}