import React from 'react';
import axios from 'axios';
import Layout from '../../components/layout/layout';
import MicroBlogPost from '../../components/micro-blog-post';
import { getPostById } from '../api/getPost/[postId]';

export default function MicroBlogPage({ post }) {
  // const [loading, setLoading] = React.useState(true);
  // const [post, setPost] = React.useState({});
  // React.useEffect(() => {
  //   (async () => {
  //     const response = await axios(`/api/getPost/${id}`);
  //     setLoading(false);
  //     setPost(response.data.data);
  //   })();
  // }, []);
  return (
    <Layout>
      <MicroBlogPost post={post} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const post = await getPostById(context.params.id);
  return { props: { post: JSON.parse(JSON.stringify(post)) } };
}
