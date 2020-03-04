import React from 'react';
import PresidentialPrimaryResults from './PresidentialPrimaryResults';
import PresidentialPrimaryDelegates from './PresidentialPrimaryDelegates';
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
        <a href="https://elections.mpr.org/2020-03-03">
          View More Results
          <Icon name="chevronRight" />
        </a>
      </div>
    </div>
  );
};

PresidentialPrimaryWidget.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string),
  showDelegateCount: PropTypes.bool
};

export default PresidentialPrimaryWidget;
