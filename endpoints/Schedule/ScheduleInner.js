/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ContentLayout from '../../layouts/ContentLayout';
import ToSentence from '../../components/ToSentence/ToSentence';

const ScheduleInner = ({ schedule }) => {
  return (
    <ContentLayout>
      <table className="table">
        {Array.isArray(schedule) &&
          schedule.map((program, i) => (
            <tr className={i % 2 !== 0 ? 'striped-row' : ''} key={i}>
              <td className="leftmost">
                <time>{format(program.start_dtim, 'h:mm A')}</time>
              </td>
              {program?.shows.map((show) => {
                return (
                  <td key={show.id} className="rightmost">
                    <strong>
                      <Link key={show} href={show.link}>
                        <a>{show.name}</a>
                      </Link>{' '}
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
      </table>
    </ContentLayout>
  );
};

ScheduleInner.propTypes = {
  schedule: PropTypes.array
};

export default ScheduleInner;
