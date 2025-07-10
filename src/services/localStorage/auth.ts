// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function signIn(username: string, _password: string) {
  window.localStorage.setItem('currentUser', username);

  return username;
}

export async function getCurrentUser() {
  return window.localStorage.getItem('currentUser');
}

export async function signOut() {
  window.localStorage.removeItem('currentUser');
}
