import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Calendar from '../endpoints/Calendar/Calendar';
import absoluteUrl from 'next-absolute-url';

const CalendarPage = ({ events }) => {
  return (
    <>
      <h1>Elections 2020 Calendar</h1>
      <Calendar events={events} />
    </>
  );
};

CalendarPage.getInitialProps = async ({ req, res }) => {
  let errorCode;
  const { origin } = absoluteUrl(req);
  const xhr = await fetch(`${origin}/api/calendar/events`);
  const data = await xhr.json();

  if (!data.items) {
    res.status(404);
    errorCode = res.statusCode > 200 ? res.statusCode : false;
  }

  return {
    events: data.items,
    errorCode
  };
};

CalendarPage.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
};

export default CalendarPage;
