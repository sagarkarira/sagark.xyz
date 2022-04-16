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
  },
  {
    url: 'https://github.com/sagarkarira',
    icon: faGithub,
  },
  {
    url: 'https://stackoverflow.com/users/2706832/sagar-karira',
    icon: faStackOverflow,
  },
  {
    url: 'https://www.linkedin.com/in/sagar-k-0b354162/',
    icon: faLinkedinIn,
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
            minwidth={'60%'}
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
            <NextLink href={link.url}>
              <FontAwesomeIcon
                icon={link.icon}
                style={over & (i === number) ? { color: 'grey' } : {}}
              />
            </NextLink>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
