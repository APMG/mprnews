import React from 'react';

const SiteConfigContext = React.createContext({
  slug: '',
  name: '',
  logoSrc: '',
  hosts: [],
  domains: [],
  prodDomain: '',
  rssUrl: '',
  appleSmartBannerId: '',
  donateLink: '',
  socialLinks: [],
  theme: {
    colorBg: '',
    colorFg: ''
  }
});

export default SiteConfigContext;
