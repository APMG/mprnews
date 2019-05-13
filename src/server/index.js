import express from 'express';
import http from 'http';
import Graceful from 'node-graceful';
import ReactAppSsr from './ReactAppSsr';
import axios from 'axios';
const server = express();
const APP_PORT = process.env.APP_PORT || 4000;

const filepath =
  process.env.APP_PATH === 'relative' ? 'build' : 'current/mprnews/build';

server.use('/assets', express.static(`${filepath}/assets`));
server.set('trust proxy', true);

// Set the route for the root directory
server.use('/server', hello);

// This is what happens when any user requests '/'
function hello(req, res) {
  const officeSlug = 'mpx';

  const url = `https://api.weather.gov/gridpoints/${officeSlug}/109,67/forecast`;

  axios
    .get(url)
    .then((res) => {
      console.log('server HTTP Request:', res.data);
      return res.send(res.data);
    })
    .catch((error) => {
      res.send(error);
    });
}

// const getWeather = (req, res) => {
//   const officeSlug = 'mpx';
//   const url = `https://api.weather.gov/gridpoints/${officeSlug}/109,67/forecast`;
//   axios
//     .get(url)
//     .then((response) => {
//       console.log('server HTTP Request:', response.data);
//       // return res.send(res.data);
//     })
//     .catch((error) => {
//       res.send(error);
//     });
// };
// getWeather();

ReactAppSsr(server);

const httpServer = http.createServer(server).listen(APP_PORT, (error) => {
  if (error) {
    // eslint-disable-next-line
    console.error(error);
  }
  console.log(`🚀 http server started on port ${APP_PORT}`); // eslint-disable-line
});

Graceful.on('exit', (done, event, signal) => {
  // eslint-disable-next-line
  console.log(`Received exit signal: ${signal}`);
  httpServer.close(() => {
    // eslint-disable-next-line
    console.log('Closed all connections. Safe to exit');
    done();
  });
});

let currentApp = server;
if (module.hot) {
  // eslint-disable-next-line
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    // console.log("🔁  HMR Reloading `./server`...");
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
