import { useState } from "react";
import { useTransition, animated } from 'react-spring';
import "./../../src/App.css";

function Transition() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const handleAddItem = () => {
    setItems([...items, text]);
    setText("");
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 2);
    setItems(newItems);
  };

  const transitions = useTransition(items, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 'auto' },
    leave: { opacity: 0, height: 0 },
    config: { tension: 220, friction: 20 }, // Adjust these values for the desired animation effect
  });

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
        {transitions((style, item, _, index) => (
          <animated.li
            key={index}
            style={style}
            className={`fade-in-entering`}
            onAnimationEnd={() => handleRemoveItem(index)}
          >
            {item}
          </animated.li>
        ))}
      </ul>
    </div>
  );
}

export default Transition;
