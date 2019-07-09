/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Logo from '../Logo/Logo';
import Icon from '../Icons/Icon';
import config from '../Footer/footerConfig';
import { Heading } from '@apmg/titan';
import FooterApps from '../Footer/FooterApps';
import FooterContact from '../Footer/FooterContact';
import FooterLower from '../Footer/FooterLower';
import FooterPodcasts from '../Footer/FooterPodcasts';
import FooterSubscribe from '../Footer/FooterSubscribe';
import FooterProgramming from '../Footer/FooterProgramming';

const MinimalFooter = () => {
  const classes = classNames('footer', 'footer-minimal');
  return (
    <footer className={classes}>
      <div className="footer_upper">
        <div className="footer_button">
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
        </div>
      </div>
      <FooterLower nav={config.nav} />
    </footer>
  );
};

export default MinimalFooter;

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
