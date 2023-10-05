import { memo, useDeferredValue } from 'react';
import PropTypes from 'prop-types';

const SlowList = memo(function SlowList({ text }) {

  let items = [];
  for (let i = 0; i < 500; i++) {
    // Use useDeferredValue para adiar a renderização do valor no texto
    const deferredText = useDeferredValue(text, { timeoutMs: 500 });
    //console.log(deferredText)
    items.push(<SlowItem key={i} text={deferredText} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

SlowList.propTypes = {
  text: PropTypes.string.isRequired,
};


function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}

export default SlowList;
