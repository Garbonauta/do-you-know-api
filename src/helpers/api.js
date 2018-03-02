import fetch from 'node-fetch'

export function getAuth0FullUserProfile(id) {
  return fetch(`${process.env.AUTH_0_DOMAIN}/api/v2/users/${id}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
      'Accept': 'application/json',
    },
  })
    .then(response => {
      return response.json()
        .then(data => response.ok ? data : Promise.reject(data));
    })
}
