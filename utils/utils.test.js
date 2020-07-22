import { showInfoAlert, sortByOrder, parseEmbeddedAssets } from './utils';

describe('showInfoAlert', () => {
  test('if info.alert is true and resouceType equals story, expect true', () => {
    const testData = {
      info: {
        alert: true,
        prefix: '',
        show_on: ['story'],
        title: 'this is a title',
        url: 'www.url.com'
      }
    };
    expect(showInfoAlert(testData, 'story')).toEqual(true);
    expect(showInfoAlert(testData, 'episode')).toEqual(false);
    expect(showInfoAlert(testData, 'home')).toEqual(false);
    expect(showInfoAlert(testData, 'collection')).toEqual(false);
  });

  test('if info.alert is true and resouceType equals either story or home, expect true', () => {
    const testData = {
      info: {
        alert: true,
        prefix: '',
        show_on: ['story', 'home'],
        title: 'this is a title',
        url: 'www.url.com'
      }
    };
    expect(showInfoAlert(testData, 'story')).toEqual(true);
    expect(showInfoAlert(testData, 'home')).toEqual(true);
    expect(showInfoAlert(testData, 'episode')).toEqual(false);
    expect(showInfoAlert(testData, 'collection')).toEqual(false);
  });

  test('if info.alert is true and resouceType equals either story, home, collection or episode, expect true', () => {
    const testData = {
      info: {
        alert: true,
        prefix: '',
        show_on: ['story', 'home', 'episode', 'collection'],
        title: 'this is a title',
        url: 'www.url.com'
      }
    };
    expect(showInfoAlert(testData, 'story')).toEqual(true);
    expect(showInfoAlert(testData, 'home')).toEqual(true);
    expect(showInfoAlert(testData, 'episode')).toEqual(true);
    expect(showInfoAlert(testData, 'collection')).toEqual(true);
  });

  test('if info.alert is false and resouceType equals either story, home, collection or episode, expect false', () => {
    const testData = {
      info: {
        alert: false,
        prefix: '',
        show_on: ['story', 'home', 'episode', 'collection'],
        title: 'this is a title',
        url: 'www.url.com'
      }
    };
    expect(showInfoAlert(testData, 'story')).toEqual(false);
    expect(showInfoAlert(testData, 'home')).toEqual(false);
    expect(showInfoAlert(testData, 'episode')).toEqual(false);
    expect(showInfoAlert(testData, 'collection')).toEqual(false);
  });
});

describe('sortByOrder', () => {
  let testFourAuthors = [
    {
      title: 'Chris Graves(4)',
      href: '/profile?slug=chris-graves',
      as: '/people/chris-graves',
      order: '4'
    },
    {
      title: 'Nancy Yang(2)',
      href: '/profile?slug=nancy-yang',
      as: '/people/nancy-yang',
      order: '2'
    },
    {
      title: 'Jason Phan(3)',
      href: '/profile?slug=jason-phan',
      as: '/people/jason-phan',
      order: '3'
    },
    {
      title: 'Geoff Hankerson(1)',
      href: '/profile?slug=geoff-hankerson',
      as: '/people/geoff-hankerson',
      order: '1'
    }
  ];

  let testTwoAuthors = [
    {
      title: 'Chris Graves(2)',
      href: '/profile?slug=chris-graves',
      as: '/people/chris-graves',
      order: '2'
    },
    {
      title: 'Nancy Yang(1)',
      href: '/profile?slug=nancy-yang',
      as: '/people/nancy-yang',
      order: '1'
    }
  ];



  test('if authors is true and has four authors, expect order geoff, nancy, jason, then chris.', () => {
    expect(sortByOrder(testFourAuthors)).toEqual([{"as": "/people/geoff-hankerson", "href": "/profile?slug=geoff-hankerson", "order": "1", "title": "Geoff Hankerson(1)"}, {"as": "/people/nancy-yang", "href": "/profile?slug=nancy-yang", "order": "2", "title": "Nancy Yang(2)"}, {"as": "/people/jason-phan", "href": "/profile?slug=jason-phan", "order": "3", "title": "Jason Phan(3)"}, {"as": "/people/chris-graves", "href": "/profile?slug=chris-graves", "order": "4", "title": "Chris Graves(4)"}]);
  });
  test('if authors is true and has two authors, expect order nancy, then chris.', () => {
    expect(sortByOrder(testTwoAuthors)).toEqual([{"as": "/people/nancy-yang", "href": "/profile?slug=nancy-yang", "order": "1", "title": "Nancy Yang(1)"}, {"as": "/people/chris-graves", "href": "/profile?slug=chris-graves", "order": "2", "title": "Chris Graves(2)"}]);
  });
  test('if authors is false and has zero authors, expect empty string.', () => {
    expect(sortByOrder('')).toEqual("");
  });
});

