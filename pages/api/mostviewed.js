const { google } = require('googleapis');
const NodeCache = require('node-cache');
const myCache = new NodeCache({
  stdTTL: 600,
  useClones: true,
});

export default async (req, res) => {
  let service_account;
  const analytics = myCache.get('analytics');
  const reporting = google.analyticsreporting('v4');
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
  try {
    service_account = require('../../config/google-api-keyfile.json');
  } catch {
    service_account = {
      client_email: process.env.client_email,
      private_key: process.env.private_key,
      view_id: process.env.view_id,
    };
  }

  const jwt = new google.auth.JWT(
    service_account.client_email,
    null,
    service_account.private_key,
    scopes
  );

  if (analytics == undefined) {
    return fetchMostViewed();
  } else {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.send(analytics);
  }

  function fetchMostViewed() {
    const getReports = async function (reports) {
      await jwt.authorize();

      const request = {
        headers: { 'Content-Type': 'application/json' },
        auth: jwt,
        resource: reports,
      };

      return await reporting.reports.batchGet(request);
    };
    const basic_report = {
      reportRequests: [
        {
          viewId: service_account.view_id,
          dateRanges: [{ startDate: '1daysAgo', endDate: 'today' }],
          metrics: [
            { expression: 'ga:uniquePageviews' },
            { expression: 'ga:sessions' },
          ],
          orderBys: [
            { fieldName: 'ga:uniquePageviews', sortOrder: 'DESCENDING' },
          ],
          dimensions: [{ name: 'ga:pagePath' }, { name: 'ga:pageTitle' }],
          dimensionFilterClauses: [
            {
              filters: [
                {
                  dimensionName: 'ga:pagePath',
                  operator: 'BEGINS_WITH',
                  expressions: ['/story/'],
                },
              ],
            },
          ],
          pageSize: 5,
        },
      ],
    };
    getReports(basic_report)
      .then((response) => {
        if (analytics == undefined) {
          myCache.set('analytics', response.data.reports[0].data, function (
            err,
            success
          ) {
            if (!err && success) {
              res.setHeader('Cache-Control', 'public, max-age=60');
              return res.send(response.data.reports[0].data);
            }
          });
        }
      })
      .catch((e) => {
        myCache.flushAll();
        console.error(e);
      });
  }
};
