// theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
});

export default theme;
