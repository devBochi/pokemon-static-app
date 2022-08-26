import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (parameter: string) => {

  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${parameter}`);

  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }
    return (
      pokemon
    )
}
