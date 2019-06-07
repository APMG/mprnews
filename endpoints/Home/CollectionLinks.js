import React from 'react';
import Link from 'next/link';
import { collectionConfig } from '../../utils/defaultData';

const CollectionLinks = () => {
  return (
    <div>
      <h3>MPR News Coverage</h3>
      {collectionConfig.newsCoverage.map((link) => {
        return (
          <Link href={link.path} key={link.name}>
            {link.name} {''}
          </Link>
        );
      })}
    </div>
  );
};

export default CollectionLinks;
