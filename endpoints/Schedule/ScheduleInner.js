/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ContentLayout from '../../layouts/ContentLayout';
import { Loading } from '@apmg/titan';

const ScheduleInner = ({ schedule, isLoading, error }) => {
  if (isLoading) return <Loading />;
  if (error) return <>Error</>;
  return (
    <ContentLayout>
      {Array.isArray(schedule) &&
        schedule.map((program, i) => (
          <tr key={i}>
            <td>{format(program.start_dtim, 'h:mm A')}</td>
            {program?.shows.map((show) => {
              return (
                <td key={show.id}>
                  <Link href={show.link}>
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
    </ContentLayout>
  );
};

ScheduleInner.propTypes = {
  schedule: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.bool
};

export default ScheduleInner;
