import React from 'react';
import { Loading } from '@apmg/titan';
import PropTypes from 'prop-types';
import useData from './useData';

const PresidentialPrimaryDelegates = ({ api }) => {
  api =
    api ||
    `${process.env.ELECTIONS_API}/2020/presidential_primary_delegates?party=Dem`;

  const data = useData(api);
  if (data === undefined) {
    return <Loading />;
  } else if (typeof data !== 'object') {
    return <div>{data}</div>;
  }

  return (
    <div className="section">
      <div className="presidentialPrimaryDelegates">
        <DelegateRow results={data.results[0]} />
      </div>
    </div>
  );
};

PresidentialPrimaryDelegates.propTypes = {
  api: PropTypes.string
};

const DelegateRow = ({ results }) => {
  return (
    <div className="delegate-count">
      <div className="results-legend">
        <h3 className="results-header">
          Overview of National Delegate Count Results
        </h3>
        <div className="results-key">
          {results.total_delegates_needed.toLocaleString('en-US')} to win
        </div>
      </div>
      <div className="row row-candidate">
        <div className="cell cell-national">National</div>
        {results.candidates?.slice(0, 3).map((candidate) => {
          return (
            <CandidateDelegateCell
              {...candidate}
              key={candidate.candidate_id}
            />
          );
        })}
      </div>
    </div>
  );
};

DelegateRow.propTypes = {
  results: PropTypes.object.isRequired
};

const CandidateDelegateCell = ({ candidate_name, delegates_won }) => {
  const photo = 'Photo';
  return (
    <div className="cell cell-candidate">
      <div className="cell_icon">{photo}</div>
      <div className="cell_name">{candidate_name}</div>
      <div className="cell_delegates">
        {delegates_won.toLocaleString('en-US')}
      </div>
    </div>
  );
};

CandidateDelegateCell.propTypes = {
  candidate_name: PropTypes.string.isRequired,
  delegates_won: PropTypes.number.isRequired
};

export default PresidentialPrimaryDelegates;
