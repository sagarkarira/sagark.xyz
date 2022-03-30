import React from 'react';
import styles from './micro-blog-post.module.css';
import NextLink from 'next/link';
import Linkify from 'react-linkify';
import {
  Code,
  Avatar,
  Flex,
  Box,
  Link,
  Text,
  Divider,
  Button,
  UnorderedList,
} from '@chakra-ui/react';
import { GlobalContext } from '../globalState';
import dayjs from 'dayjs';

export default function MicroBlogPost({ post }) {
  const { mood, theme } = React.useContext(GlobalContext);
  const cleanTags = post.tags
    ? post.tags
        .split(',')
        .map((t) => `${t.trim()}`)
        .join(' ')
    : '';
  const cleanDate = dayjs(post.createdAt).format("DD MMM 'YY h:m a");
  return (
    <Box key={post._id}>
      <Flex paddingX={1} paddingY={4} borderBottom={`1px dotted ${mood}`}>
        <Box minWidth="10%">
          <Avatar src="/myavatar.jpg" w={10} h={10} width="100%" />
        </Box>
        <Box minWidth={'90%'}>
          <Text fontWeight="bold" mb={3}>
            {post.name}
          </Text>
          {/* <Linkify component={Link}> */}
          <Text mb={4} lineHeight="6" whiteSpace="pre-wrap">
            {renderText(post.content, mood, theme)}
          </Text>
          {/* </Linkify> */}
          <Flex className="post-footer" justifyContent="space-between">
            <Text
              fontSize="sm"
              color={mood + (theme === 'dark' ? '.400' : '.700')}
              _hover={{ textDecoration: 'underline' }}
            >
              <NextLink href={`/microblog/${post._id}`}>{cleanDate}</NextLink>
            </Text>
            <Flex className="tags" gap={2}>
              {post.tags.split(',').map((t, i) => (
                <Code key={i} colorScheme={mood}>
                  {t}
                </Code>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

const URL_REGEX = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/;

const renderText = (txt, mood, theme) =>
  txt.split(' ').map((part, i) => {
    return URL_REGEX.test(part) ? (
      <Link
        key={i}
        color={mood + (theme === 'dark' ? '.400' : '.700')}
        href={part}
        isExternal
      >
        {part}
      </Link>
    ) : (
      part + ' '
    );
  });
