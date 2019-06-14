/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ContentLayout from '../../layouts/ContentLayout';

const ScheduleInner = ({ schedule }) => {
  return (
    <ContentLayout>
      {console.log('scheduleInner', schedule)}
      <table border="1">
        {Array.isArray(schedule) &&
          schedule.map((program, i) => (
            <tr key={i}>
              <td>{format(program.start_dtim, 'h:mm A')}</td>
              {program?.shows.map((show) => {
                return (
                  <td key={show.id}>
                    <Link key={show} href={show.link}>
                      <a>{show.name}</a>
                    </Link>
                    {program?.people.map((person) => (
                      <td key={person.name}>{person.name}</td>
                    ))}
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
