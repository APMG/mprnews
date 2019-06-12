export default {
  appsTitle: 'MPR News apps for Android and iOS',
  appsImg: '/static/app-news.jpg',
  apps: [
    {
      image: '/static/badge-app-store.svg',
      href: 'https://itunes.apple.com/us/app/mpr-news/id400286612',
      label: 'Download MPR News on the App Store'
    },
    {
      image: '/static/badge-google-play.svg',
      href: 'https://play.google.com/store/apps/details?id=org.mpr.mprnews',
      label: 'Get MPR News on Google Play'
    },
    {
      href: 'https://itunes.apple.com/us/app/mpr-radio/id291121605',
      label: 'MPR Radio for iOS'
    },
    {
      href:
        'https://play.google.com/store/apps/details?id=org.americanpublicmedia.publicradio',
      label: 'MPR Radio for Android'
    }
  ],
  contact: [
    { icon: 'twitter', label: '@MPRNews', href: 'https://twitter.com/mprnews' },
    {
      icon: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/MPRnews'
    },
    { label: 'newsroom@mpr.org', href: 'mailto:newsroom@mpr.org' },
    { label: 'Tips: 651-290-1424', href: 'tel:+16512901424' }
  ],
  listenHref: '/listen',
  listenText: 'Listen Live',
  podcastTitle: 'MPR News Podcasts',
  podcastText:
    'Check out MPR News podcasts from the award-winning 74 Seconds to in-depth conversations on news and culture with Kerri Miller and our daily news updates.',
  podcastLinkHref: '/podcasts',
  podcastLinkLabel: 'All Podcasts',
  programmingLinks: [
    { label: 'Program Schedule', href: '/schedule' },
    { label: 'Station Directory', href: 'https://www.mpr.org/listen/stations' },
    { label: 'Audio Help', href: 'https://www.mpr.org/about/faqs' }
  ]
};
