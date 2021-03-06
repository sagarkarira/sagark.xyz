import React from 'react';
import axios from 'axios';
import MicroBlogPost from '../../../components/micro-blog-post';
import { Box, Text, Textarea, Input, Flex } from '@chakra-ui/react';
import Layout from '../../../components/layout/layout';

const MicroBlogEditor = () => {
  const initPost = {
    name: 'sagark',
    content: 'write here',
    title: '',
    tags: '',
    createdAt: new Date(),
  };
  const [post, setPost] = React.useState(initPost);
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
      const response = await axios.post(`/api/addPost`, {
        ...post,
        key,
      });
      setPost(initPost);
      setStatus(response.data.message);
      setSubmitAvail(true);
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong');
      setSubmitAvail(true);
    }
  };
  return (
    <Box>
      <Layout maxWidth={'95%'}>
        <Text fontSize={'2xl'} marginBottom="10">
          MicroBlog Editor
        </Text>

        <Box maxWidth={'90%'} margin="auto">
          <Flex justifyContent={'space-between'}>
            <Box width={'45%'}>
              <MicroBlogPost post={post} />
            </Box>
            <Box width={'45%'}>
              <Text>Post:</Text>
              <Textarea
                minH={'400px'}
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
          </Flex>
        </Box>
      </Layout>
    </Box>
  );
};

export default MicroBlogEditor;
