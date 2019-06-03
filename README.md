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

## Checklist (things this app must have)

- [x] SSR
- [ ] Tests
- [ ] SASS Styles
- [ ] PropTypes
- [ ] Linting
  - [ ] ESLint
  - [ ] Sasslint
  - [ ] Prettier
- [ ] Basic homepage
  - [ ] Amat/Titan/Mimas (our libraries)
  - [ ] GraphQL
  - [ ] Our GraphQL CMS
- [ ] Header
- [ ] Footer
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
