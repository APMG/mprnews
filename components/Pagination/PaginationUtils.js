// Get the previous index OR min
export function prevIndex(i) {
  return i > 1 ? i - 1 : 1;
}

// Get the next index OR max
export function nextIndex(i, count) {
  return i < count ? i + 1 : count;
}
