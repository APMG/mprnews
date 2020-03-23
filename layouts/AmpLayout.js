import React from 'react';
import PropTypes from 'prop-types';
import AmpHeader from '../components/AmpHeader/AmpHeader';
import AmpFooter from '../components/AmpFooter/AmpFooter';
import Head from 'next/head';

const ampStyles = {
  ampContainer: {
    margin: '25px'
  }
};

const chartbeatObj = {
  vars: {
    uid: '33583',
    domain: 'mprnews.org'
  }
};

const googleAnalytics = {
  vars: {
    gtag_id: 'UA-2958380-25',
    config: {
      'UA-2958380-25': { groups: 'default' }
    }
  }
};

const AmpLayout = ({ children }) => {
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-analytics"
          src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
        ></script>
      </Head>
      <AmpHeader />
      <main>
        <amp-analytics type="chartbeat">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(chartbeatObj)
            }}
          />
        </amp-analytics>
        <amp-analytics type="gtag" data-credentials="include">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(googleAnalytics)
            }}
          />
        </amp-analytics>
        <div style={ampStyles.ampContainer}>{children}</div>
      </main>
      <AmpFooter />
    </>
  );
};

AmpLayout.propTypes = {
  children: PropTypes.any
};

export default AmpLayout;
