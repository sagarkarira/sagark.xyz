import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../header';
import Footer from '../footer';

export default function Layout({ children }) {
  const title = 'sagark.xyz';
  return (
    <Box width="100%" maxW="850px" mx="auto" paddingX={[4, 10]}>
      <Flex direction="column">
        <Box>
          <Header title={title} />
        </Box>
        <Box minH={'50vh'} mb={'200px'}>
          {children}
        </Box>
        <Footer title={title} />
      </Flex>
    </Box>
  );
}
