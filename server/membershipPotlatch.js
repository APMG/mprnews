const NodeCache = require('node-cache');
const membershipCache = new NodeCache({
  stdTTL: 300,
  useClones: true
});

module.exports.membershipPotlatch = (server) => {
  server.use(async (req, res, next) => {
    let cachedMembeDriveData;
    const fetchMemberDriveData = async () => {
      const membershipQuery = JSON.stringify({
        query: `{ membershipConfig:potlatch(slug:"membership/mpr-news-membership") { json }}`
      });
      await fetch(process.env.POTLATCH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: membershipQuery
      })
        .then((response) => {
          if (!response.ok) {
            next();
          }
          return response.json();
        })
        .then((response) => {
          if (!response.data) {
            return next();
          }
          req.memberDriveData = JSON.parse(response.data.membershipConfig.json);
          res.setHeader('Set-Cookie', ['memberdrive=Flintstones']);
          membershipCache.set('memberdrive', req.memberDriveData, (err) => {
            if (err) {
              console.error(err);
            }
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error('Error:', error);
        });
    };

    cachedMembeDriveData = membershipCache.get('memberdrive');
    if (cachedMembeDriveData === undefined) {
      fetchMemberDriveData();
    } else {
      req.memberDriveData = cachedMembeDriveData;
    }
    next();
  });
};
