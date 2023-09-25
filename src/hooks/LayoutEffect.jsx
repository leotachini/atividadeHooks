import { useState, useLayoutEffect, useRef } from "react";

function LayoutEffect() {
  const [height, setHeight] = useState(0);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      setHeight(containerHeight);
    }
  }, []);

//useLayoutEffect para medir a altura do elemento e informá-lo na 
//página

  return (
    <div>
      <h4>Medição de Altura com useLayoutEffect</h4>
      <div
        ref={containerRef}
        style={{ border: "1px solid black", padding: "10px" }}
      >
        Conteúdo de exemplo
      </div>
      <p>A altura do elemento é: {height}px</p>
    </div>
  );
}

export default LayoutEffect;
