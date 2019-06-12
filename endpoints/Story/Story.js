import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { format } from 'date-fns';
import Content from '../../components/Content/Content';
import ContentLayout from '../../layouts/ContentLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import query from './story.gql';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

const Story = ({ slug, previewToken }) => {
  return (
    <Query
      query={query}
      variables={{
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: slug,
        previewToken: previewToken
      }}
    >
      {({ loading, error, data }) => {
        if (error) return <div>Error loading story</div>;
        if (loading) return <Loading />;
        return <StoryInner story={data.story} />;
      }}
    </Query>
  );
};
// array of objects to array
function arrayOfObjectsMap(authors) {
  let nameArray = [];
  authors.forEach((author) => nameArray.push(author.name.trim()));
  console.log('nameArray:', nameArray);
  return nameArray;
}

// arrayToSentence

function arrayToSentence(contributors) {
  if (contributors.length > 1) {
    let results =
      contributors.slice(0, contributors.length - 1).join(', ') +
      ', and ' +
      contributors.slice(-1);
    return results;
  } else return contributors[0];

  // authors.slice(0, authors.length - 1).join(',') + ', and' + authors.slice(-1);
  // // console.log(JSON.stringify(mapAuthors));
  // console.log('params authors', authors);
  // let contributors = [];
  // let pushContributors = [];
  // let newAuthors = authors.forEach((author) =>
  //   pushContributors.push(author.name)
  // );
  // let newArrat =
  //   pushContributors.slice(0, authors.length - 1).join(',') +
  //   ', and' +
  //   authors.slice(-1);
  // console.log(newArrat);
  // authors.forEach((author) =>
  //   contributors.push({
  //     name: author.name,
  //     href: author.href
  //   })
  // );
  // console.log(contributors);
  // return contributors;
  // }
  // console.log(newArray);

  // authors.forEach((author) =>
  //   newArray.push({
  //     name: author.name.replace('null', ','),
  //     href: author.href
  //   })
  // );

  // let newObject = new Object();
  // let contributors = [];
  // authors.forEach(
  //   (author) => (
  //     (newObject.name = author.name.replace('null', ',')),
  //     (newObject.href = author.href)
  //   )
  // );
  // console.log('newObject', newObject);
  // return newObject;
}

const StoryInner = ({ story }) => {
  let authors;

  if (story.contributors) {
    authors = story.contributors.map((contributor) => {
      return {
        // prettier-ignore
        name: `${contributor.profile?.firstName} ${contributor.profile?.lastName ? contributor.profile?.lastName : ''}`,
        href: `/profiles/${contributor.profile?.canonicalSlug}`
      };
    });
  }
  let contributors = arrayOfObjectsMap(authors);
  console.log('this is arrayOfObjectsMap:', contributors);
  let sentence = arrayToSentence(contributors);
  console.log('this is sentence:', sentence);

  const tag = {
    tagName: story.collections.title,
    to: `/topic/${story.collections.canonicalSlug}`
  };
  const socialImage = fishForSocialMediaImage(story);
  const tags = [
    { key: 'description', name: 'description', content: story.descriptionText },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage }
  ];

  return (
    <ContentLayout sidebar={<Sidebar />}>
      <Metatags title={story.title} metatags={tags} links={[]} />
      <Content
        title={story.title}
        authors={authors}
        body={story.body}
        image={
          story.primaryVisuals?.lead && (
            <Image
              key={story.primaryVisuals.lead.fallback}
              image={story.primaryVisuals.lead}
              aspectRatio="uncropped"
              sizes="(max-width: 1100px) 100vw, 1100px"
              alt={story.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={story.primaryVisuals?.lead?.longCaption}
        imageCredit={story.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={story.primaryVisuals?.lead?.credit?.url}
        publishDate={format(story.publishDate, 'MMMM D, YYYY')}
        embeddedAssetJson={story.embeddedAssetJson}
        tag={tag}
        elementClass="story"
      />
    </ContentLayout>
  );
};

Story.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

StoryInner.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        href: PropTypes.string
      })
    ),
    body: PropTypes.string,
    image: PropTypes.element,
    imageCaption: PropTypes.string,
    imageCredit: PropTypes.string,
    imageCreditHref: PropTypes.string,
    publishDate: PropTypes.string,
    embeddedAssetJson: PropTypes.string,
    tag: PropTypes.shape({
      tagName: PropTypes.string,
      to: PropTypes.string
    })
  })
};

export default Story;
