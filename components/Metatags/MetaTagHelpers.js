import fallback_image from '../../static/opengraph-fallback.png';

const fishForSocialMediaImage = (content) => {
  if (content?.primaryVisuals?.social?.aspect_ratios?.widescreen?.instances) {
    return content.primaryVisuals.social.aspect_ratios.widescreen.instances.reduce(
      (acc, cur) => {
        return acc.width > cur.width ? acc : cur;
      }
    );
  }
  if (content?.primaryVisuals?.lead?.aspect_ratios?.widescreen?.instances) {
    return content.primaryVisuals.lead.aspect_ratios.widescreen.instances.reduce(
      (acc, cur) => {
        return acc.width > cur.width ? acc : cur;
      }
    );
  } else {
    return { url: fallback_image };
  }
};

export { fishForSocialMediaImage };
