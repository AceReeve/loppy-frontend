"use client";
import { pokemonApi } from "@repo/redux-utils";

const { useGetPokemonsQuery } = pokemonApi;

function Pokemon() {
  const { data, isLoading, isError, isSuccess } = useGetPokemonsQuery();

  return (
    <div>
      <h1>Web</h1>
      {isLoading ? <h3>Loading pokemons...</h3> : null}
      {isError ? <h3>Could not load pokemons</h3> : null}

      {isSuccess ? (
        <code className="m-2 block max-w-lg rounded-md bg-blue-800 p-2 font-mono text-sm text-white">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      ) : null}
    </div>
  );
}

export default Pokemon;
