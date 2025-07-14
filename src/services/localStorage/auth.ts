import type { UserWithData } from "@/lib/types";

const USER_KEY = "currentUser";
const USERS_KEY = "users";

export async function signIn(username: string, password: string) {
  const existingUsers = JSON.parse(
    window.localStorage.getItem(USERS_KEY) || "{}"
  );

  console.log("Attempting to sign in with username:", username);
  console.log("Attempting to sign in with password:", password);
  console.log("Existing users:", existingUsers);

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
    window.localStorage.getItem(USERS_KEY) || "{}"
  );

  if (existingUsers[user.username]) {
    return null;
  }

  existingUsers[user.username] = user;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));

  return user;
}

export async function getCurrentUser() {
  const username = window.localStorage.getItem(USER_KEY);
  if (!username) return null;

  const existingUsers = JSON.parse(
    window.localStorage.getItem(USERS_KEY) || "{}"
  );

  return existingUsers[username] || null;
}

export async function signOut() {
  window.localStorage.removeItem(USER_KEY);
}
