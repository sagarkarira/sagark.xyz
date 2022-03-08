import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { GlobalProvider } from '../components/globalState';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ChakraProvider>
  );
}
