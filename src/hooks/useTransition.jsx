import { useState } from "react";
import "./../../src/App.css"; 

//useTransition para animar a entrada e saída de um componente, 
//no caso um <li> novo na lista

function Transition () {
    const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const handleAddItem = () => {
    setItems([...items, text]);
    setText("");
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter an item"
      />
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={`fade-in-entering`}
            onAnimationEnd={() => handleRemoveItem(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Transition ;