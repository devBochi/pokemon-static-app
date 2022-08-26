
const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(id)) {
    favorites = favorites.filter(pokeId => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites',JSON.stringify(favorites))
}

const existsInFavorites = (id: number) => {
    if (typeof window !== "object") return false

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);

}

const pokemons = ():number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]')
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    toggleFavorite,
    existsInFavorites,
    pokemons
} 