describe('parseEmbedAssets', () => {
  let data = {
    embededAssets: {
      "audio": "[]",
      "attachments": "[]",
      "images": "[{\"image\":\"image1\"}, {\"image\":\"image2\"}]",
      "oembeds": "[{\"url\":\"https://twitter.com/Twins/status/1273964897219555328\",\"author_name\":\"Minnesota Twins\",\"author_url\":\"https://twitter.com/Twins\",\"html\":\"\\u003cblockquote class=\\\"twitter-tweet\\\"\\u003e\\u003cp lang=\\\"en\\\" dir=\\\"ltr\\\"\\u003eThe \\u003ca href=\\\"https://twitter.com/hashtag/MNTwins?src=hash\\u0026amp;ref_src=twsrc%5Etfw\\\"\\u003e#MNTwins\\u003c/a\\u003e removed the Calvin Griffith statue from Target Field this morning. \\u003ca href=\\\"https://t.co/K044WNP7Ys\\\"\\u003epic.twitter.com/K044WNP7Ys\\u003c/a\\u003e\\u003c/p\\u003e\\u0026mdash; Minnesota Twins (@Twins) \\u003ca href=\\\"https://twitter.com/Twins/status/1273964897219555328?ref_src=twsrc%5Etfw\\\"\\u003eJune 19, 2020\\u003c/a\\u003e\\u003c/blockquote\\u003e\\n\\u003cscript async src=\\\"https://platform.twitter.com/widgets.js\\\" charset=\\\"utf-8\\\"\\u003e\\u003c/script\\u003e\\n\",\"width\":550,\"height\":null,\"type\":\"rich\",\"cache_age\":\"3153600000\",\"provider_name\":\"Twitter\",\"provider_url\":\"https://twitter.com\",\"version\":\"1.0\"}]"
    }
  }

  test('return the correct object and modifies the original argument', () => {
    const expected = {
      audio: [],
      attachments: [],
      images: [{
        image: "image1"
      }, {
        image: "image2"
      }],
      oembeds: [{
        url: "https://twitter.com/Twins/status/1273964897219555328",
        author_name: "Minnesota Twins",
        author_url: "https://twitter.com/Twins",
        html: "<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">The <a href=\"https://twitter.com/hashtag/MNTwins?src=hash&amp;ref_src=twsrc%5Etfw\">#MNTwins</a> removed the Calvin Griffith statue from Target Field this morning. <a href=\"https://t.co/K044WNP7Ys\">pic.twitter.com/K044WNP7Ys</a></p>&mdash; Minnesota Twins (@Twins) <a href=\"https://twitter.com/Twins/status/1273964897219555328?ref_src=twsrc%5Etfw\">June 19, 2020</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
        width: 550,
        height: null,
        type: "rich",
        cache_age: "3153600000",
        provider_name: "Twitter",
        provider_url: "https://twitter.com",
        version: "1.0"
      }]
    };

    const result = parseEmbeddedAssets(data.embededAssets);
    expect(result).toEqual(expected);
    expect(data.embededAssets).toEqual(result);
  });
  
  	
});
