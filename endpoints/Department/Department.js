import React from 'react';
import { Heading } from '@apmg/titan';
import { Body } from '@apmg/amat';
import PropTypes from 'prop-types';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import ApmRelatedLinkListItemOverride from '../../components/AmatOverrides/ApmRelatedLinkListItemOverride';
import ApmRelatedLinkOverride from '../../components/AmatOverrides/ApmRelatedLinkOverride';
import LinkOverride from '../../components/AmatOverrides/LinkOverride';
import { Link } from '@apmg/titan';

const Department = ({ data: { department } }) => {
  const formatPhone = (phone) => {
    const match = /^(\d{3})(\d{3})(\d{4})/.exec(phone);
    if (match) return `${match[1]}-${match[2]}-${match[3]}`;
    return phone;
  };

  return (
    <>
      <Metatags
        title={department.title}
        fullSlug={department.canonicalSlug}
        description={department.descriptionText}
        image={fishForSocialMediaImage(department)}
        topic={department?.title}
        contentType="website"
      />
      <section
        className="collection page-purpose"
        data-mpr-content-topic={department.title}
      >
        <div className="collection_header">
          <Heading level={1} className="hdg hdg-section department">
            {department?.title}
          </Heading>
        </div>
        {department?.body && (
          <div className="collection_body userContent">
            <Body
              nodeData={JSON.parse(department.body)}
              embedded={JSON.parse(department.embeddedAssetJson)}
              overrides={{
                link: LinkOverride,
                apm_related_link: ApmRelatedLinkOverride,
                apm_related_link_list_item: ApmRelatedLinkListItemOverride
              }}
            />
          </div>
        )}
        <div className="content_body userContent">
          {department?.results.items
            .filter((item) => item.resourceType == 'profile')
            .map((item) => {
              return (
                <p>
                  <Link
                    href="/people/[...slug]"
                    as={`/people/${item.canonicalSlug}`}
                    className="default"
                  >
                    <strong>{item.title}</strong>
                  </Link>
                  {item.jobTitle && (
                    <>
                      <br />
                      {item.jobTitle}
                    </>
                  )}
                  {item.email && (
                    <>
                      <br />
                      <a href={`mailto:${item.email}`} className="default">
                        {item.email}
                      </a>
                    </>
                  )}
                  {item.phone && (
                    <>
                      <br />
                      <a href={`tel:${item.phone}`}>
                        {formatPhone(item.phone)}
                      </a>
                    </>
                  )}
                </p>
              );
            })}
        </div>
      </section>
    </>
  );
};

Department.propTypes = {
  data: PropTypes.shape({
    department: PropTypes.object
  })
};

export default Department;
