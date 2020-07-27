import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Teaser, Time } from '@apmg/titan';
import { Link } from '@apmg/titan';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';

const Updraft = ({ item }) => {
  let link = linkByTypeHref(item);
  let linkAs = linkByTypeAs(item);
  return (
    <>
      <Heading level={2} elementClass="hdg hdg-section">
        {'Updraft with Paul Huttner'}
      </Heading>
      <hr />
      <div className="teaserContainer">
        <Teaser
          id={item.id}
          title={item.title}
          href={link}
          as={linkAs}
          publishDate={
            item.publishDate && (
              <Time
                elementClass="teaser_time"
                dateTime={item.publishDate}
                formatString="MMMM d, yyyy h:mm aaaa"
              />
            )
          }
          headingLevel={2}
          description={item.descriptionText}
        />
        <Link href={'/weather-and-climate/updraft'} className="related_link">
          More on Updraft
        </Link>
        <span className="related_prefix">{link.prefix}</span>
        <Link href={'/podcasts/climate-cast'} className="related_link">
          Climate Cast
        </Link>

        {item.collectionRelatedLinks?.length ? (
          <ul className="related related-teaser">
            {item.collectionRelatedLinks.map((link) => {
              return (
                <li
                  className="related_item"
                  key={`${link.url}${link.title}${link.prefix}`}
                >
                  <span className="related_prefix">{link.prefix}</span>
                  <Link href={link.url} className="related_link">
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
};

Updraft.propTypes = {
  item: PropTypes.object
};

export default Updraft;
