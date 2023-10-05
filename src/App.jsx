import { createContext, useContext, useState, useMemo } from "react";
import "./App.css";
import UseGenerator from "./hooks/UseGenerator";
//import Component from "./hooks/DeferredValue";
import Transition from "./hooks/useTransition";

const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  //useMemo que memoriza o valor de um input e o adiciona a uma lista

  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  const filteredList = useMemo(() => {
    console.log("Calculating filtered list...");
    return list.filter((item) => item.includes(inputValue));
  }, [list, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    setList([...list, inputValue]);
    setInputValue("");
  };

  document.body.classList.toggle("dark", theme === "dark");

  //useContext para mudar o tema da aplicação

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          Use dark mode
        </label>

        <UseGenerator />

        <h4>UseMemo</h4>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Insira um valor"
        />

        <button onClick={handleAddItem}>Add Item</button>

        <ul>
          {filteredList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h4>UseTransition & UseDeferredValue</h4>

        <Transition />

        <Panel />
      </div>
    </ThemeContext.Provider>
  );
}

function Panel() {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return <section className={className}></section>;
}

export default App;
