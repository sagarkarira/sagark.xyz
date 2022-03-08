import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { getSortedPostsData } from '../../libs/posts';
import Layout from '../../components/layout/layout.jsx';
import { Heading, Text, Box, VStack, Link, Flex, Code } from '@chakra-ui/react';
import { GlobalContext } from '../../components/globalState';

export default function BlogList({ allPostsData }) {
  const { mood, pFont, sFont } = React.useContext(GlobalContext);
  return (
    <Layout>
      <Heading mb={[6, 12, 16, 20]}>Latest Posts</Heading>
      <VStack spacing={6} align="stretch">
        {allPostsData.map(({ id, date, title }, i) => (
          <Flex
            key={i}
            justifyContent={'flex-start'}
            flexWrap="wrap"
            gap={[4, 6, 8, 10]}
          >
            <Box>
              <Code colorScheme={mood}>{date} </Code>
            </Box>
            <Box>
              <NextLink href={'blog/' + id}>
                <Text fontWeight="semibold">
                  <Link>{title}</Link>
                </Text>
              </NextLink>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData('posts/blog');
  return {
    props: { allPostsData },
  };
}
