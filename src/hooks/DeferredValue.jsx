import { useState, useDeferredValue } from 'react';
import SlowList from './SlowList';

function DeferredValue() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}

export default DeferredValue;