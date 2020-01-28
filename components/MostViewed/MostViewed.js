import React, { useEffect, useState } from 'react';
import { Link } from '@apmg/titan';
import fetch from 'isomorphic-unfetch';
import { Heading } from '@apmg/titan';

const MostViewed = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch(`/api/mostviewed`);
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
    <div className="mostViewed">
      <div className="module_header">
        <Heading elementClass="hdg-section hdg-section-small" level={3}>
          {'Recent Top Stories'}
        </Heading>
      </div>
      <div className="module_body">
        <ul className="bList bList-styled">
          {data.mostViewed &&
            data.mostViewed.map((data, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`/story?slug=${parseUrl(data.dimensions[0])}`}
                    as={`${data.dimensions[0]}`}
                    className="link link-plain"
                  >
                    {parseString(data.dimensions[1])}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MostViewed;
