
export const site = {
  slug: 'mpr',
  name: 'Minnesota Public Radio',
  domains: [
    'mprnews.org',
    'www-dev.mprnews.org',
    'www-stage.mprnews.org',
    'www.mprnews.org',
    'origin-www.mprnews.org'
  ],
  prodDomain: 'https://www.mprnews.org',
  rssUrl:
    'https://feeds.publicradio.org/public_feeds/mprnews/rss/rss',
  donateLink:
    'https://contribute.publicradio.org/contribute.php?refId=default&WT.mc_id=news_web_nav_button&WT.mc_ev=click&utm_campaign=membership_contribution&utm_medium=web_nav_button&utm_source=news&utm_content=&utm_term',
  shopLink:
    'https://www.publicmediamarket.org/collections/mpr-news',
  contactLink: 'https://www.mpr.org/contact',
  socialLinks: [
    { site: 'instagram', href: 'https://www.instagram.com/ttfapodcast' },
    { site: 'google', href: 'https://plus.google.com/115839926764856834229'},
    { site: 'twitter', href: 'https://twitter.com/mpr' },
    { site: 'facebook', href: 'https://www.facebook.com/MinnesotaPublicRadio' }
  ],
  theme: {
    colorMain: '#f6e600',
    colorMainText: '#000000'
  },
}

export const collectionConfig = {
  newsCoverage: [
    {name: 'Arts', path: "/topic/arts-and-culture"}, 
    {name: 'Books', path: "/topic/arts-and-culture/books"},
    {name: 'Business', path: "/topic/disaster/business-and-economics"},
    {name: 'Education', path: "/topic/education"},
    {name: 'Environment', path: "/topic/environment"},
    {name: 'Health', path: "/topic/health"},
    {name: 'Lifestyle', path: "/topic/arts-and-culture/lifestyle"},
    {name: 'Politics', path: "/topic/politics-and-government"}  
  ]
}

export const weatherConfig = [
    {
      id: 'MSP',
      name: 'MSP Airport',
      lat: '44.8848',
      long: '-93.2223',
      forecastOffice: 'MPX'
    },
    {
      id: 'SP',
      name: 'St.Paul, MN',
      lat: '44.9537',
      long: '-93.0900',
      forecastOffice: 'MPX'
    },
    {
      id: 'BEM',
      name: 'Bemidji, MN',
      lat: '47.4716',
      long: '-94.8827',
      forecastOffice: 'FGF'
    },
    {
      id: 'BRA',
      name: 'Brainerd, MN',
      lat: '46.3527',
      long: '-94.2020',
      forecastOffice: 'DLH'
    },
    {
      id: 'DUL',
      name: 'Duluth, MN',
      lat: '46.7867',
      long: '-92.1005',
      forecastOffice: 'DLH'
    },
    {
      id: 'ELY',
      name: 'Ely, MN',
      lat: '47.9032',
      long: '-91.8671',
      forecastOffice: 'DLH'
    },
    {
      id: 'EAU',
      name: 'Eau Claire, WI',
      lat: '44.8113',
      long: '-91.4985',
      forecastOffice: 'MPX'
    },
    {
      id: 'FAR',
      name: 'Fargo, ND',
      lat: '46.8772',
      long: '-96.7898',
      forecastOffice: 'FGF'
    },
    {
      id: 'GRA',
      name: 'Grand Forks, ND',
      lat: '47.9253',
      long: '-97.0329',
      forecastOffice: 'FGF'
    }
  ]