import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Heading } from 'apm-titan';
import { format } from 'date-fns';
import { Body } from 'amat-react';

const Page = (props) => {
  const { page } = props.data;

  if (props.data.loading) return <Loading />;
  if (props.data.error) return <div>Error</div>;
  return (
    <>
      <section className="page section">
        <div className="content">
          <div className="content_date">
            {format(page.publishDate, 'MMMM D, YYYY')}
          </div>
          <Heading level={1} elementClass="hdg-podcast">
            {page.title}
          </Heading>
          <div className="content_body">
            <Body
              nodeData={JSON.parse(page.body)}
              embedded={JSON.parse(page.embeddedAssetJson)}
            />
          </div>
        </div>
      </section>
    </>
  );
};

Page.propTypes = {
  data: PropTypes.object
};

export default Page;
