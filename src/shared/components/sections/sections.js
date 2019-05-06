import React from 'react';
// import { Link } from '@reach/router';
import { collectionLinks } from '../../config/index';

class Sections extends React.Component {
  render() {
    return (
      <div>
        <h1>Sections page</h1>
        {collectionLinks.map((link) => {
          {
            link.name;
          }
        })}
      </div>
    );
  }
}

export default Sections;
