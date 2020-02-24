import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

const useData = (api, interval = 60000) => {
  const [results, setResults] = useState(undefined);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(api);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setResults(err.toString());
        throw err;
      }
    };

    const run = async () => {
      let intervalId;
      try {
        await loadData();
        intervalId = setInterval(() => loadData(), interval);
        return intervalId;
      } catch (err) {
        // if loadData() fails, remove the data subscription
        clearInterval(intervalId);
        return intervalId;
      }
    };

    const intervalId = run();

    // remove data subscription when component unmounts
    return () => clearInterval(intervalId);
  }, [interval, api]);

  return results;
};

export default useData;
