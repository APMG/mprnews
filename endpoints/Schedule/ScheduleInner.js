/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { format } from 'date-fns';
import ContentGrid from '../../grids/ContentGrid';
import ToSentence from '../../components/ToSentence/ToSentence';

const ScheduleInner = ({ schedule }) => {
  return (
    <ContentGrid>
      <table className="schedule">
        <tbody>
          {Array.isArray(schedule) &&
            schedule.map((program, i) => (
              <tr className={i % 2 !== 0 ? 'schedule_striped' : ''} key={i}>
                <td className="schedule_leftmost">
                  <time>{format(program.start_dtim, 'h:mm A')}</time>
                </td>
                {program?.shows.map((show) => {
                  return (
                    <td key={show.id} className="schedule_rightmost">
                      <strong>
                        {show.link ? (
                          <Link key={show} href={show.link}>
                            <a className="link link-plain">{show.name}</a>
                          </Link>
                        ) : (
                          <a className="link link-plain">{show.name}</a>
                        )}{' '}
                      </strong>
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
  schedule: PropTypes.object
};

export default ScheduleInner;
