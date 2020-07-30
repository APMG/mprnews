/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Time } from '@apmg/titan';
import ContentGrid from '../../grids/ContentGrid';
import ToSentence from '../../components/ToSentence/ToSentence';
import { analyzeUrl } from '../../utils/cjsutils';

const ScheduleInner = ({ schedule }) => {
  const getLink = (show) => {
    const link = show.link ? show.link : show.external_link;
    if (link) {
      const { href, as } = analyzeUrl(link);
      return (
        <strong>
          {link && (
            <Link href={href} as={as || href} className="link link-plain">
              {show.name}
            </Link>
          )}
        </strong>
      );
    } else {
      return <strong>{show.name}</strong>;
    }
  };

  return (
    <ContentGrid>
      <table className="schedule">
        <tbody>
          {Array.isArray(schedule) &&
            schedule.map((program, i) => (
              <tr className={i % 2 !== 0 ? 'schedule_striped' : ''} key={i}>
                <td className="schedule_leftmost">
                  <Time dateTime={program.start_dtim} formatString="h:mm aa" />
                </td>
                {program?.shows.map((show) => {
                  return (
                    <td key={show.id} className="schedule_rightmost">
                      {getLink(show)}{' '}
                      {program?.people.length > 0 && (
                        <>
                          <span>with </span>
                          <ToSentence items={program?.people} />
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </ContentGrid>
  );
};

ScheduleInner.propTypes = {
  schedule: PropTypes.object,
};

export default ScheduleInner;
