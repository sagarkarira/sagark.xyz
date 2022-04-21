import React from 'react';
import Layout from '../../components/layout/layout';
import MicroBlogPost from '../../components/micro-blog-post';
import { getPostById } from '../api/getPost/[postId]';
import dayjs from 'dayjs';
import { Box, Text, keyframes, Span } from '@chakra-ui/react';

const blinker = keyframes`
50% {
  opacity: 0;
}
`;

export default function MicroBlogPage({ post }) {
  const cleanDate = dayjs(post.createdAt).format('MMM DD, YYYY');
  const title = post.title ? post.title : `Microblog Entry : ${cleanDate}`;
  const pageMeta = {
    title,
    description: post.content?.slice(0, 150),
  };
  console.log(pageMeta);
  // const [loading, setLoading] = React.useState(true);
  // const [post, setPost] = React.useState({});
  // React.useEffect(() => {
  //   (async () => {
  //     const response = await axios(`/api/getPost/${id}`);
  //     setLoading(false);
  //     setPost(response.data.data);
  //   })();
  // }, []);
  const blinkAnimation = `${blinker} 2s linear infinite`;
  return (
    <Layout pageMeta={pageMeta}>
      <Box width={['95%', '90%', '85%', '80%']}>
        <MicroBlogPost post={post} />
        <Text mt={4} fontSize="sm">
          <Text as={'span'} animation={blinkAnimation}>
            ▶
          </Text>{' '}
          {title}
        </Text>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const post = await getPostById(context.params.id);
  return { props: { post: JSON.parse(JSON.stringify(post)) } };
}
