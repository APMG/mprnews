/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from '@apmg/titan';
import classNames from 'classnames';
import Logo from '../Logo/Logo';
import Icon from '../Icons/Icon';
import config from '../Footer/footerConfig';
import AmpFooterLower from './AmpFooterLower';

const AmpFooter = () => {
  const classes = classNames('footer', 'footer-minimal');
  return (
    <footer className={classes}>
      <div className="footer_upper">
        <div className="footer_button">
          <Link href="/" className="btn btn-footer">
            <div className="footer_buttonText">
              <div>For more news, visit</div>
              <Logo elementClass="footerButtonLogo" />
              <span className="invisible">MPR News</span>
            </div>
            <div className="footer_buttonIcon">
              <Icon name="chevronRight" />
            </div>
          </Link>
        </div>
      </div>
      <AmpFooterLower nav={config.nav} />
    </footer>
  );
};

export default AmpFooter;

{
  /* <div className="footer_button">
  <Link href="/">
    <a className="btn btn-footer">
      <div className="footer_buttonText">
        <div>For more news, visit</div>
        <Logo elementClass="footerButtonLogo" />
        <span className="invisible">MPR News</span>
      </div>
      <div className="footer_buttonIcon">
        <Icon name="chevronRight" />
      </div>
    </a>
  </Link>
</div> */
}
