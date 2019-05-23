import { hashFileName } from '../utils/utils';

const mprNewsConfig = {
  slug: 'mpr',
  name: 'Minnesota Public Radio News',
  fallbackImg: hashFileName('/assets/sites/mprnews/fallback.png'),
  domains: ['localhost', 'www-dev.mprnews.org', 'www-stage.mprnews.org'],
  prodDomain: 'https://www.mprnews.org',
  rssUrl: 'https://feeds.publicradio.org/public_feeds/mprnews/rss/rss',
  donateLink:
    'https://contribute.publicradio.org/contribute.php?refId=default&WT.mc_id=news_web_nav_button&WT.mc_ev=click&utm_campaign=membership_contribution&utm_medium=web_nav_button&utm_source=news&utm_content=&utm_term',
  shopLink: 'https://www.publicmediamarket.org/collections/mpr-news',
  contactLink: 'https://www.mpr.org/contact',
  socialLinks: [
    { site: 'twitter', href: 'https://twitter.com/mprnews' },
    { site: 'facebook', href: 'https://www.facebook.com/mprnews' }
  ],
  theme: {
    colorMain: '#f6e600',
    colorMainText: '#000000'
  }
};

export { mprNewsConfig as default };
