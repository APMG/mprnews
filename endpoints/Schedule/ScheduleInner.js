/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { format } from 'date-fns';
import ContentGrid from '../../grids/ContentGrid';
import ToSentence from '../../components/ToSentence/ToSentence';

// import { hrefType, hrefTypeAs } from '../../utils/utils';

// const parseUrl = (url) => {
//   let result;

//   let baseUrl = url.link.split('/');
//   result = baseUrl[2];
//   //   console.log('baseUrl', baseUrl[2]);
//   //   baseUrl.splice(0, 2)
//   // console.log(baseUrl)

//   // check if url has mpr
//   // parse link

//   // url.link === /www.mprnews.org/
//   //   ? console.log('link matches: true')
//   //   : console.log('link does not matces');

//   // url.link ? (result = `${baseUrl[baseUrl.length - 2]}/${baseUrl[baseUrl.length - 1]}`)
//   // : (result = url.link);
//   console.log('results', result);
//   return result;
// };

const parseUrl = (url, typeUrl) => {
  let result;
  let baseUrl = url.split('/');

  baseUrl[2] === 'www.mprnews.org'
    ? (result = clean(baseUrl, typeUrl))
    : (result = typeUrl === 'href' ? url : typeUrl === 'as' ? url : null);
  return result;
};

const clean = (url, typeUrl) => {
  let result;
  url.splice(0, 3);
  result =
    typeUrl === 'href'
      ? `/collection?slug=${url.join('/')}`
      : typeUrl === 'as'
      ? `/${url.join('/')}`
      : null;

  console.log('urls after cleaned', result);
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
                  <time>{format(program.start_dtim, 'h:mm a')}</time>
                </td>
                {program?.shows.map((show) => {
                  let link = show.link ? show.link : show.external_link;
                  let urlHref = parseUrl(link, 'href');
                  let urlAs = parseUrl(link, 'as');
                  console.log('link:', urlHref, urlAs);

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
