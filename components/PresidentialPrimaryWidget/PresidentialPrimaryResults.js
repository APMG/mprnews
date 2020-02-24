import React from 'react';
import { Loading } from '@apmg/titan';
import PropTypes from 'prop-types';
import useData from './useData';

const PresidentialPrimaryResults = ({ states, api }) => {
  api =
    api ||
    `${process.env.ELECTIONS_API}/2020/presidential_primary_races?party=Dem`;

  const data = useData(api);
  if (data === undefined) {
    return <Loading />;
  } else if (typeof data !== 'object') {
    return <div>{data}</div>;
  }

  return (
    <div className="section">
      <div className="presidentialPrimaryResults">
        <div className="results-legend">
          <h3 className="results-header">
            Democratic Primary Results By State
          </h3>
          <div className="results-key">Percent and Votes</div>
        </div>
        {data.states
          ?.filter((state) => {
            return states.includes(state.state_postal);
          })
          .map((state) => {
            return <StateRow {...state} key={state.state_postal} />;
          })}
      </div>
    </div>
  );
};

PresidentialPrimaryResults.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired, // postal codes
  api: PropTypes.string
};

const StateRow = ({ state, results }) => {
  return (
    <div className="row row-candidate">
      <div className="cell cell-state">{state}</div>
      {results[0]?.candidates?.slice(0, 3).map((candidate) => {
        return <CandidateCell {...candidate} key={candidate.candidate_id} />;
      })}
    </div>
  );
};

StateRow.propTypes = {
  state: PropTypes.string.isRequired,
  results: PropTypes.object.isRequired
};

const CandidateCell = ({ candidate_name, vote_percent, vote_count }) => {
  const photo = 'Photo';
  return (
    <div className="cell cell-candidate">
      <div className="cell_icon">{photo}</div>
      <div className="cell_name">{candidate_name}</div>
      <div className="cell_votePercent">
        {vote_percent.toLocaleString('en-US', { style: 'percent' })}
      </div>
      <div className="cell_voteCount">{vote_count.toLocaleString('en-US')}</div>
    </div>
  );
};

CandidateCell.propTypes = {
  candidate_name: PropTypes.string.isRequired,
  vote_percent: PropTypes.number.isRequired,
  vote_count: PropTypes.number.isRequired
};

export default PresidentialPrimaryResults;
