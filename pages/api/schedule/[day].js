import fetchSchedule from './fetchSchedule';

export default async (req, res) => {
  const {
    query: { day },
  } = req;

  let data = await fetchSchedule(day);
  res.setHeader('Cache-Control', 'public, max-age=60'); // 1 minute
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(data);
};
