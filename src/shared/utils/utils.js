// Truncate a string
export function truncate(sentence, wordCount) {
  const defaultWordCount = 10;
  const characterMatch = /[.,-_;:/!?]$/;
  let array = sentence.split(' ');
  let joined = '';

  // Return early
  if (array.length <= wordCount) return sentence;

  // Set default word count
  if (typeof wordCount === 'undefined') {
    wordCount = defaultWordCount;
  }

  joined = array.slice(0, wordCount).join(' ');

  // Remove punctuation from the last word
  joined = joined.replace(characterMatch, '');

  return joined + '...';
}

// truncates the text portion of an AMAT readout
export function truncateAmat(json) {
  let newJson = json;
  newJson.content[0].content[0].text = truncate(
    newJson.content[0].content[0].text,
    18
  );
  return newJson;
}

// Capitalize the first letter of a string
export function capitalizeFirstLetter(string) {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}
