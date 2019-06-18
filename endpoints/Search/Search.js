/*global google*/
import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchBarStyle = {};
    this.state = {
      sticky: false,
      heightOffset: 0
    };
  }

  setSearchRef = (element) => {
    this.searchRef = element;
    if (window.__gcse && window.__gcse.callback) {
      window.__gcse.callback();
    }
  };

  componentDidMount() {
    const srchBx = document.getElementById('gsearch');
    if (!srchBx || !srchBx.children.length > 0) {
      this.myCallback = function() {
        if (document.readyState == 'complete') {
          // Document is ready when CSE element is initialized.
          // Render an element with both search box and search results in div with id 'test'.
          google.search.cse.element.render({
            div: 'gsearch',
            tag: 'search'
          });
        } else {
          // Document is not ready yet, when CSE element is initialized.
          google.setOnLoadCallback(function() {
            // Render an element with both search box and search results in div with id 'gsearch'.
            google.search.cse.element.render({
              div: 'gsearch',
              tag: 'search'
            });
          }, true);
        }
      };
    }

    // Insert it before the CSE code snippet so that cse.js can take the script
    // parameters, like parsetags, callbacks.
    window.__gcse = {
      parsetags: 'explicit',
      callback: this.myCallback
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
  }
  render() {
    return (
      <div>
        <div id="gsearch" ref={this.setSearchRef} />
      </div>
    );
  }
}

export default Search;
