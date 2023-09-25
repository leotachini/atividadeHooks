import { useState, useEffect, useCallback, useRef, useReducer} from "react";
import Loading from "../components/Helper/Loading";

const colors = {
  fire: "#E74C3C",
  grass: "#186A3B",
  electric: "#F4D03F",
  water: "#5DADE2",
  ground: "#AF601A",
  rock: "#6E2C00",
  fairy: "#FA4A95",
  poison: "#AF7AC5",
  bug: "lightgreen",
  dragon: "purple",
  psychic: "pink",
  flying: "steelblue",
  fighting: "#641E16 ",
  normal: "#b3b3b3",
  ghost: "#2B006E",
  ice: "skyblue",
  dark: "#212F3D",
  steel: "#85929E",
};

const Gerador = () => {
  //diversos useState

  const [show, setShow] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const intervalRef = useRef(null);

  //useReducer

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return {
          count: state.count + 1,
        }; // Retorna o novo valor do estado, que é um número
      default:
        throw new Error();
    }
  }

  //useCallback para mudar o id cada vez que o botão e selecionado e 
  //evitar que ocorra um bug ao se clicar no botão várias vezes

  const generatePokemonId = useCallback(() => {
    return Math.floor(Math.random() * 1010) + 1;
  }, [show]);

  function handleClick() {
    //useCallback
    generatePokemonId();
    //useRef
    handleStart();
    //useReducer
    handleButtonClick();
    //useState
    setShow(!show);
  }

  //useRef para armazenar o tempo que a aba foi aberta

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  //useReducer

  const [state, dispatch] = useReducer(reducer, { count: 1 });

  function handleButtonClick() {
    if(show){
    dispatch({ type: "increment" });
    }
  }

  //useEffect para chamar a API e controlar seus efeitos colaterais

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${generatePokemonId()}/`
        );
        const data = await response.json();
        if(show){
        setPokemon(data);
        console.log(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [generatePokemonId]);


  if (loading) return <Loading />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <button
        style={{
          borderRadius: "5px",
          padding: "10px",
          color: "white",
          backgroundColor: "steelblue",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Poke Aleatório
      </button>

      {show && (
        //useReducer para mostrar a quantidade de vezes que o botão foi clicado
        <h3>
          Quantidade de vezes que a aba foi aberta:
          {state.count}
        </h3>
      )}
      {show && <h3>Tempo com a aba aberta: {secondsPassed.toFixed(3)}</h3>}
      {show && <h1>#{pokemon.id}</h1>}
      {show && <h1 style={{ fontFamily: "revert" }}>{pokemon.name}</h1>}
      {show && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
      {show && <h2>Tipos</h2>}
      <ul style={{ textAlign: "center", marginRight: "35px" }}>
        {show &&
          pokemon.types.map((type, index) => (
            <li
              style={{
                backgroundColor: colors[type.type.name],
                listStyle: "none",
                display: "inline-block",
                borderRadius: "5px",
                padding: "5px",
              }}
              key={index}
            >
              {type.type.name + " "}
            </li>
          ))}
      </ul>
      {show && <h2>Habilidades</h2>}
      <ul style={{ padding: "5px" }}>
        {show &&
          pokemon.abilities.map((ability, index) => (
            <li
              style={{
                listStyle: "none",
                display: "block",
                backgroundColor: "white",
                color: "black",
                padding: "5px",
                border: "black 1px solid",
              }}
              key={index}
            >
              {ability.ability.name + " "}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Gerador;
