/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import query from './stories.gql';

const Stories = () => (
  <Query query={query}>
    {({ loading, error, data: { stories } }) => {
      if (error) return <div>Error loading stories</div>;
      if (loading) return <Loading />;

      return <StoriesInner stories={stories} />;
    }}
  </Query>
);

const StoriesInner = ({ stories }) => {
  return (
    <div>
      <ul>
        {stories.results?.items?.map((story) => {
          return (
            <li key={story.id}>
              <Link href={`/story?slug=${story.canonicalSlug}`}>
                <a>{story.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

StoriesInner.propTypes = {
  stories: PropTypes.object
};

export default Stories;
