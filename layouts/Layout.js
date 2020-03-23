import React from 'react';
import PropTypes from 'prop-types';
import DefaultHead from '../components/DefaultHead/DefaultHead';
import AmpHead from '../components/AmpHead/AmpHead';
import MainLayout from './MainLayout';
import AmpLayout from './AmpLayout';
import CardLayout from './CardLayout';
import NewspartnersLayout from './NewspartnersLayout';
import ListenLayout from './ListenLayout';

const Layout = (props) => {
  if (props.layout === 'amp') {
    return (
      <>
        <AmpHead />
        <AmpLayout>{props.children}</AmpLayout>
      </>
    );
  }

  return (
    <>
      <DefaultHead />
      <LayoutInner layout={props.layout}>{props.children}</LayoutInner>
    </>
  );
};

const LayoutInner = (props) => {
  if (props.layout === 'card') return <CardLayout>{props.children}</CardLayout>;

  if (props.layout === 'newspartners') {
    return <NewspartnersLayout>{props.children}</NewspartnersLayout>;
  }

  if (props.layout === 'listen') {
    return <ListenLayout>{props.children}</ListenLayout>;
  }

  return <MainLayout>{props.children}</MainLayout>;
};

Layout.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.string
};

LayoutInner.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.string
};

export default Layout;
