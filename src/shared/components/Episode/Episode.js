import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Heading } from 'apm-titan';
import { Body } from 'amat-react';

const Episode = (props) => {
  const { data } = props;
  const { episode } = data;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <article className="episode">
      <Heading level={2}>{episode.title}</Heading>
      <Body
        nodeData={JSON.parse(episode?.body)}
        embedded={JSON.parse(episode?.embeddedAssetJson)}
      />
    </article>
  );
};

Episode.propTypes = {
  data: PropTypes.object
};

export default Episode;
