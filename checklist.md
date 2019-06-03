# Checklist (things this app must have)

- [x] SSR
- [x] Tests
- [x] SASS Styles*
- [x] PropTypes
- [x] Linting
  - [x] ESLint
  - [x] Sasslint
  - [x] Prettier
- [x] Basic homepage
  - [x] Story component*
  - [x] Amat/Titan/Mimas (our libraries)
  - [x] GraphQL
  - [x] Our GraphQL CMS
- [x] Header
- [x] Footer
- [x] Per-podcast Context API
- [ ] Build out basic pages
  - [x] Homepage
    - [x] Hero
    - [x] Promo
    - [x] Recent Episodes
    - [x] Newsletter Form
    - [x] Announcements
    - [x] OtherPodcasts
  - [x] Story page
  - [x] Episode page
  - [ ] About page
  - [ ] Episodes page
  - [ ] Stories page
- [ ] Router
  - [ ] Routing to particular story
  - [ ] Routing to different podcast sites
  - [-] Routing to different pages
- [ ] ~~Helmet~~ Head (with next/head)
  - [x] The basics
  - [ ] Replacement for the Metatag component
  - [ ] fishForSocialMediaImage
- [ ] Persistent Audio Player
  - [ ] AudioPlayerButton
- [ ] Google Analytics
- [ ] Set up GitLab CI

## Need Matt's help/input

- [ ] Make sure Audio Player is working correctly

## Need Geoff's help/input

- [ ] Previews
- [ ] HTTP Headers (Etag stuff) (304 if not changed)
- [ ] Custom 404 handler (do we have one now? Have we ever?)

## Optional

- [ ] SASS global imports (`withSass()` config doesn't really work)
- [ ] Better loading animation from LFH

### Geoff's needs? (I don't know what he meant by a lot of this)

- server side graphql
- Helmet/meta tags
- custom 404 handler
- somewhat more involved template handling
- http headers (aka etags)
- 304 responses if etags have not changed
- express routing (for server site stuff like sitemap and static files)