import React from 'react';
import Layout from '../../components/layout/layout';
import { getAllPostIds, getPostData } from '../../libs/posts';
import {
  Heading,
  Text,
  Box,
  Link,
  Image,
  Code,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Alert,
  AlertDescription,
  Center,
} from '@chakra-ui/react';
import RenderMarkdown from '../../components/render-markdown/index.jsx';
// import Image from 'next/image';
import dayjs from 'dayjs';

export default function Blog({ postData }) {
  const cleanDate = dayjs(postData.createdAt).format('DD MMM YYYY');

  return (
    <Layout>
      <Heading mb={5}>{postData.title}</Heading>
      <Text mb={20}>
        {cleanDate} • {postData.stats.text}
      </Text>
      <Box fontWeight="medium">
        <RenderMarkdown>{postData.content}</RenderMarkdown>
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds('posts/blog');
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData('posts/blog', params.id);
  return {
    props: {
      postData,
    },
  };
}
