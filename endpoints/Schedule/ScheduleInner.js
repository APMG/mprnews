/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { format } from 'date-fns';
import ContentGrid from '../../grids/ContentGrid';
import ToSentence from '../../components/ToSentence/ToSentence';

const linkType = (url, typeUrl) => {
  let result;
  let baseUrl = url.split('/');

  baseUrl[2] === 'www.mprnews.org'
    ? (result = parseUrl(baseUrl, typeUrl))
    : (result = typeUrl === 'href' ? url : typeUrl === 'as' ? '' : null);
  return result;
};

const parseUrl = (url, typeUrl) => {
  let result;
  url.splice(0, 3);
  result =
    typeUrl === 'href'
      ? `/collection?slug=${url.join('/')}`
      : typeUrl === 'as'
      ? `/${url.join('/')}`
      : null;
  return result;
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
                  {format(new Date(program.start_dtim), 'h:mm aa')}
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
