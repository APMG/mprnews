/*eslint no-console: 0*/
const express = require('express');
const next = require('next');
const port = parseInt(process.env.APP_PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const axios = require('axios')
const { startOfWeek, endOfWeek, eachDay, format } = require('date-fns');
// const {CtoF} = require('./utils/utils')
// import { CtoF } from './utils/utils'

// const {getDateTimes} = require('./utils/scheduleUtils')
// const {formatEachDateTime} = require('./utils/scheduleUtils')

// import { getDateTimes, formatEachDateTime} from './utils/scheduleUtils'

// const {testFunc} = require('./utils/testFunc')
// import { testFunc } from './utils/testFunc'

const slug = (req, res, next) => {
  req.slug = req.path.replace(/^(\/newspartners)*\/(story|episode|page)\//, '');
  next();
}

const daySlug = (req, res, next) => {
  const pathParts = req.path.split('/')
  req.daySlug = pathParts.pop()
  next()
}

const previewSlug = (req, res, next) => {
  req.previewSlug = req.path.replace(/\/preview\/(episodes|stories|page)\//, '');
  next();
}

const previewToken = (req, res, next) => {
  req.previewToken = req.query.token;
  next();
}

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(slug, previewSlug, previewToken, daySlug);

    server.get('/', (req, res) => {
      app.render(req, res, '/index') 
    })
    server.get('/story/*', (req, res) => {
      app.render(req, res, '/story', { slug: req.slug })
    });
    server.get('/newspartners/story/*', (req, res) => {
      app.render(req, res, '/newspartnerstory', { slug: req.slug })
    });

    server.get('/preview/stories/*', (req, res) => {
      app.render(req, res, '/story', { slug: req.previewSlug, previewToken: req.previewToken })
    });

    server.get('/ampstory/*', (req, res) => {
      app.render(req, res, '/ampstory', { slug: req.slug })
    });

    server.get('/episode/*', (req, res) => {
      app.render(req, res, '/episode', { slug: req.slug })
    });

    server.get('/preview/episodes/*', (req, res) => {
      app.render(req, res, '/episode', { slug: req.previewSlug, previewToken: req.previewToken })
    });

    server.get('/ampepisode/*', (req, res) => {
      app.render(req, res, '/ampepisode', { slug: req.slug })
    });

    server.get('/page/*', (req, res) => {
      app.render(req, res, '/page', { slug: req.slug })
    });

    server.get('/preview/pages/*', (req, res) => {
      app.render(req, res, '/page', { slug: req.previewSlug, previewToken: req.previewToken })
    });

    server.get('/amppage/*', (req, res) => {
      app.render(req, res, '/amppage', { slug: req.slug })
    });

    server.get('/schedule/*', (req, res) => {
      // testFunc()

   function getDateTimes() {
        const todaysDate = format(new Date(), 'YYYY-MM-DD');
        const startOfWeekDate = startOfWeek(todaysDate);
        const endOfWeekDate = endOfWeek(todaysDate);
      
        const getEachDayDate = eachDay(
          format(startOfWeekDate, 'YYYY-MM-DD'),
          format(endOfWeekDate, 'YYYY-MM-DD')
        );
        return getEachDayDate;
      }
      
   function formatEachDateTime(dates, daySlug) {
        let results = dates.map((date) => {
          const formatDateWithDay = format(date, 'ddd');
          if (formatDateWithDay.toLowerCase() === daySlug) {
            return format(date, 'YYYY-MM-DD');
          }
        });
        return results;
      }
      const dates = getDateTimes();
      const formattedDate = formatEachDateTime(dates, req.daySlug);
      const fetchSchedule = async (dateTime) => {
        try {
          return await axios.get(`http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${dateTime}`).then(response => {
            console.log('response.data', response.data)
            app.render(req, res, '/schedule', { slug: req.daySlug, props: response.data })
          })
        } catch (error) {
          console.log(error)
        }
      }
      fetchSchedule(formattedDate);  
    });
  
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`\nReady on http://localhost:${port} 🚀\n`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  })
