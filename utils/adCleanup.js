const adCleanup = function() {
  if (typeof window !== 'undefined') {
    if (window.googletag && window.googletag.apiReady) {
      window.googletag.destroySlots();
    }
  }
};
export default adCleanup;
