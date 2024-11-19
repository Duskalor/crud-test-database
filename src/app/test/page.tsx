import TablePokemon from "./pokemon";

const URL = "https://pokeapi.co/api/v2/pokemon?limit=100";
const page = async () => {
  const {results} = await fetch(URL).then((res) => res.json());
  const urlPokemon = results.map((pokemon: {url: string}) =>
    fetch(pokemon.url).then((response) => response.json()),
  );

  const pokemons = await Promise.all(urlPokemon);

  return (
    <div className="dark">
      <TablePokemon pokemons={pokemons} />
    </div>
  );
};

export default page;
