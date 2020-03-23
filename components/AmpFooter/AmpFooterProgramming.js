import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { Heading, Button } from '@apmg/titan';
import { hrefType } from '../../utils/utils';

const ampStyles = {
  header: {
    padding: '15px',
    borderBottom: '2px solid gray'
  },
  footerPodcasts: {
    maxWidth: '400px'
  },
  footerConnect: {
    minWidth: '300px'
  },
  footerProgramming: {
    minWidth: '300px'
  },
  footerUpper: {
    backgroundColor: '#c2f2ff',
    padding: '15px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  list: {
    listStyle: 'none',
    marginLeft: '-30px'
  },
  invisible: { display: 'none' }
};

const AmpFooterProgramming = (props) => {
  const openInNewWindow = () => {
    window.open('/listen', 'Listen Page', 'resizable,height=842,width=776');
  };
  return (
    <div style={ampStyles.footerProgramming}>
      <div>
        <Heading level={3}>{props.title}</Heading>
      </div>
      <div>
        <Button
          href={props.listenHref}
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            openInNewWindow();
          }}
        >
          {props.listenText}
        </Button>
      </div>
      <div>
        <ul style={ampStyles.list}>
          {props.links.map((link) => {
            return (
              <li key={link.href}>
                <Link href={hrefType(link)} as={link.href}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

AmpFooterProgramming.defaultProps = {
  title: 'Program information'
};

AmpFooterProgramming.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string
    })
  ),
  listenHref: PropTypes.string,
  listenText: PropTypes.string
};

export default AmpFooterProgramming;
