import React from 'react';
import PresidentialPrimaryResults from './PresidentialPrimaryResults';
import PresidentialPrimaryDelegates from './PresidentialPrimaryDelegates';
import { Link } from '@apmg/titan';
import Icon from '../Icons/Icon';
import PropTypes from 'prop-types';

const PresidentialPrimaryWidget = ({ states, showDelegateCount = true }) => {
  return (
    <div className="PresidentialPrimary">
      {showDelegateCount && (
        <>
          <div className="section_header">
            <h2 className="hdg hdg-2">Super Tuesday 2020 Results</h2>
          </div>
          <PresidentialPrimaryDelegates />
        </>
      )}
      <PresidentialPrimaryResults states={states} />
      <div className="more-election-results">
        <Link href="https://elections.mpr.org/2020-03-03">
          <span>VIEW MORE RESULTS</span>
          <Icon name="chevronRight" />
        </Link>
      </div>
    </div>
  );
};

PresidentialPrimaryWidget.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  showDelegateCount: PropTypes.bool
};

export default PresidentialPrimaryWidget;
