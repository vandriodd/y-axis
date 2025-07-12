const USER_KEY = "currentUser";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function signIn(username: string, _password: string) {
  window.localStorage.setItem(USER_KEY, username);

  return username;
}

export async function getCurrentUser() {
  return window.localStorage.getItem(USER_KEY);
}

export async function signOut() {
  window.localStorage.removeItem(USER_KEY);
}
