import Head from 'next/head';
import Layout from '../components/layout/layout';
import MicroBlog from '../components/micro-blog';

export default function Home() {
  return (
    <Layout>
      <MicroBlog />
    </Layout>
  );
}
