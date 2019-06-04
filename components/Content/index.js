import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'apm-titan';
import { Body } from 'amat-react';

const Content = (props) => {
  return (
    <article className="content">
      <div className="content_header">
        <Heading level={1} className="hdg hdg-1">
          {props.title}
        </Heading>
      </div>
      <div className="content_body userContent">
        <Body
          nodeData={JSON.parse(props.body)}
          embedded={JSON.parse(props.embeddedAssetJson)}
        />
      </div>
    </article>
  );
};

Content.propTypes = {
  body: PropTypes.string,
  embeddedAssetJson: PropTypes.string,
  title: PropTypes.string
};

export default Content;
