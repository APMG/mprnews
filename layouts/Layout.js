import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from './MainLayout';
import CardLayout from './CardLayout';
import NewspartnersLayout from './NewspartnersLayout';

const Layout = (props) => {
  if (props.layout === 'card') return <CardLayout>{props.children}</CardLayout>;

  if (props.layout === 'newspartners') {
    return <NewspartnersLayout>{props.children}</NewspartnersLayout>;
  }

  return <MainLayout>{props.children}</MainLayout>;
};

Layout.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.string
};

export default Layout;
