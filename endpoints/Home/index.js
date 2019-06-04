import React from 'react';
import Link from 'next/link';

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link
      href={`story?slug=2019/06/03/npr-sudan-security-forces-open-fire-on-protesters-in-capital`}
    >
      A Story
    </Link>
  </div>
);

export default Home;
