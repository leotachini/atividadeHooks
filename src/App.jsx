import  { createContext, useContext, useState, useMemo} from "react";
import "./App.css";
import Gerador from "./hooks/Gerador";
import Component from "./hooks/DeferredValue";
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
    return list.filter(item => item.includes(inputValue));
  }, [list, inputValue]);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleAddItem = () => {
    setList([...list, inputValue]);
    setInputValue("");
  };

 

//useContext para mudar o tema da aplicação

  return (
    <ThemeContext.Provider value={theme}>

      <div className={`App ${theme}`} >

        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          Use dark mode
        </label>

        <Gerador/>

        <h4>UseTransition</h4>

        <Transition />

        <h4>UseMemo</h4>

        <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a value"
      />

      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {filteredList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

        <h4>UseDeferredValue</h4>

        <Component />

        <Panel />
      
      </div>
    </ThemeContext.Provider>
  );
        }

function Panel() {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}></section>
  );
}

export default App;