import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import Icon from '../../components/Icons/Icon';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';
import query from './contributions.gql';
import initApollo from '../../lib/init-apollo';

export default class ContributionsContainer extends Component {
  static propTypes = {
    initialCollection: PropTypes.object,
    initialPage: PropTypes.number,
    slug: PropTypes.string,
    id: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.client = initApollo();
    this.state = {
      collection: props.initialCollection,
      currentPage: props.initialPage || 1
    };
  }

  urlSlug(pageNum) {
    return `/people/${this.props.slug}/${pageNum}`;
  }

  async handleQuery(pageNum) {
    pageNum = parseInt(pageNum);
    const { slug, id } = this.props;
    const result = await this.client.query({
      query,
      variables: {
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug,
        pageNum,
        id
      }
    });
    this.setState({
      collection: result.data.profile.collection,
      currentPage: pageNum
    });
    window.history.pushState(null, null, this.urlSlug(pageNum));
  }

  render() {
    return (
      <div className="results_container">
        <h3>Recent Contributions</h3>
        <ul>
          {this.state.collection.items.map((item) => {
            const linkHref = linkByTypeHref(item);
            const linkAs = linkByTypeAs(item);
            return (
              <li key={item.id}>
                <Link href={linkHref} as={linkAs} className="contributer">
                  {item.title}
                  {item.descriptionText && <div>{item.descriptionText}</div>}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="profile_pagination">
          <nav className="pagination">
            <div className="pagination_list">
              {this.state.currentPage > 1 && (
                <div className="pagination_page pagination_page-prev">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault;
                      this.handleQuery(this.state.currentPage - 1);
                    }}
                  >
                    <Icon name="chevronLeft" />
                    <span>Prev</span>
                  </button>
                </div>
              )}
              {this.state.currentPage < this.state.collection.totalPages && (
                <div className="pagination_page pagination_page-next">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault;
                      this.handleQuery(this.state.currentPage + 1);
                    }}
                  >
                    <span>Next</span>
                    <Icon name="chevronRight" />
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
