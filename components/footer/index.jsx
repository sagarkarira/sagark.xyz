import React from 'react';
import NextLink from 'next/link';
import { Box, Center, Link, Button, Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGithub,
  faStackOverflow,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { GlobalContext } from '../globalState';

const links = [
  {
    url: 'https://twitter.com/_sagark',
    icon: faTwitter,
    title: 'Twitter',
  },
  {
    url: 'https://github.com/sagarkarira',
    icon: faGithub,
    title: 'Github',
  },
  {
    url: 'https://stackoverflow.com/users/2706832/sagar-karira',
    icon: faStackOverflow,
    title: 'Stack Overflow',
  },
  {
    url: 'https://www.linkedin.com/in/sagar-k-0b354162/',
    icon: faLinkedinIn,
    title: 'LinkedIn',
  },
];

export default function Footer({ title }) {
  const { mood } = React.useContext(GlobalContext);
  const [over, setOver] = React.useState(false);
  const [number, setNumber] = React.useState(-1);
  return (
    <Flex justifyContent={'space-between'} mb={10}>
      <Box>
        Made{' '}
        {/* <NextLink href="/about">
          <Link>Sagar Karira</Link>
        </NextLink>{' '} */}
        with ❤️
      </Box>
      <Flex>
        {links.map((link, i) => (
          <Box
            margin={'auto'}
            key={i}
            mr={4}
            _hover={{ cursor: 'pointer' }}
            onMouseOver={() => {
              setOver(true);
              setNumber(i);
            }}
            onMouseLeave={() => {
              setOver(false);
              setNumber(-1);
            }}
          >
            <Link href={link.url} title={link.title}>
              <FontAwesomeIcon
                title={link.title}
                width={16}
                icon={link.icon}
                style={over & (i === number) ? { color: 'grey' } : {}}
              />
            </Link>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
