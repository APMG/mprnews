import React, { useEffect } from 'react';

const Newsletter = () => {
  useEffect(() => {
    (function() {
      const scr = document.createElement('script');
      scr.type = 'text/javascript';
      scr.async = true;
      scr.src = 'https://www.google.com/recaptcha/api.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(scr, firstScript);
    })();
  }, []);

  const siteKey = '6Lcot4kUAAAAAOPLJE2ikJTVcq50pQgSqEkBzAYb';

  return (
    <div className="contentGrid">
      <div className="contentGrid_main">
        <h1 className="hdg hdg-1 hdg-headline">
          Subscribe to Email Newsletters
        </h1>

        <div className="content_body">
          <form
            action="https://mcpostman.publicradio.org/subscription_requests_plus"
            className="mcpostman-form"
            method="post"
          >
            <input
              name="subscription_request[property_key]"
              value="c960ba76-aebf-4d61-b185-bf18332dceb4"
              type="hidden"
            />
            <input
              name="subscription_request[sde_external_key]"
              value=""
              type="hidden"
            />
            <input
              name="subscription_request[form_uid]"
              value="MPRNews_AllNewsletter_Sub"
              type="hidden"
            />
            <input
              name="subscription_request[fsm][Form_Opt_In_Source]"
              value="MPR News Newsletter"
              type="hidden"
            />
            <input
              name="subscription_request[fsm][Form_BusinessUnit]"
              value="MPR"
              type="hidden"
            />
            <p>
              <label htmlFor="subscription_request[fsm][Form_Email_Address]">
                Email Address*
              </label>
              <input
                placeholder="Enter your email address"
                name="subscription_request[fsm][Form_Email_Address]"
                id="subscription_request_fsm_Form_Email_Address"
                required="required"
                maxLength="254"
                className="field_input"
                type="email"
              />{' '}
            </p>
            <p>
              <label htmlFor="subscription_request[fsm][Form_PostalCode]">
                ZIP Code
              </label>
              <input
                placeholder="Enter your zip code"
                name="subscription_request[fsm][Form_PostalCode]"
                id="subscription_request_fsm_Form_PostalCode"
                required="required"
                maxLength="20"
                className="field_input"
                type="text"
              />{' '}
            </p>
            <h4>Choose the email newsletters you wish to receive:</h4>
            <div className="field-wrapper">
              <label
                htmlFor="subscription_request[publication_lists][459]"
                className="checkbox"
              >
                <input
                  name="subscription_request[publication_lists][459]"
                  type="checkbox"
                  className="checkbox_btn"
                />{' '}
                The Thread
              </label>
              <div className="label_description">
                Kerri Miller&lsquo;s exclusive weekly book pick, along with
                literary news and event details. Delivered Fridays.
              </div>
              <br />
            </div>
            <div className="field-wrapper">
              <label
                htmlFor="subscription_request[publication_lists][1304]"
                className="checkbox"
              >
                <input
                  name="subscription_request[publication_lists][1304]"
                  type="checkbox"
                  className="checkbox_btn"
                />{' '}
                The &lsquo;sotan
              </label>
              <div className="label_description">
                Have a better weekend with The &lsquo;sotan. Get book, movie and
                festival recommendations, plus learn more about this great state
                and the people who live here.
              </div>
              <br />{' '}
            </div>
            <div className="field-wrapper">
              <label
                htmlFor="subscription_request[publication_lists][528]"
                className="checkbox"
              >
                <input
                  name="subscription_request[publication_lists][528]"
                  type="checkbox"
                  className="checkbox_btn"
                />{' '}
                Capitol View
              </label>
              <div className="label_description">
                Each day, The Capitol View&lsquo;s writers give you links to
                must-read articles from around the Minnesota region.
              </div>
              <br />{' '}
            </div>
            <div className="field-wrapper">
              <label
                htmlFor="subscription_request[publication_lists][529]"
                className="checkbox"
              >
                <input
                  name="subscription_request[publication_lists][529]"
                  type="checkbox"
                  className="checkbox_btn"
                />{' '}
                MPR News Update AM
              </label>
              <div className="label_description">
                The top stories and regional headlines. Delivered weekday
                mornings.
              </div>
              <br />{' '}
            </div>
            <div className="field-wrapper">
              <label
                htmlFor="subscription_request[publication_lists][530]"
                className="checkbox"
              >
                <input
                  name="subscription_request[publication_lists][530]"
                  type="checkbox"
                  className="checkbox_btn"
                />{' '}
                MPR News Update PM
              </label>
              <div className="label_description">
                The top stories and regional headlines. Delivered weekday
                afternoons.
              </div>
              <br />{' '}
            </div>
            <div className="g-recaptcha" data-sitekey={siteKey}></div>
            <br />{' '}
            <input
              value="Sign Up"
              className="btn btn-primary"
              type="submit"
            />{' '}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
