import fallback_image from '../../static/opengraph-fallback.png';

const fishForSocialMediaImage = (content) => {
  if (content?.primaryVisuals?.social) {
    return content.primaryVisuals.social.fallback;
  }
  if (content?.primaryVisuals?.lead) {
    return content.primaryVisuals.lead.fallback;
  } else {
    return fallback_image;
  }
};

export { fishForSocialMediaImage };
