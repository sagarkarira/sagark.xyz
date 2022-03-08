import React from 'react';
import styles from './micro-blog-post.module.css';
import NextLink from 'next/link';
import Linkify from 'react-linkify';
import { Code, Avatar, Flex, Box, Link, Text, Divider } from '@chakra-ui/react';
import { GlobalContext } from '../globalState';

export default function MicroBlogPost({ post }) {
  const { mood, theme } = React.useContext(GlobalContext);
  const cleanTags = post.tags
    ? post.tags
        .split(',')
        .map((t) => `${t.trim()}`)
        .join(' ')
    : '';
  const cleanDate = new Date(post.createdAt).toLocaleString();
  return (
    <>
      <Flex paddingX={1} paddingY={4} borderBottom={`1px dotted ${mood}`}>
        <Box minWidth="10%">
          <Avatar src="/myavatar.jpg" w={10} h={10} width="100%" />
        </Box>
        <Box>
          <Text fontWeight="bold" mb={3}>
            {post.name}
          </Text>
          <Linkify component={Link}>
            <Text mb={4} lineHeight="6" whiteSpace="pre-wrap">
              {renderText(post.content, mood, theme)}
            </Text>
          </Linkify>
          <Flex className="post-footer" justifyContent="space-between">
            <NextLink href={`/microblog/${post._id}`}>
              <Link color={mood + (theme === 'dark' ? '.400' : '.700')}>
                <Text fontSize="sm">{cleanDate}</Text>
              </Link>
            </NextLink>
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
    </>
  );
}

const URL_REGEX = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/;

const renderText = (txt, mood, theme) =>
  txt.split(' ').map((part) => {
    return URL_REGEX.test(part) ? (
      <Link
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
