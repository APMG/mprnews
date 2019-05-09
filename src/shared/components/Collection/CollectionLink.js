import React from 'react';
import { Link } from 'apm-titan';
import { collectionConfig } from '../../config/index';

const CollectionLinks = () => {
  return (
    <div>
      <h3>MPR News Coverage</h3>
      {collectionConfig.newsCoverage.map((link) => {
        return (
          <Link key={link.name} to={link.path}>
            {link.name} {''}
          </Link>
        );
      })}
    </div>
  );
};

export default CollectionLinks;
