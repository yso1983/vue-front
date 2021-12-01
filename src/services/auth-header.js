export default function authHeader(refresh) {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    if (refresh) {
      return {
        Authorization: 'Bearer ' + user.accessToken,
        refresh: user.refreshToken
      };
    } else {
      return { Authorization: 'Bearer ' + user.accessToken };
    }

  } else {
    return {};
  }
}
