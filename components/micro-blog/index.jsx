// @ts-check

import React from 'react';
import styles from './micro-blog.module.css';
import MicroBlogPost from '../micro-blog-post';
import axios from 'axios';
import { Spinner, Center, Box, Button } from '@chakra-ui/react';
import { GlobalContext } from '../globalState';

/**
 *
 * @param {Number} page
 */
const getLatestPosts = async (page) => {
  const response = await axios(`/api/getLatestPosts?page=${page}`);
  if (!response && !response.data) {
    throw new Error('Response does not exist');
  }
  return {
    posts: response.data.data.posts,
    totalPosts: response.data.data.totalPosts,
  };
};

export default function MicroBlog() {
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      const { posts, totalPosts } = await getLatestPosts(page);
      setPosts(posts);
      setTotalPosts(totalPosts);
      setLoading(false);
    })();
  }, []);

  const handleLoadMore = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postObj = await getLatestPosts(page + 1);
    const morePost = postObj.posts;
    setPage(page + 1);
    setPosts(posts.concat(morePost));
    setLoading(false);
  };
  const { mood } = React.useContext(GlobalContext);
  return (
    <Box maxWidth={'640px'} marginX="auto">
      {/* <h4 id={styles.microPostTitle}>Micro Posts:  {totalPosts} </h4> */}
      {posts.map((post) => (
        <MicroBlogPost key={post._id.toString()} post={post} />
      ))}
      {loading === true ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color={mood + '.500'}
            size="xl"
          />
        </Center>
      ) : (
        <Center mt={8}>
          <Button colorScheme={mood} variant="ghost">
            {totalPosts > posts.length === true ? (
              <a className={styles.feedButton} onClick={handleLoadMore}>
                Load More
                {/* ({totalPosts - posts.length} posts left) */}
              </a>
            ) : (
              <a></a>
            )}
          </Button>
        </Center>
      )}
    </Box>
  );
}
