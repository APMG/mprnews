import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Teaser, Time } from '@apmg/titan';
import { Link } from '@apmg/titan';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';
import Icon from '../../components/Icons/Icon';

const Updraft = ({ collectionTitle, item }) => {
  let link = linkByTypeHref(item);
  let linkAs = linkByTypeAs(item);

  let moreUpdrafLink = {
    canonicalSlug: 'weather-and-climate/updraft',
    resourceType: 'collection',
  };

  let climateCastLink = {
    canonicalSlug: 'podcasts/climate-cast',
    resourceType: 'collection',
  };

  return (
    <>
      <Heading level={2} elementClass="hdg hdg-3 hdg-section hdg-section-small">
        The Latest from {collectionTitle}
      </Heading>

      <div className="weather_teaser">
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
      </div>
      <Link
        href={linkByTypeHref(moreUpdrafLink)}
        as={linkByTypeAs(moreUpdrafLink)}
        className="btn btn-primary"
      >
        <span>More on Updraft</span> <Icon name="chevronRight" />
      </Link>
      <span className="related_prefix">{link.prefix}</span>
      <Link
        href={linkByTypeHref(climateCastLink)}
        as={linkByTypeAs(climateCastLink)}
        className="btn btn-primary"
      >
        <span>Climate Cast</span> <Icon name="chevronRight" />
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

                <Link
                  href={linkByTypeHref(link.url)}
                  as={linkByTypeAs(link.url)}
                  className="related_link"
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

Updraft.propTypes = {
  collectionTitle: PropTypes.string,
  item: PropTypes.object
};

export default Updraft;
