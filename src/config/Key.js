import {hapiJwt2Key} from "jwks-rsa";

const secretProvider = hapiJwt2Key({
  cache: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://garbonauta.auth0.com/.well-known/jwks.json',
  rateLimit: true,
});

async function validate(decoded) {
  if (decoded && decoded.sub) {
    return { isValid: true };
  }
  return { isValid: false };
}

async function keyProvider(decoded) {
  return new Promise((resolve, reject) => {
    const cb = (err, key) => {
      if (!key) {
        reject(err);
      } else {
        resolve({
          key,
        });
      }
    };

    // @ts-ignore wrong signature from jwks-rsa type definitions
    secretProvider(decoded, cb);
  });
}

export function mount(server) {
  server.auth.strategy('jwt', 'jwt', {
    complete: true,
    key: keyProvider,
    validate,
    verifyOptions: {
      audience: process.env.AUTH_0_AUDIENCE,
      issuer: process.env.AUTH_0_ISSUER,
      algorithms: ['RS256'],
    },
  });

  server.auth.default('jwt');
}
