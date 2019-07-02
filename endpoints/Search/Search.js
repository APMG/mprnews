/*global google*/
import React, { useEffect } from 'react';

const Search = () => {
  const setSearchRef = () => {
    if (window.__gcse && window.__gcse.callback) {
      window.__gcse.callback();
    }
  };

  const myCallback = () => {
    const gsearch = document.getElementById('gsearch');
    if (gsearch.children.length === 0) {
      if (document.readyState == 'complete') {
        // Document is ready when CSE element is initialized.
        // Render an element with both search box and search results in div with id 'test'.
        google.search.cse.element.render({
          div: 'gsearch',
          tag: 'search'
        });
      } else {
        // Document is not ready yet, when CSE element is initialized.
        if (typeof google === 'undefined') {
          return;
        }
        google.setOnLoadCallback(function() {
          // Render an element with both search box and search results in div with id 'gsearch'.
          google.search.cse.element.render({
            div: 'gsearch',
            tag: 'search'
          });
        }, true);
      }
    }
  };
  useEffect(() => {
    // Insert it before the CSE code snippet so that cse.js can take the script
    // parameters, like parsetags, callbacks.
    window.__gcse = {
      parsetags: 'explicit',
      callback: myCallback
    };

    (function() {
      var cx = '009362219672105805737:m-ja7wfb1tc'; // Insert your own Custom Search engine ID here
      var gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
    })();
  });
  return (
    <div>
      <div id="gsearch" ref={setSearchRef} />
    </div>
  );
};

export default Search;
