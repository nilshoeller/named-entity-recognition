import { useQuery } from "@tanstack/react-query";

export async function loginUser({ email, password }) {
  const response = await fetch("/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new Error("Invalid email or password");
    }
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function logoutUser() {
  const response = await fetch("/api/logout");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

export async function registerUser({ email, password, name, surname }) {
  const response = await fetch("/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      surname: surname,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

/**
 *
 * @returns {Promise<{isAuthenticated: false} | {isAuthenticated: true; username: string; first_name: string; last_name: string;}}>}
 */
export async function getSession() {
  const response = await fetch("/api/session");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
}

export function useGetSession() {
  const query = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: 1,
  });
  return query;
}
