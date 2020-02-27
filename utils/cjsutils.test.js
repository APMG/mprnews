import { analyzeUrl } from './cjsutils';

describe('analyzeUrl', () => {
  test('url https://www.mprnews.org/', () => {
    const url = 'https://www.mprnews.org/';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: true,
      href: '/',
      as: '/'
    });
  });

  test('url https://www.mprnews.org/schedule', () => {
    const url = 'https://www.mprnews.org/schedule';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: true,
      href: '/schedule',
      as: '/schedule'
    });
  });

  test('url https://www.mprnews.org/schedule/mon', () => {
    const url = 'https://www.mprnews.org/schedule/mon';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: true,
      href: '/schedule/[day]',
      as: '/schedule/mon'
    });
  });

  test('url https://www.mprnews.org/story/2020/02/27/new-study-finds-false-equals-true', () => {
    const url = 'https://www.mprnews.org/story/2020/02/27/new-study-finds-false-equals-true';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: true,
      href: '/story/[...slug]',
      as: '/story/2020/02/27/new-study-finds-false-equals-true'
    });
  });

  test('url https://www.google.com', () => {
    const url = 'https://www.google.com';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: false,
      href: 'https://www.google.com'
    });
  });

  test('url https://www.mprnews.org/people/brian-bakst', () => {
    const url = 'https://www.mprnews.org/people/brian-bakst';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: true,
      href: '/people/[...slug]',
      as: '/people/brian-bakst'
    });
  });

  test('url https://www.mprnews.org/episode/episode-one', () => {
    const url = 'https://www.mprnews.org/episode/episode-one';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: true,
      href: '/episode/[...slug]',
      as: '/episode/episode-one'
    });
  });

  test('url https://www.mprnews.org/about', () => {
    const url = 'https://www.mprnews.org/about';
    const result = analyzeUrl(url);
    expect(result).toEqual({
      isInternal: true,
      href: '/[...slug]',
      as: '/about'
    });
  });
});