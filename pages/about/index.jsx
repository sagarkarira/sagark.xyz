import React from 'react';
import Layout from '../../components/layout/layout';
import { getPostData } from '../../libs/posts';
import { Heading, Text, Box, Link } from '@chakra-ui/react';
import RenderMarkdown from '../../components/render-markdown/index.jsx';

export default function About({ postData }) {
  return (
    <Layout>
      <Heading mb={20}>{postData.title}</Heading>
      {/* <Text mb={20}>Date: {postData.date}</Text> */}
      <Box fontWeight="medium">
        <RenderMarkdown>{postData.content}</RenderMarkdown>
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
  const postData = await getPostData('posts/about', 'about');
  return {
    props: { postData },
  };
}
