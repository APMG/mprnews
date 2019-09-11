module.exports.membershipPotlatch = (server) => {
  server.use(async (req, res, next) => {
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
        // console.log('MEMBERSHIP DATA', response.data);
        req.memberDriveData = JSON.parse(response.data.membershipConfig.json);
        next();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error:', error);
      });
  });
};
