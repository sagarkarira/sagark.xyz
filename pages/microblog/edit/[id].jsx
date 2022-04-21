import React from 'react';
import axios from 'axios';
import MicroBlogPost from '../../../components/micro-blog-post';
import { Box, Text, Textarea, Input } from '@chakra-ui/react';
import Layout from '../../../components/layout/layout';
import { getPostById } from '../../api/getPost/[postId]';

export default function MicroBlogEditor({ iPost }) {
  const [post, setPost] = React.useState(iPost);
  const [key, setKey] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [submitAvail, setSubmitAvail] = React.useState(true);

  const handleChange = (event) => {
    setStatus('Editing');
    if (event.target.name === 'content') {
      setPost(Object.assign({ ...post }, { content: event.target.value }));
    }
    if (event.target.name === 'tags') {
      setPost(Object.assign({ ...post }, { tags: event.target.value }));
    }
    if (event.target.name === 'title') {
      setPost(Object.assign({ ...post }, { title: event.target.value }));
    }
    if (event.target.name === 'key') {
      setKey(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    setSubmitAvail(false);
    try {
      const response = await axios.post(`/api/editPost`, {
        ...post,
        key,
      });
      const newPost = await axios.get(`/api/getPost/${post._id.toString()}`);
      setPost(JSON.parse(JSON.stringify(newPost.data.data)));
      setStatus(response.data.message);
      setSubmitAvail(true);
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong');
      setSubmitAvail(true);
    }
  };
  return (
    <Layout>
      <Text fontSize={'2xl'} marginBottom="10">
        MicroBlog Editor
      </Text>
      <MicroBlogPost post={post} />
      <Box>
        <Text>Post:</Text>
        <Textarea
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
        />
        <Text>Title: </Text>
        <Input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <Text>Tags: </Text>
        <Input
          type="text"
          name="tags"
          value={post.tags}
          onChange={handleChange}
        />
        <Text>Key</Text>
        <Input
          type="text"
          name="key"
          value={post.key}
          onChange={handleChange}
        />
        <br />
        Submit:
        {submitAvail && (
          <Input type="submit" value="Submit" onClick={handleSubmit} />
        )}
        Status: {status ? <div>{status}</div> : <div></div>}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const post = await getPostById(context.params.id);
  return { props: { iPost: JSON.parse(JSON.stringify(post)) } };
}
