import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../header';
import Footer from '../footer';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Layout({ children, pageMeta, maxWidth = '850px' }) {
  // const [ogImage, setOgImage] = useState('');
  // useEffect(() => {
  //   console.log(window.location.origin);
  //   setOgImage(window.location.origin + '/og-image.png');
  // }, []);
  const router = useRouter();
  const meta = {
    title: 'sagark.xyz ',
    description: 'Learning and Writing. My corner of the web.',
    type: 'website',
    image: 'https://sagark.xyz/og-image.png',
    ...pageMeta,
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta
          property="og:url"
          content={`https://sagark.xyz${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        {meta.image && <meta property="og:image" content={meta.image} />}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Box width="100%" maxW={maxWidth} mx="auto" paddingX={[4, 10]}>
        <Flex direction="column">
          <Box>
            <Header title={`sagark.xyz`} />
          </Box>
          <Box minH={'50vh'} mb={'200px'}>
            {children}
          </Box>
          <Footer title={`sagark.xyz`} />
        </Flex>
      </Box>
    </>
  );
}
