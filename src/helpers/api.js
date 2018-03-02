import fetch from 'node-fetch'

export async function getAuth0FullUserProfile(id) {

  const managementToken = await getAuth0ManagementToken();
  return fetch(`${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${managementToken.access_token}`,
        'Accept': 'application/json',
      },
    })
    .then(response => {
      return response.json()
        .then(data => response.ok ? data : Promise.reject(data));
    })
}

function getAuth0ManagementToken() {
  return fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body:
        JSON.stringify({
          grant_type: 'client_credentials',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: `${process.env.AUTH0_DOMAIN}/api/v2/`
        }),
    })
    .then(response => {
      return response.json()
        .then(data => response.ok ? data : Promise.reject(data));
    })
}
