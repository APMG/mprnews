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
      <h3>MPR News Programs</h3>
      {collectionConfig.newsPrograms.map((link) => {
        return (
          <Link key={link.name} to={link.path}>
            {link.name} {''}
          </Link>
        );
      })}
      <h3>MPR News Resources</h3>
      {collectionConfig.newsResources.map((link) => {
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
