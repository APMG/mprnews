import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const MostViewed = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch(`/mostviewed`);
        let result = await response.json();
        let mostViewed = [];

        result.rows.map((row) => {
          mostViewed.push(row);
        });
        setData({ mostViewed });
      } catch (err) {
        console.error(err);
        return;
      }
    };

    getData();
  }, []);

  function parseString(string) {
    return string.replace(' | MPR News', '');
  }

  function parseUrl(url) {
    return url.replace(`/story/`, '');
  }

  return (
    <div className="mostviewed">
      <ul>
        {data.mostViewed &&
          data.mostViewed.map((data, i) => {
            return (
              <li key={i}>
                <Link
                  href={`/story?slug=${parseUrl(data.dimensions[0])}`}
                  as={`${data.dimensions[0]}`}
                >
                  <a className="link link-plain">
                    {parseString(data.dimensions[1])}
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MostViewed;
