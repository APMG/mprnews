import React from 'react';

const SiteConfigContext = React.createContext({
  slug: '',
  name: '',
  logoTile: '',
  hosts: [],
  domains: [],
  prodDomain: '',
  rssUrl: '',
  appleSmartBannerId: '',
  donateLink: '',
  contactLink: '',
  socialLinks: [],
  theme: {
    colorMain: '',
    colorMainText: ''
  },
  sponsorLink: ''
});

export default SiteConfigContext;
