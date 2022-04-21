import React, { createContext, useEffect, useState } from 'react';
import { useColorMode } from '@chakra-ui/react';

const initState = {
  theme: 'dark',
  mood: 'red',
  pFont: 'Open Sans',
  sFont: 'Open Sans',
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = (props) => {
  const [state, setState] = useState(initState);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const localStorageState = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state'))
      : undefined;
    if (localStorageState) {
      setState(localStorageState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  const { theme, mood } = state;

  const toggleMood = () => {
    if (mood === 'blue') {
      setState({ ...state, mood: 'red' });
    }
    if (mood === 'red') {
      setState({ ...state, mood: 'green' });
    }
    if (mood === 'green') {
      setState({ ...state, mood: 'teal' });
    }
    if (mood === 'teal') {
      setState({ ...state, mood: 'orange' });
    }
    if (mood === 'orange') {
      setState({ ...state, mood: 'cyan' });
    }
    if (mood === 'cyan') {
      setState({ ...state, mood: 'purple' });
    }
    if (mood === 'purple') {
      setState({ ...state, mood: 'gray' });
    }
    if (mood === 'gray') {
      setState({ ...state, mood: 'blue' });
    }
  };
  const toggleTheme = () => {
    setState({ ...state, theme: colorMode === 'light' ? 'dark' : 'light' });
    toggleColorMode();
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        toggleTheme,
        toggleMood,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
