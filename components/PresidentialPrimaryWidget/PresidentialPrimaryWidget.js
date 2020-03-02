import React from 'react';
import PresidentialPrimaryResults from './PresidentialPrimaryResults';
import PresidentialPrimaryDelegates from './PresidentialPrimaryDelegates';
import { Link } from '@apmg/titan';
import Icon from '../Icons/Icon';
import PropTypes from 'prop-types';

const PresidentialPrimaryWidget = ({ states, showDelegateCount }) => {
  if (!states?.length && !showDelegateCount) {
    return null;
  }
  return (
    <div className="PresidentialPrimary">
      {showDelegateCount && (
        <>
          <div className="section_header">
            <h2 className="hdg hdg-2">Election Results</h2>
            <div className="live">
              {/* We don't yet have a way to determine live vs. final data. Switch these commented sections before/after an election until we figure it out. */}
              {/* <span className="live_text">Final Results</span> */}
              <span className="live_text">Updating Live</span>
              <span className="live_icon">
                <Icon name="live" />
              </span>
            </div>
          </div>
          <PresidentialPrimaryDelegates />
        </>
      )}
      {states?.length && <PresidentialPrimaryResults states={states} />}
      <div className="resultsLink">
        <Link href="[...slug]" as="/politics/election-2020">
          View More Results
          <Icon name="chevronRight" />
        </Link>
      </div>
    </div>
  );
};

PresidentialPrimaryWidget.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string),
  showDelegateCount: PropTypes.bool
};

export default PresidentialPrimaryWidget;
