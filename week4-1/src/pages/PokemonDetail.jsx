import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import LoopLoading from '../components/LoopLoading';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);
      } catch {
        setError('포켓몬 정보를 불러오지 못했습니다.');
      }
    };

    fetchPokemon();
  }, [name]);

  if (error) return <p>에러 발생했어요.. {error}</p>;
  if (!pokemon) return <LoopLoading />;


  return (
    <div style={{ padding: '2rem' }}>
      <Link to='/'>← 목록으로</Link>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        타입: {pokemon.types.map((typeObj) => typeObj.type.name).join(', ')}
      </p>
    </div>
  );
};

export default PokemonDetail;