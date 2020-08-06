import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';

/* eslint react/display-name: 0 */

const TrafficPage = ({ errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  return (
    <>
      <iframe
        title="Traffic Map"
        width="100%"
        height="500"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        src="https://apps.mprnews.org/embeds/traffic/traffic.html"
      />
      <p>
        Get the Twin Cities weather forecast via text every morning. Send
        &quot;weather&quot; to{' '}
        <a href="tel:8445189770" className="link">
          844-518-9770
        </a>
        . Text &quot;stop&quot; to unsubscribe, or &quot;help&quot; for other
        questions.
      </p>
      <p>
        <a href="https://www.mpr.org/public/terms" className="link">
          Terms of Use
        </a>{' '}
        |{' '}
        <a href="https://www.mpr.org/public/privacy" className="link">
          Your Privacy Rights
        </a>
      </p>
      <p>
        <a href="https://www.511mn.org/" className="link">
          MnDOT 511 traffic information
        </a>
      </p>
      <p>
        <a href="https://twitter.com/TwinCities511" className="link">
          Twin Cities traffic incidents
        </a>
      </p>
    </>
  );
};

TrafficPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default TrafficPage;
