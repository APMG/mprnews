/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ContentLayout from '../../layouts/ContentLayout';

const ScheduleInner = ({ schedule }) => {
  return (
    <ContentLayout>
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
                    </Link>{' '}
                    {program?.people.map((person, i) => {
                      if (i === program.people.length - 1) {
                        return <Fragment key={i}>{person.name}</Fragment>;
                      } else if (i === program.people.length - 2) {
                        return <Fragment key={i}>{person.name} and </Fragment>;
                      }
                      return <Fragment key={i}>{person.name}, </Fragment>;
                    })}
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
