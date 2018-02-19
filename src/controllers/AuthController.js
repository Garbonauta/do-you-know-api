class AuthController {
  auth(req, h) {
    console.log('auth')
    return {auth: "Authed"}
  }
}

export default AuthController;
