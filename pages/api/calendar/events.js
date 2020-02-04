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
    electionEvents.items.sort((a, b) => {
      if (a.start?.date < b.start?.date) return -1;
      if (a.start?.date > b.start?.date) return 1;
      return 0;
    });
    cache.set('electionEvents', electionEvents);

    return electionEvents;
  }
};
