fetchGeneric(url) {
  return fetch(url, {
    headers: { Authorization: 'Bearer ' + this.accessToken }
  });
}
