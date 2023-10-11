import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
  useLayoutEffect
  
} from "react";

import useMedia from "./useMedia";

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
  fighting: "#641E16",
  normal: "#b3b3b3",
  ghost: "#2B006E",
  ice: "skyblue",
  dark: "#212F3D",
  steel: "#85929E",
};

//useState
const UseGenerator = () => {
  const [show, setShow] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);

  //useRef
  const intervalRef = useRef(null);
  //nesse caso o useRef é usado para armazenar o valor do intervalo de tempo

  //useMedia(custom hook)
  const isWide = useMedia("(min-width: 520px)");
  //o use media é um custom hook que retorna verdadeiro ou falso dependendo do tamanho da tela

  //useReducer
  function reducer(state, action) {
    switch (action.type) {
      //o use reducer permite criar varias "funções" com varios nome diferentes simplesmente usando um switch
      case "increment":
        return {
          count: state.count + 1,
        };
        case "decrement":
        return {
          count: state.count - 1,
        };
        case "double":
        return {
          count: state.count * 2,
        };
        case "half":
        return {
      count: state.count / 2,
        };
      default:
        throw new Error();
    }
  }

  //useReducer
  const [state, dispatch] = useReducer(reducer, { count: 1 });

  function handleButtonClick() {
    //caso o state show esteja positivo, o contador é incrementado 
    if (show) {
      dispatch({ type: "increment" });
    }
  }

  //customHook
  const [isOnline, setIsOnline] = useState(true);

  const handleOnline = () => {
    setIsOnline(!isOnline);
  };
  const handleOffline = () => {
    window.alert("Você precisa estar online para utilizar o site");
  };
  //caso o usuário esteja offline, não é possível clicar no botão

  const textStyle = {
    color: isOnline ? "green" : "red",
  };

  //useCallback
  const generatePokemonId = useCallback(() => {
    return Math.floor(Math.random() * 1010) + 1;
  }, [state]);
//A mudar o valor do state do useReducer, o useCallback é chamado novamente


  const handleClick = () => {
    //toggleOpen();
    //useCallback
    generatePokemonId();
    //useState
    setShow(!show);
    //useRef
    handleStart();
    //useReducer
    handleButtonClick();
  };

  //useRef
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


  //useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${generatePokemonId()}/`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } 
    };
    fetchData();
  }, [generatePokemonId]);

  //useRef dentro do useLayoutEffect
  const heightRef = useRef(null);

  //useLayoutEffect
  useLayoutEffect(() => {
    if (show) {
      const height = heightRef.current.scrollHeight;
      heightRef.current.style.maxHeight = `${height * 1.4}px`;
    } else {
      heightRef.current.style.maxHeight = "0";
    }
  }, [show]);

/*
  function toggleOpen() {
    setShow(!show);
  }
*/

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="container"
    >
      <h1 style={textStyle}>Status: {isOnline ? "Online" : "Offline"}</h1>
      <button onClick={handleOnline}>Toggle Online/Offline</button>
      <br />
      <button
        style={{
          borderRadius: "5px",
          padding: "10px",
          color: "white",
          backgroundColor: "steelblue",
          fontSize: "20px",
          cursor: "pointer",
        }}
        //CustomHook
        onClick={isOnline && isWide ? handleClick : handleOffline}
      >
        {isOnline && isWide
          ? "Poke Aleatório"
          : "Você está offline ou em uma tela estreita demais."}
      </button>

      <div ref={heightRef} className={`expandable-div ${show ? "open" : ""}`}>
        {show && (
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
            pokemon.types.map((item) => (
              <li
                style={{
                  listStyleType: "none",
                  backgroundColor: colors[item.type.name],
                  borderRadius: "5px",
                  padding: "5px",
                  margin: "5px",
                  color: "white",
                  fontWeight: "520",
                }}
                key={item.type.name}
              >
                {item.type.name}
              </li>
            ))}
        </ul>
        {show && <h2>Habilidades</h2>}
        <ul style={{ padding: "5px" }}>
          {show &&
            pokemon.abilities.map((item, index) => (
              <li
                style={{ listStyleType: "none", fontWeight: "600" }}
                key={index}
              >
                {item.ability.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UseGenerator;
