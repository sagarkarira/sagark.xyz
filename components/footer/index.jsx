import React from 'react';
import NextLink from 'next/link';
import { Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGithub,
  faStackOverflow,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer({ title }) {
  return (
    <>
      <Box>
        <Box>© {title}</Box>
        <NextLink href="https://twitter.com/ekrysis">
          <FontAwesomeIcon icon={faTwitter} />
        </NextLink>
        <NextLink href="https://github.com/sagarkarira">
          <FontAwesomeIcon icon={faGithub} />
        </NextLink>
        <NextLink href="https://stackoverflow.com/users/2706832/sagar-karira">
          <FontAwesomeIcon icon={faStackOverflow} />
        </NextLink>
        <NextLink href="https://www.linkedin.com/in/sagar-k-0b354162/">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </NextLink>
      </Box>
    </>
  );
}
