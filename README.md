# MPR News v2

## How it was made

This is the first of our apps built with Next.js to help with Server-Side Rendering and Hot Module Reloading, among other things. I started with the `with-apollo` template for `create-next-app`, using the command `create-next-app --example with-apollo mpr-news-next`. The other capabilities we need will be set up by me.

First, I'm going to want our Next app to be able to read in SCSS files and images. To do this, I simply created a `next.config.js` with the following code and downloaded the required packages:

```
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withSass(withImages());
```

These packages simply wrap around Next's build process and add these capabilities. Note: I tried for HOURS to get `node-sass-glob-importer` to work, but to no avail. When I put in print statements it seemed like I should have been able to overwrite their SCSS build process, but nothing worked. It seems like a small enough trade-off for now in the face of all the other gains we'll be making.

I then brought in all of our standard eslint, prettier, and sasslint stuff, adding the `.next` directory to the ignore files where necessary.

### Using Titan (for now)

One issue with using Next is that it renders Reach Router unusable. This, in turn, renders two of our Titan components unusuable: Router and Link. I wrote a version of Titan that uses `next/link` instead, but to use it you'll want to download `apm-titan` yourself, switch to the `with-next` branch, build it with `npm run dev` and use `npm link` to connect it to this project locally for now.

## Checklist (things this app must have)

- [x] SSR
- [x] Tests
- [x] SASS Styles
- [x] PropTypes
- [x] Linting
  - [x] ESLint
  - [x] Sasslint
  - [x] Prettier
- [ ] Basic homepage
  - [x] Amat/Titan/Mimas (our libraries)
  - [ ] GraphQL
- [ ] Build out basic pages
- [ ] Router
  - [ ] Routing to pages
  - [ ] Routing to particular stories
- [ ] Head (with next/head)
  - [ ] The basics
  - [ ] Changes per page
  - [ ] fishForSocialMediaImage?
- [ ] Persistent Audio Player
  - [ ] AudioPlayerButton
- [ ] Google Analytics
- [ ] Set up GitLab CI

## Need Matt's help/input

- [ ] Make sure Audio Player is working correctly

## Need Geoff's help/input

- [ ] Previews
- [ ] HTTP Headers (Etag stuff) (304 if not changed)

## Optional

- [ ] SASS global imports (`withSass()` config doesn't really work)
