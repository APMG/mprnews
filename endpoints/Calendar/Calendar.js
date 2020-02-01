import React from 'react';
import PropTypes from 'prop-types';
import ContentGrid from '../../grids/ContentGrid';
import { Time } from '@apmg/titan';

const Calendar = ({ events }) => {
  const formatDate = (date) => {
    return <Time dateTime={date} formatString="MMM d, yyyy" />;
  };

  const buildDescription = (event) => {
    if (!event.description) {
      return '';
    }
    return (
      <>
        :<br />
        {event.description}
      </>
    );
  };

  return (
    <ContentGrid>
      <table className="schedule">
        <tbody>
          {events.map((event, i) => {
            return (
              <tr
                key={event.id}
                className={i % 2 !== 0 ? 'schedule_striped' : ''}
              >
                <td className="schedule_leftmost">
                  {formatDate(event.start?.date)}
                </td>
                <td className="schedule_rightmost">
                  <strong>{event.summary}</strong>
                  {buildDescription(event)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ContentGrid>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
};

export default Calendar;
