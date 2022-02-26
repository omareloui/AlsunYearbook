export function extractFBId(fbLink: string) {
  if (!fbLink.match(/(https?:\/\/)?((www|m)\.)?(fb|facebook)\.com/))
    return fbLink;

  // Valid regular expressions
  const validFbLink = /^(https?:\/\/)?((www|m)\.)?(facebook|fb).com\/(.+)?/;
  const fbIdRegEx = /id=(\d{15})/;

  // Invalid regular expressions
  const absoluteFbLink = /^(https?:\/\/)?((www|m)\.)?(facebook|fb).com\/?$/;
  const invalidProfileFbLink =
    /^(https?:\/\/)?((www|m)\.)?(facebook|fb).com\/profile(\.php)?$/;
  const queryStringsRegEx = /\?.+/;

  // Check if it's not a valid Facebook link or invalid profile link
  if (!fbLink.match(validFbLink) || fbLink.match(invalidProfileFbLink))
    throw new Error(`Please, enter a valid Facebook profile link.`);
  // Check if the link is with no profile link attached to it
  if (fbLink.match(absoluteFbLink))
    throw new Error(`Please, enter a valid Facebook profile link.`);

  // Get out the user id from the link when it's valid link
  // If the id is a number
  const isNumberId = !!fbLink.match(fbIdRegEx);
  if (isNumberId) return fbLink.match(fbIdRegEx)[1];
  // if the id is after the first /
  const fbUri = fbLink.replace(validFbLink, "$5");
  const allRoutes = fbUri
    .split("/")
    .map(route =>
      route.match(queryStringsRegEx)
        ? route.replace(queryStringsRegEx, "")
        : route
    );

  // Check if the first route is not empty or doesn't equal profile and other existing fb links
  if (
    allRoutes[0] === "" ||
    allRoutes[0].match(
      /\/?(profile|pages|groups|marketplace|watch|gaming|saved|events|bookmarks)\/?/
    )
  )
    throw new Error(`Please, enter a valid Facebook profile link.`);

  // Return the fbId
  return allRoutes[0];
}
