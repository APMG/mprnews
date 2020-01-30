import NodeCache from 'node-cache';
import { getCalendarEvents } from '../../../lib/googleCalendar';

const cache = new NodeCache({
  stdTTL: 600,
  useClones: true
});

export default async (req, res) => {
  const electionEvents = cache.get('electionEvents') || (await fetchEvents());
  res.send(electionEvents);

  async function fetchEvents() {
    const electionEvents = await getCalendarEvents();
    cache.set('electionEvents', electionEvents);

    return electionEvents;
  }
};
