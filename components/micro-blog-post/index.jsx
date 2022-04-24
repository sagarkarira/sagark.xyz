import React from 'react';
import NextLink from 'next/link';
import Linkify from 'react-linkify';
import {
  Code,
  Tag,
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
  const cleanDate = dayjs(post.createdAt).format("DD MMM 'YY hh:mm a");
  return (
    <Box key={post._id}>
      <Flex paddingX={1} paddingY={4} borderBottom={`1px dotted ${mood}`}>
        <Box minWidth={12}>
          <Avatar src="/myavatar.jpg" w={10} h={10} />
        </Box>
        <Box minWidth={'100%'} paddingX={2}>
          <Text fontWeight="bold" mb={3}>
            <Link href="https://twitter.com/_sagark" target={'_blank'}>
              {post.name}
            </Link>
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
                <Tag key={i} colorScheme={mood} size="sm" variant="solid">
                  {t}
                </Tag>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

const URL_REGEX = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/;

// const renderText = (txt, mood, theme) =>
//   txt.split(' ').map((part, i) => {
//     if (part.indexOf('\n') > 0) {
//       return part.split('\n').map((subPart, i) => {
//         console.log(subPart, i);
//         return URL_REGEX.test(subPart) ? (
//           <Link
//             key={i}
//             color={mood + (theme === 'dark' ? '.400' : '.700')}
//             href={subPart + (i % 1 === 0 ? '\n' : '')}
//             isExternal
//           >
//             {subPart + (i % 1 === 0 ? '\n' : '')}
//           </Link>
//         ) : (
//           subPart + (i % 1 === 0 ? '\n' : '')
//         );
//       });
//     } else
//       return URL_REGEX.test(part) ? (
//         <Link
//           key={i}
//           color={mood + (theme === 'dark' ? '.400' : '.700')}
//           href={part}
//           isExternal
//         >
//           {part}
//         </Link>
//       ) : (
//         part + ' '
//       );
//   });

/*
Break text into lines.
Break lines into words
Check each word for link
If link --> linkify.
Add it up
*/
const renderText = (txt, mood, theme) =>
  txt.split('\n').map((line, ln) => {
    const wordArr = line.split(' ');
    return wordArr.map((word, wn) => {
      const add = wordArr.length - 1 === wn ? '\n' : ' ';
      return URL_REGEX.test(word) ? (
        <Link
          key={wn}
          color={mood + (theme === 'dark' ? '.400' : '.700')}
          href={word}
          isExternal
        >
          {word + add}
        </Link>
      ) : (
        word + add
      );
    });
  });
