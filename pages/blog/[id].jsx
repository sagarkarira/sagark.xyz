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
  Tag,
  Flex,
} from '@chakra-ui/react';
import RenderMarkdown from '../../components/render-markdown/index.jsx';
// import Image from 'next/image';
import dayjs from 'dayjs';
import { GlobalContext } from '../../components/globalState';

export default function Blog({ postData }) {
  const { mood } = React.useContext(GlobalContext);
  const cleanDate = dayjs(postData.createdAt).format('MMM DD');
  const pageMeta = {
    title: postData.title,
    description: postData.description,
  };
  return (
    <Layout pageMeta={pageMeta}>
      {postData.draft && (
        <Tag size="lg" colorScheme={mood} mb={8}>
          DRAFT
        </Tag>
      )}
      <Heading mb={5}>{postData.title}</Heading>
      <Flex justifyContent={'space-between'} flexDirection={['column', 'row']}>
        <Text>
          {cleanDate} • {postData.stats.text}
        </Text>
        <Box mt={[4, 2, 1, 0]}>
          {postData.tags &&
            postData.tags.map((tag, i) => (
              <Tag key={i} colorScheme={mood} size="sm" variant="solid" mr={2}>
                {tag}
              </Tag>
            ))}
        </Box>
      </Flex>
      <Box fontWeight="medium" mt={20}>
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
