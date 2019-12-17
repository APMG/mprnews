# MPR News 

MPR News is, in many ways, our flagship website. It was redesigned and developed in June and July of 2019, and was the first of our projects to use [Next.js](https://nextjs.org/). We started with the `--with-apollo` `create-next-app` template, but we have edited that heavily. We use Apollo to query our CMS's GraphQL endpoint. I'll soon be writing up a blog post on why we ended up going with Next.js, which you'll be able to find on my [website](https://kimthompson.me) and [Medium](https://medium.com). **Update these links when the article is finished**

## Installation

Pull down (this repository)[https://gitlab.mpr.org/sites/v2-mpr-news] from our GitLab. This should bring down a project folder named `v2-mpr-news`. Navigate into that directory (from here on referred to as `/` or root) via terminal and run the command `yarn` to install all the necessary packages. Then, to run the site in development mode, simply run `yarn dev`. You can check it out at (localhost:3000)(http://localhost:3000).

## Google Analytics Set-Up
Login in to LastPass and navigate to Shared-SWAG\Google and locate Google Analytics API - MPR NEWS. In the notes, copy the json. Then create a new file, called google-api-keyfile.json in /config and paste the json from LastPass. 

## File Structure

Next made a lot of decisions for us re: file structure, but here's a quick rundown of how we're doing it:

- **/client** only contains a file that imports `core-js`. `/next.config.js` needs this to configure Webpack and Babel properly. Should we need more polyfills in the future, this is where we'll put them.
- **/components** contains all of the reusable React components that will be used throughout the site.
- **/config** contains not only the ruby files that deploy the site, but the configurations files that outline the appearance of the site itself.
- **/context** contains the two contexts used by our website, Location and Audio 
- **/endpoints** are just components too, but we've separated these because they have a one-to-one relationship with the `/pages` directory. Some of these endpoints, such as the Home endpoint, have been broken up further into other components to keep the file from getting too large. This is where you would to go change the layout of a page.
- **/layouts** is where the Layout components, as well as the Footer and Header it uses, can be found.
- **/lib** contains the `init-apollo.js` file we use to set up our connections to our GraphQL database, as well as the fragment matcher it uses.
- **/pages** contains all of the site's pages. Each file here relates to a route outlined in the `server/server.js` file. This is where GraphQL queries are made, using Next's `getInitialProps()` method as is recommended.
- **/public** simply hosts a bunch of static assets at the root of our site.  For example, if you want to see this site's icon, you could just visit (localhost:3000/favicon.ico)[http://localhost:3000/favicon.ico]. This makes it possible for us to link to different files for each site without having to figure out how to import them via JavaScript. 
- **/server** is where all of the files relating to our Express backend can be found, except for `/server.js` which is used to run the site (see `package.json`).
- **/utils** contains a number of utility functions that can be used throughout the site. Thanks to the `esm` plugin, these can now be used in the backend files as well, and we won't need a separate folder for server utilities.

## Tests & QC

We run ESLint, Sasslint and Prettier as git hooks and with each push as part of GitLab CI. This makes it so that the formatting is consistent and we're not breaking any of the rules we set forth in these configuration files.

GitLab CI also automatically runs our deploy processes anytime you push to master (www-dev), stage (www-stage) and prod (www) respectively.

We have Jest up and running as well, but very few tests. We hope to change this soon, and perhaps even bring in Cypress for UI testing.

## WIP

I learned some stuff from porting the Podcast site to this system that we should likely use here as well:

- [ ] Use the `esm` package so we can use ES6 utils on the server side and get rid of the `/utils/cjsutils.js` file
- [ ] Enable next experimental attributes, then change the `/static` folder into a `/public` folder
- [ ] Move the `/server.js` file into the `/server` and edit `package.json` so it'll still use it to start
- [ ] Split all of the regex slug functions in `server.js` into a separate file for easier reading and reusability
- [ ] Write some gosh darn tests

## Running Docker
To build `docker build -t mprnews:first .`
To run `docker run -d --name foobars -p 3001:3000 mprnews:first`
View logs `docker logs foobars -f`

## Credits

The whole front end team at MPR!

- Geoff Hankerson (lead)
- Kim Thompson (developer & reluctant Next evangelist)
- Matt Aho (developer and designer)
- Andrea Edstrom (developer and designer)
- Jason Phan (developer)
