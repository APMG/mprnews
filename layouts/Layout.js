import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from './MainLayout';
import AmpLayout from './AmpLayout';
import CardLayout from './CardLayout';
import NewspartnersLayout from './NewspartnersLayout';
import ListenLayout from './ListenLayout';

const Layout = (props) => {
  if (props.layout === 'card') return <CardLayout>{props.children}</CardLayout>;

  if (props.layout === 'newspartners') {
    return <NewspartnersLayout>{props.children}</NewspartnersLayout>;
  }

  if (props.layout === 'listen') {
    return <ListenLayout>{props.children}</ListenLayout>;
  }

  if (props.layout === 'amp') {
    return <AmpLayout>{props.children}</AmpLayout>;
  }

  return <MainLayout>{props.children}</MainLayout>;
};

Layout.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.string
};

export default Layout;
