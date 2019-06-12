import React from 'react';
import { Heading, Button } from '@apmg/titan';

const FooterSubscribe = () => {
  return (
    <div className="footer_subscribe">
      <div className="footer_header">
        <Heading level={4}>Subscribe to email newsletters</Heading>
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
        <label htmlFor="subscription_request_fsm_Form_Email_Address">
          Enter your email address
          <input
            type="email"
            placeholder="Enter your email address"
            name="subscription_request[fsm][Form_Email_Address]"
            id="subscription_request_fsm_Form_Email_Address"
            required="required"
            maxLength="254"
          />
        </label>
        <Button type="primary" submitForm={true}>
          Sign Up
        </Button>
        <label htmlFor="subscription_request_publication_lists_459">
          <input
            id="subscription_request_publication_lists_459"
            name="subscription_request[publication_lists][459]"
            type="checkbox"
          />
          The Thread
        </label>
        <label htmlFor="subscription_request_publication_lists_1304">
          <input
            id="subscription_request_publication_lists_1304"
            name="subscription_request[publication_lists][1304]"
            type="checkbox"
          />
          The ’sotan
        </label>
        <label htmlFor="subscription_request_publication_lists_528">
          <input
            id="subscription_request_publication_lists_528"
            name="subscription_request[publication_lists][528]"
            type="checkbox"
          />
          Capitol View
        </label>
        <label htmlFor="subscription_request_publication_lists_529">
          <input
            id="subscription_request_publication_lists_529"
            name="subscription_request[publication_lists][529]"
            type="checkbox"
          />
          MPR News Update AM
        </label>
        <label htmlFor="subscription_request_publication_lists_530">
          <input
            id="subscription_request_publication_lists_530"
            name="subscription_request[publication_lists][530]"
            type="checkbox"
          />
          MPR News Update PM
        </label>
      </form>
    </div>
  );
};

export default FooterSubscribe;
