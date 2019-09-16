import { showInfoAlert } from './utils';

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
