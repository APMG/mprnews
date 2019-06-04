import React from 'react';
import Link from 'next/link';

const exampleSlug =
  '2019/06/03/npr-sudan-security-forces-open-fire-on-protesters-in-capital';

const Home = () => (
  <div>
    <h1>Home</h1>
    <ul>
      <li>
        <Link as={`/story/${exampleSlug}`} href={`/story?slug=${exampleSlug}`}>
          <a>Example Story</a>
        </Link>
      </li>
    </ul>
  </div>
);

export default Home;
