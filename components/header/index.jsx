import React from 'react';
import NextLink from 'next/link';
import { GlobalContext } from '../globalState';
import {
  Heading,
  Text,
  Box,
  VStack,
  Link,
  Flex,
  Icon,
  CreateIcon,
} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';

import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

export default function Header({ title }) {
  const { theme, toggleTheme, mood, toggleMood, pFont } =
    React.useContext(GlobalContext);

  const color = theme === 'dark' ? 'gray.300' : 'gray.700';

  return (
    <>
      <Flex
        className="header"
        justifyContent={[
          'center',
          'space-between',
          'space-between',
          'space-between',
        ]}
        mt={10}
        mb={[16, 24, 24, 36]}
        flexWrap="wrap"
        direction={['row']}
        fontFamily={pFont}
      >
        <NextLink href="/">
          <Box className="title">
            <Button
              color={color}
              variant="link"
              fontSize={24}
              mb={[4, 0, 0, 0]}
            >
              {title}
            </Button>
          </Box>
        </NextLink>
        <Flex
          className="links"
          justifyContent={['flex-end']}
          direction={['row']}
          fontSize={'18px'}
        >
          <NextLink href="/">
            <Button
              color={color}
              colorScheme={mood}
              variant="ghost"
              size="sm"
              fontSize="16px"
            >
              Home
            </Button>
          </NextLink>
          <NextLink href="/blog">
            <Button
              color={color}
              colorScheme={mood}
              variant="ghost"
              size="sm"
              fontSize="16px"
            >
              Blog
            </Button>
          </NextLink>
          <NextLink href="/about">
            <Button
              color={color}
              colorScheme={mood}
              variant="ghost"
              size="sm"
              fontSize="16px"
            >
              About
            </Button>
          </NextLink>

          <Button size="sm" variant="ghost" onClick={toggleMood}>
            <CircleIcon boxSize={6} color={mood + '.500'} />
          </Button>
          <Button size="sm" variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <SunIcon boxSize={6} />
            ) : (
              <MoonIcon boxSize={6} />
            )}
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
