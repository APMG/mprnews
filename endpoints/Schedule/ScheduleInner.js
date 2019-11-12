/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Time } from '@apmg/titan';
import ContentGrid from '../../grids/ContentGrid';
import ToSentence from '../../components/ToSentence/ToSentence';

const linkType = (url, typeUrl) => {
  let result;
  let baseUrl = new URL(url);
  baseUrl.hostname.includes('mprnews.org')
    ? (result = parseUrl(baseUrl, typeUrl))
    : (result =
        typeUrl === 'href' ? baseUrl.href : typeUrl === 'as' ? '' : null);
  return result;
};

const parseUrl = (url, typeUrl) => {
  return typeUrl === 'href'
    ? `/collection?slug=${url.pathname.replace(/^\//, '')}`
    : typeUrl === 'as'
    ? url.pathname
    : null;
};

const ScheduleInner = ({ schedule }) => {
  return (
    <ContentGrid>
      <table className="schedule">
        <tbody>
          {Array.isArray(schedule) &&
            schedule.map((program, i) => (
              <tr className={i % 2 !== 0 ? 'schedule_striped' : ''} key={i}>
                <td className="schedule_leftmost">
                  <Time dateTime={program.start_dtim} formatString="h:mm aa" />
                </td>
                {program?.shows.map((show) => {
                  let link = show.link ? show.link : show.external_link;
                  let urlHref = linkType(link, 'href');
                  let urlAs = linkType(link, 'as');
                  return (
                    <td key={show.id} className="schedule_rightmost">
                      <strong>
                        {link && (
                          <Link
                            href={`${urlHref}`}
                            as={`${urlAs}`}
                            className="link link-plain"
                          >
                            {show.name}
                          </Link>
                        )}
                      </strong>{' '}
                      {program?.people.length > 0 && (
                        <>
                          <span>with </span>
                          <ToSentence items={program?.people} />
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </ContentGrid>
  );
};

ScheduleInner.propTypes = {
  schedule: PropTypes.object
};

export default ScheduleInner;
