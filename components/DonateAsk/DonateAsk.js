import React from 'react';
import { Link } from '@apmg/titan';
import Icon from '../Icons/Icon';

const DonateAsk = () => {
  return (
    <div className="donateAsk">
      <div className="donateAsk_header">
        <h2 className="hdg hdg-2">Before you go...</h2>
      </div>
      <div className="donateAsk_body">
        <p>
          MPR News brings you stories that inform you on national and regional
          Minnesota stories. We rely on you to do this. You have the power to
          keep us writing, sharing these stories, and helping you get the
          information you care about.
        </p>
        <p>
          <Link
            href="https://support.mpr.org/mprnews-web"
            className="link"
            id="donate-ask-link"
          >
            Donate today for as little as $5.00 a month.
          </Link>{' '}
          Your gift only takes a few minutes and has a lasting impact on MPR
          News
        </p>
      </div>
      <div className="donateAsk_footer">
        <Link
          href="https://support.mpr.org/mprnews-web"
          className="btn btn-primary"
          id="donate-ask-button"
        >
          {' '}
          Support MPR News <Icon name="heart" />
        </Link>
      </div>
    </div>
  );
};
export default DonateAsk;
