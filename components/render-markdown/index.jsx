import React from 'react';
import {
  chakra,
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
  Tag,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
// import Image from 'next/image';
import NextLink from 'next/link';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { GlobalContext } from '../../components/globalState';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const customComponents = (mood) => ({
  a: (props) => {
    return (
      <NextLink href={props.href} passHref>
        <Link color={mood + '.500'}>{props.children}</Link>
      </NextLink>
    );
  },
  ol: ({ children }) => <OrderedList>{children}</OrderedList>,
  ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
  li: ({ children }) => <ListItem marginBottom={2}>{children}</ListItem>,
  h1: ({ children }) => {
    return (
      <Heading as="h1" size="2xl" mt="8" mb="6" fontWeight="bold">
        {children}
      </Heading>
    );
  },
  h2: ({ children }) => {
    return (
      <Heading as="h2" size="xl" mt="8" mb="6" fontWeight="bold">
        {children}
      </Heading>
    );
  },
  h3: ({ children }) => {
    return (
      <Heading as="h3" size="lg" mt="8" mb="6" fontWeight="bold">
        {children}
      </Heading>
    );
  },
  h4: ({ children }) => {
    return (
      <Heading as="h4" size="md" mt="8" mb="6" fontWeight="bold">
        {children}
      </Heading>
    );
  },
  h5: ({ children }) => {
    return (
      <Heading as="h5" size="md" mt="8" mb="6" fontWeight="bold">
        {children}
      </Heading>
    );
  },
  blockquote: ({ children }) => {
    // const text = '';
    // children.map((c) => {
    //   console.log(c?.props?.node);
    //   // if ( c?.props?.node) {
    //   // text +=
    // });
    return (
      <Alert variant="left-accent" colorScheme={mood}>
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    );
  },
  p: ({ children }) => {
    return (
      <Text marginBlock="8" lineHeight={1.69} fontSize="lg">
        {children}
      </Text>
    );
  },
  del: ({ children }) => {
    return (
      <Text as="mark" mb="8">
        {children}
      </Text>
    );
  },
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <Tag colorScheme={mood} size="md" variant="solid" minHeight={7}>
        {children}
      </Tag>
    );
  },
  // code: ({ children }) => {
  //   return <Code colorScheme={mood}>{children}</Code>;
  // },

  img: ({ src, alt }) => {
    return (
      <Box width="100%" className="post-image-container">
        <Image src={src || ''} alt={alt} layout="fill" className="image" />
      </Box>
    );
  },
});

export default function RenderMarkdown({ children }) {
  const { mood } = React.useContext(GlobalContext);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={customComponents(mood)}
    >
      {children}
    </ReactMarkdown>
  );
}
