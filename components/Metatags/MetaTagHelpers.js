// if there is  social image and  widescreen  use that
// if not  use the uncropped version of the social image
// If no image at all use the fallback
const fishForSocialMediaImage = (content) => {
  try {
    let img = content?.primaryVisuals?.social?.aspect_ratios?.widescreen
      ? content?.primaryVisuals?.social?.aspect_ratios?.widescreen
      : content?.primaryVisuals?.social?.aspect_ratios?.uncropped;
    return img.instances.reduce((acc, cur) => {
      return acc.width > cur.width ? acc : cur;
    });
  } catch (err) {
    return { url: '/opengraph-fallback.png' };
  }
};

export { fishForSocialMediaImage };
