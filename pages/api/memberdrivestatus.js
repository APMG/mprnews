const NodeCache = require('node-cache');
const membershipCache = new NodeCache({
  stdTTL: 300,
  useClones: true,
});

export default (req, res) => {
  async function fetchMemberDriveData() {
    const membershipQuery = JSON.stringify({
      query: `{ membershipConfig:potlatch(slug:"membership/mpr-news-membership") { json }}`,
    });
    let response = await fetch(process.env.POTLATCH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: membershipQuery,
    });
    return await response.json();
  }

  function ret(config) {
    res.setHeader('Cache-Control', 'public, max-age=60'); // 1 minute
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(config.data.membershipConfig.json);
  }

  let memberDriveData = membershipCache.get('memberdrive');
  if (memberDriveData === undefined) {
    //console.log('Cache Miss');
    fetchMemberDriveData().then((response) => {
      membershipCache.set('memberdrive', response, (err) => {
        if (err) {
          //console.error('Error:', err);
        }
      });
      return ret(response);
    });
  } else {
    //console.log('Cache HIT');
    return ret(memberDriveData);
  }
};
