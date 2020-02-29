import React from 'react';
import { Loading } from '@apmg/titan';
import PropTypes from 'prop-types';
import useData from './useData';
import Sprite from '../Svg/states/Sprite';
import Svg from '../Svg/states';

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
  // console.log(data);
  return (
    <div className="section section-sm">
      <div className="presidentialPrimaryDelegates">
        <DelegateRow results={data.results[0]} meta={data.meta} />
      </div>
    </div>
  );
};

PresidentialPrimaryDelegates.propTypes = {
  api: PropTypes.string
};

const DelegateRow = ({ results, meta }) => {
  return (
    <div className="delegate-count">
      <div className="results-legend">
        <h3 className="results-header">Democratic delegate count results</h3>
        <div className="results-key">
          {results.total_delegates_needed.toLocaleString('en-US')} to win
        </div>
      </div>
      <div className="results_source">
        Data Source: {meta.election_data_source === 'mn_oss' ? 'MN OSS' : 'AP'}
      </div>
      <div className="row row-candidate row-wrap" data-party={results.party}>
        <div className="column column-state">
          <div className="state state-wrapper">
            <div className="state_flex state_marginRight">
              <div className="stateSvg">
                <Svg statesvg="US" />
              </div>
              <div className="cell cell-national">National</div>
            </div>
          </div>
        </div>
        <div className="column-candidate">
          <div className="row row-wrap">
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
      </div>
      <Sprite />
    </div>
  );
};

DelegateRow.propTypes = {
  results: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

const CandidateDelegateCell = ({
  candidate_name,
  candidate_id,
  delegates_won
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
          <div className="cell_delegates">
            {delegates_won.toLocaleString('en-US')}
          </div>
        </div>
      </div>
      <Sprite />
    </div>
  );
};

const ImgDirectory = '/data/imgs/candidates';

const UseDefaultImg = (event) => {
  // Fallback if the image file for a candidate does not exist
  event.target.src = `${ImgDirectory}/default.png`;
};
CandidateDelegateCell.propTypes = {
  candidate_name: PropTypes.string.isRequired,
  delegates_won: PropTypes.number.isRequired,
  candidate_id: PropTypes.number.isRequired
};

export default PresidentialPrimaryDelegates;
