export function getAuthInfoFromJWT({auth: {artifacts, credentials: {payload: {sub}}}}) {
  return sub;
}
