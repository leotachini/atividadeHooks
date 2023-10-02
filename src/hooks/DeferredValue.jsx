import { useState, useDeferredValue } from 'react';
import SlowList from './SlowList';

//useDeferredValue para atrasar a renderização de um componente

function DeferredValue() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text, { timeoutMs: 2000 });



  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}

export default DeferredValue;