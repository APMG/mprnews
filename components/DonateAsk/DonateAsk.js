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
          MPR News is dedicated to bringing you clarity in coverage from our
          reporters across the state, stories that connect us, and conversations
          that provide perspectives when we need it most. We rely on your help
          to do this. Your donation has the power to keep MPR News strong and
          accessible to all during this crisis and beyond.
        </p>
        <p>
          <Link
            href="https://support.mpr.org/mprnews-instory"
            className="link"
            id="donate-ask-link"
          >
            Donate today. As little as $5 makes a difference.
          </Link>{' '}
        </p>
      </div>
      <div className="donateAsk_footer">
        <Link
          href="https://support.mpr.org/mprnews-instory"
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
