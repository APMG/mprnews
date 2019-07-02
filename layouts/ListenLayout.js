import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

const ListenLayout = ({ children }) => (
  <>
    <main className="main main-listen">{children}</main>
  </>
);

ListenLayout.propTypes = {
  children: PropTypes.any
};

export default ListenLayout;
