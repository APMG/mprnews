import React from 'react';
import { Heading, Button } from '@apmg/titan';

const FooterSubscribe = () => {
  return (
    <div className="footer_subscribe">
      <div className="footer_row">
        <Heading level={3} className="hdg hdg-5">
          Subscribe to email newsletters
        </Heading>
      </div>

      <form
        action="https://mcpostman.publicradio.org/subscription_requests"
        method="post"
      >
        <input
          name="subscription_request[property_key]"
          type="hidden"
          value="c960ba76-aebf-4d61-b185-bf18332dceb4"
        />
        <input
          name="subscription_request[sde_external_key]"
          type="hidden"
          value=""
        />
        <input
          name="subscription_request[form_uid]"
          type="hidden"
          value="MPRNews_AllNewsletter_Sub"
        />
        <input
          name="subscription_request[fsm][Form_Opt_In_Source]"
          type="hidden"
          value="MPR News Newsletter"
        />
        <input
          name="subscription_request[fsm][Form_BusinessUnit]"
          type="hidden"
          value="MPR"
        />
        <label
          htmlFor="subscription_request_fsm_Form_Email_Address"
          className="invisible"
        >
          Enter your email address
        </label>
        <div className="vList vList-condensed">
          <div className="field field-attached">
            <input
              className="field_input"
              type="email"
              placeholder="Enter your email address"
              name="subscription_request[fsm][Form_Email_Address]"
              id="subscription_request_fsm_Form_Email_Address"
              required="required"
              maxLength="254"
            />
            <Button type="primary" submitForm={true}>
              Sign Up
            </Button>
          </div>
        </div>
        <label
          htmlFor="subscription_request_publication_lists_459"
          className="checkbox"
        >
          <input
            id="subscription_request_publication_lists_459"
            name="subscription_request[publication_lists][459]"
            type="checkbox"
            className="checkbox_btn"
          />
          <span className="checkbox_label">The Thread</span>
        </label>
        <label
          htmlFor="subscription_request_publication_lists_1304"
          className="checkbox"
        >
          <input
            id="subscription_request_publication_lists_1304"
            name="subscription_request[publication_lists][1304]"
            type="checkbox"
            className="checkbox_btn"
          />
          <span className="checkbox_label">The ’sotan</span>
        </label>
        <label
          htmlFor="subscription_request_publication_lists_528"
          className="checkbox"
        >
          <input
            id="subscription_request_publication_lists_528"
            name="subscription_request[publication_lists][528]"
            type="checkbox"
            className="checkbox_btn"
          />
          <span className="checkbox_label">Capitol View</span>
        </label>
        <label
          htmlFor="subscription_request_publication_lists_529"
          className="checkbox"
        >
          <input
            id="subscription_request_publication_lists_529"
            name="subscription_request[publication_lists][529]"
            type="checkbox"
            className="checkbox_btn"
          />
          <span className="checkbox_label">MPR News Update AM</span>
        </label>
        <label
          htmlFor="subscription_request_publication_lists_530"
          className="checkbox"
        >
          <input
            id="subscription_request_publication_lists_530"
            name="subscription_request[publication_lists][530]"
            type="checkbox"
            className="checkbox_btn"
          />
          <span className="checkbox_label">MPR News Update PM</span>
        </label>
      </form>
    </div>
  );
};

export default FooterSubscribe;
