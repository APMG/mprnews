import React from 'react';
import PropTypes from 'prop-types';
import { AmpOembed } from '@apmg/amat';
import AmpTwitter from './AmpTwitter';

const AmpOembedFactory = (props) => {
  function findEmbedded() {
    return props.embedded.oembeds.find(
      (embed) => embed.url === props.nodeData.attrs.src
    );
  }

  if (props.minimal) {
    return null;
  }

  const embed = findEmbedded();
  if (!embed) {
    return null;
  }

  switch (embed.provider_name) {
    case 'Twitter':
      return <AmpTwitter {...props} embed={embed} />;
    default:
      return <AmpOembed {...props} />;
  }
};

AmpOembedFactory.propTypes = {
  embedded: PropTypes.object,
  nodeData: PropTypes.object,
  minimal: PropTypes.bool,
  fallback_text: PropTypes.string
};

export default AmpOembedFactory;
