import React, { createContext, useState } from 'react';
import { useColorMode } from '@chakra-ui/react';

const state = {
  theme: 'dark',
  mood: 'red',
  pFont: 'Open Sans',
  sFont: 'Open Sans',
};

export const GlobalContext = createContext(state);

export const GlobalProvider = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mood, setMood] = useState('blue');
  const toggleMood = () => {
    if (mood === 'blue') {
      setMood('red');
    }
    if (mood === 'red') {
      setMood('green');
    }
    if (mood === 'green') {
      setMood('teal');
    }
    if (mood === 'teal') {
      setMood('orange');
    }
    if (mood === 'orange') {
      setMood('cyan');
    }
    if (mood === 'cyan') {
      setMood('purple');
    }
    if (mood === 'purple') {
      setMood('gray');
    }
    if (mood === 'gray') {
      setMood('blue');
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        theme: colorMode,
        mood,
        toggleTheme: toggleColorMode,
        toggleMood,
        pFont: state.pFont,
        sFont: state.sFont,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
