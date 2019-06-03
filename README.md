# MPR News v2

## How it was made

This is the first of our apps built with Next.js to help with Server-Side Rendering and Hot Module Reloading, among other things. I started with the `with-apollo` template for `create-next-app`, using the command `create-next-app --example with-apollo mpr-news-next`. The other capabilities we need will be set up by me.

First, I'm going to want our Next app to be able to read in SCSS files and images. To do this, I simply created a `next.config.js` with the following code and downloaded the required packages:

```
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withSass(withImages());
```

These packages simply wrap around Next's build process and add these capabilities. Note: I tried for HOURS to get `node-sass-glob-importer` to work, but to no avail. When I put in print statements it seemed like I should have been able to overwrite their SCSS build process, but nothing worked. It seems like a small enough trade-off for now in the face of 

## Checklist

