import React from 'react';

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);
//o useMedia é um custom hook que retorna verdadeiro ou falso dependendo do tamanho da tela
  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    changeMatch();
    window.addEventListener('resize', changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);

  return match;
};

export default useMedia;
