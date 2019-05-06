import React from 'react';
import { Link } from 'apm-titan';
import { collectionConfig } from '../../config/index';

const Sections = (props) => {
  console.log(collectionConfig);

  return (
    <div>
      <Link to="/stories">stories</Link>
      {/* <h1>Sections page</h1> */}
      {collectionConfig.map((link) => {
        // <Link to={link.path}>1</Link>;

        <div key={link.name}>
          {console.log(link.path)}
          {console.log(link.name)}
          <h1>{link.name}</h1>
          hi
        </div>;
      })}
    </div>
  );
};

export default Sections;
