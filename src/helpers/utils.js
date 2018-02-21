export function getAuthInfoFromJWT(request) {
  const {auth : {artifacts, credentials : {payload : {sub}}}} = request;
  return sub;
}
