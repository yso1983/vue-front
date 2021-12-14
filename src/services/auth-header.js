export default function authHeader(refresh) {
  const user = JSON.parse(localStorage.getItem('user'));
  const groupid = localStorage.getItem('groupid');

  if (user && user.accessToken) {
    // for Node.js Express back-end
    if (refresh) {
      return {
        Authorization: 'Bearer ' + user.accessToken,
        refresh: user.refreshToken,
        groupid
      };
    } else {
      return {
        Authorization: 'Bearer ' + user.accessToken,
        groupid
      };
    }

  } else {
    return {};
  }
}
