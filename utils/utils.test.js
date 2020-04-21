import { showInfoAlert, sortByOrder } from './utils';

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
