import React from 'react';
import { Loading } from '@apmg/titan';
import PropTypes from 'prop-types';
import useData from './useData';
import IconCheckmark from '../Icons/IconCheckmark';
import Sprite from '../Svg/states/Sprite';
import Svg from '../Svg/states';

const PresidentialPrimaryResults = ({ states, api }) => {
  if (!states?.length) return null;

  api =
    api ||
    `${process.env.ELECTIONS_API}/2020/presidential_primary_races?party=Dem`;
  api += `&state_postal=${states.join(',')}`;

  const data = useData(api);
  if (data === undefined) {
    return <Loading />;
  } else if (typeof data !== 'object') {
    return <div>{data}</div>;
  }

  const MNFirst = (a, b) => {
    if (a.state_postal == 'MN') return -1;
    if (b.state_postal == 'MN') return 1;
    return 0;
  };

  return (
    <div className="section section-sm section-borderBottom">
      <div className="presidentialPrimaryResults">
        <div className="results-legend">
          <h3 className="results-header">Primary results by state</h3>
          <div className="results-key">Percent and Votes</div>
        </div>
        <div className="results_source">
          Data Source:{' '}
          {data.meta.election_data_source === 'mn_oss' ? 'MN OSS' : 'AP'}
        </div>
        {data.states?.sort(MNFirst).map((state) => {
          return (
            <StateRow
              {...state}
              key={state.state_postal}
              stateAbbrev={state.state_postal}
            />
          );
        })}
      </div>
    </div>
  );
};
const ImgDirectory = '/data/imgs/candidates';

const UseDefaultImg = (event) => {
  // Fallback if the image file for a candidate does not exist
  event.target.src = `${ImgDirectory}/default.png`;
};
PresidentialPrimaryResults.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired, // postal codes
  api: PropTypes.string
};

const StateRow = ({ state, results, stateAbbrev }) => {
  const getPercent = (percentDecimal) => {
    return Number.parseFloat(percentDecimal);
  };
  const currentPercent = results[0].precincts_reporting_percent;
  const moveDecimalOverTwice = 'e+2';
  return (
    <div className="row row-candidate row-wrap" data-party={results[0].party}>
      <div className="column column-state">
        <div className="state state-wrapper">
          <div className="row row-em">
            <div className="state_flex state_marginRight">
              <div className="stateSvg">
                <Svg statesvg={`${stateAbbrev}`} />
              </div>
              <div className="cell cell-state">{state}</div>
            </div>
          </div>
          <div className="row row-em">
            <div className="cell_reporting">
              Reporting {getPercent(currentPercent + moveDecimalOverTwice)}%
            </div>
          </div>
        </div>
      </div>
      <div className="column column-candidate">
        <div className="row row-wrap">
          {results[0]?.candidates?.slice(0, 3).map((candidate) => {
            return (
              <CandidateCell {...candidate} key={candidate.candidate_id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

StateRow.propTypes = {
  state: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  stateAbbrev: PropTypes.string.isRequired
};

const CandidateCell = ({
  candidate_name,
  vote_percent,
  vote_count,
  uncontested,
  candidate_id,
  winner = false
}) => {
  const photo = (
    <img
      src={`${ImgDirectory}/${candidate_id}.png`}
      height="64"
      width="64"
      alt={candidate_name}
      onError={UseDefaultImg}
    />
  );

  return (
    <div className="cell cell-candidate">
      <div className="cell_icon">{photo}</div>
      <div className="cell_column">
        <div className="cell_row">
          <div className="cell_name">{candidate_name}</div>
        </div>
        <div className="cell_row">
          {uncontested ? (
            <div className="cell_vote cell_vote-em">Uncontested</div>
          ) : (
            <div className="cell_vote">
              <span className="cell_votePercent">
                {vote_percent.toLocaleString('en-US', { style: 'percent' })}
              </span>
              <div className={`cell_voteCount${winner ? ' winner' : ''}`}>
                {winner && <IconCheckmark />}
                <div className="cell_voteNumber">
                  {vote_count.toLocaleString('en-US')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Sprite />
    </div>
  );
};

CandidateCell.propTypes = {
  candidate_name: PropTypes.string.isRequired,
  vote_percent: PropTypes.number.isRequired,
  vote_count: PropTypes.number.isRequired,
  candidate_id: PropTypes.number.isRequired,
  uncontested: PropTypes.bool,
  winner: PropTypes.bool
};

export default PresidentialPrimaryResults;
