import React from 'react';

const FooterLower = () => {
  return (
    <div className="footer_lower">
      Minnesota Public Radio
      <small className="footer_copy">
        &copy; {new Date().getFullYear()} Minnesota Public Radio. All rights
        reserved.
      </small>
      <small className="footer_disclaimer">
        Weather data provided by the National Weather Service
      </small>
    </div>
  );
};

export default FooterLower;
