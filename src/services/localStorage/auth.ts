import type { UserWithData } from "@/lib/types";

export const USER_KEY = "currentUser";
export const USERS_DATA = "users";

export async function signIn(username: string, password: string) {
  const existingUsers = JSON.parse(
    window.localStorage.getItem(USERS_DATA) || "{}"
  );

  if (!existingUsers[username]) {
    return "";
  }

  if (existingUsers[username].password !== password) {
    return "";
  }

  window.localStorage.setItem(USER_KEY, username);
  return username;
}

export async function signUp(user: UserWithData): Promise<UserWithData | null> {
  const existingUsers = JSON.parse(
    window.localStorage.getItem(USERS_DATA) || "{}"
  );

  if (existingUsers[user.username]) {
    return null;
  }

  existingUsers[user.username] = user;
  window.localStorage.setItem(USERS_DATA, JSON.stringify(existingUsers));

  return user;
}

export async function getCurrentUser() {
  const username = window.localStorage.getItem(USER_KEY);
  if (!username) return null;

  const existingUsers = JSON.parse(
    window.localStorage.getItem(USERS_DATA) || "{}"
  );

  return existingUsers[username] || null;
}

export async function signOut() {
  window.localStorage.removeItem(USER_KEY);
}

export async function getUserData() {
  const username = window.localStorage.getItem(USER_KEY);
  if (!username) return null;

  const existingUsers = JSON.parse(
    window.localStorage.getItem(USERS_DATA) || "{}"
  );

  return existingUsers[username] || null;
}

export async function saveProfileData(user: UserWithData) {
  const username = window.localStorage.getItem(USER_KEY);
  if (!username) return null;

  const existingUsers = JSON.parse(
    window.localStorage.getItem(USERS_DATA) || "{}"
  );
  existingUsers[username] = {
    ...existingUsers[username],
    ...user,
  };

  window.localStorage.setItem(USERS_DATA, JSON.stringify(existingUsers));

  return existingUsers[username] || null;
}
