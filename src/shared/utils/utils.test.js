import { truncate, capitalizeFirstLetter } from './utils';

const paragraph =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('truncate()', () => {
  test('returns the truncated sentence with the correct number of words', () => {
    expect(truncate(paragraph, 4)).toBe('Lorem ipsum dolor sit...');
  });

  test('returns an empty string if sentence argument is empty', () => {
    expect(truncate('', 5)).toBe('');
  });

  test('returns ten words by default if wordCount argument is missing', () => {
    expect(truncate(paragraph)).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'
    );
  });

  test('does not add ellipsis if sentence is shorter than wordCount', () => {
    expect(truncate('Lorem ipsum', 10)).toBe('Lorem ipsum');
    expect(truncate('Lorem ipsum', 2)).toBe('Lorem ipsum');
  });

  test('removes punctuation if it falls at the end of the last word', () => {
    // Currently works with the following characters: .,-_;:/!?
    expect(truncate(paragraph, 5)).toBe('Lorem ipsum dolor sit amet...');
  });
});

describe('capitalizeFirstLetter()', () => {
  test('capitalizes a lowercase string', () => {
    expect(capitalizeFirstLetter('lorem ipsum')).toBe('Lorem ipsum');
  });

  test('doesn`t error if the string starts with a number', () => {
    expect(capitalizeFirstLetter('12 rabbits')).toBe('12 rabbits');
  });

  test('returns an empty string if the argument isn`t a string', () => {
    expect(capitalizeFirstLetter(555)).toBe('');
    expect(capitalizeFirstLetter(true)).toBe('');
    expect(capitalizeFirstLetter({})).toBe('');
  });
});
