import React from 'react';
import PropTypes from 'prop-types';
import ContentGrid from '../../grids/ContentGrid';
import { Time } from '@apmg/titan';
import { Link, Button } from '@apmg/titan';

const Calendar = ({ events }) => {
  const formatDate = (date) => {
    return <Time dateTime={`${date}T00:00:00`} formatString="MMM d, yyyy" />;
  };

  const buildDescription = (event) => {
    if (!event.description) {
      return '';
    }
    return (
      <>
        :<br />
        <div dangerouslySetInnerHTML={createMarkup(event.description)} />
      </>
    );
  };

  function createMarkup(markup) {
    return { __html: markup };
  }
  // className="btn btn-small"
  const downloadLinks = () => {
    return (
      <div className="calendar_nav">
        <Link href="https://calendar.google.com/calendar/ical/vvpnqdar9fn0glak7hsqtkslto%40group.calendar.google.com/public/basic.ics">
          <Button className="btn calendar_nav_item">Download Calendar</Button>
        </Link>
        <Link href="webcal://calendar.google.com/calendar/ical/vvpnqdar9fn0glak7hsqtkslto%40group.calendar.google.com/public/basic.ics">
          <Button className="btn calendar_nav_item">
            Import to Iphone Calendar
          </Button>
        </Link>
        <Link href="https://calendar.google.com/calendar/r?cid=webcal://calendar.google.com/calendar/ical/vvpnqdar9fn0glak7hsqtkslto%40group.calendar.google.com/public/basic.ics">
          <Button className="btn calendar_nav_item">
            Import to Google Calendar
          </Button>
        </Link>
      </div>
    );
  };
  return (
    <ContentGrid sidebar={downloadLinks()}>
      <table className="schedule">
        <tbody>
          {events
            .filter((event) => event.start.date)
            .sort((a, b) => new Date(a.start.date) - new Date(b.start.date))
            .map((event, i) => {
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
  events: PropTypes.arrayOf(PropTypes.object),
};

export default Calendar;
