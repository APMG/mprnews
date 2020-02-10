import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { globals } from '../../config/globals';
import { Teaser, Time } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';
import { secondsToHms, audioDownloadPrefix } from '../../utils/utils';
import AudioPlayButton from '../AudioPlayButton/AudioPlayButton';

const FullTeaser = ({ item, size, newspartners }) => {
  let link = linkByTypeHref(item);
  let linkAs = linkByTypeAs(item);

  if (newspartners) {
    link = link.replace(/story/, 'newspartnerstory');
    linkAs = linkAs.replace(/story/, 'newspartners/story');
  }

  const aspectRatio = size === 'condensed' ? 'thumbnail' : 'widescreen';
  const elementClass = size ? `teaser-${size}` : null;
  const imageSizes = size === 'condensed' ? '120px' : globals.sizes.collection;

  const contributors = (contributorsArr) => {
    if (contributorsArr?.length) {
      return contributorsArr.map((contributor) => {
        return `${
          contributor.profile?.firstName ? contributor.profile.firstName : ''
        } ${contributor.profile?.lastName ? contributor.profile.lastName : ''}`;
      });
    } else {
      return '';
    }
  };

  return (
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
        elementClass={elementClass}
        contributors={contributors(item.contributors)}
        audioPlayButton={
          item.audio && item.audio[0]?.encodings[0]?.playFilePath ? (
            <AudioPlayButton
              audioSource={audioDownloadPrefix(
                item.audio[0].encodings[0].playFilePath
              )}
              audioTitle={item.title}
              label={secondsToHms(item.audio[0].encodings[0].durationMs / 1000)}
            />
          ) : null
        }
        image={
          item.primaryVisuals?.thumbnail ? (
            <Image
              image={item.primaryVisuals?.thumbnail}
              elementClass="content_thumbnail"
              aspectRatio={aspectRatio}
              sizes={imageSizes}
              alt={item.primaryVisuals?.thumbnail?.shortCaption}
            />
          ) : null
        }
        description={item.descriptionText}
      />
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
  );
};

FullTeaser.propTypes = {
  // TODO: define item object proptypes better
  item: PropTypes.object,
  newspartners: PropTypes.bool,
  size: PropTypes.string
};

export default FullTeaser;
