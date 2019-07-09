const { getDateTimes, formatEachDateTime } = require('../utils/scheduleUtils');

module.exports.schedule = (server, app) => {
  // Schedule Routing
  // TODO rework so this endpoint just sends out json
  server.get('/schedule/:day?', (req, res, next) => {
    const daysOfThisWeek = getDateTimes();
    const formattedDate = formatEachDateTime(daysOfThisWeek, req.daySlug);

    const fetchSchedule = async (dateTime) => {
      try {
        return await fetch(
          `http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${dateTime}`
        )
          .then(function(response) {
            if (!response.ok) {
              next();
            }
            return response.json();
          })
          .then(function(response) {
            res.set('Cache-Control', `public, max-age=60`);
            app.render(req, res, '/schedule', {
              slug: req.daySlug,
              props: response
            });
          })
          .catch(function(error) {
            // eslint-disable-next-line
            console.log(error);
          });
      } catch (error) {
        next();
        // eslint-disable-next-line
        console.log(error);
      }
    };
    fetchSchedule(formattedDate);
  });
};
