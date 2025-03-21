import { useQuery } from "@tanstack/react-query";

// ADD DATA
export async function addUserData({ text, is_public, model_id = 0 }) {
  const response = await fetch("/api/add_data/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text, // string
      is_public: is_public, // bool
      model_id: model_id, // int
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return response;
}

// GET DATA FROM A SPECIFIC USER
export function useGetUserDataAll() {
  const query = useQuery({
    queryKey: ["get_user_data"],
    queryFn: getUserDataAll,
    retry: 1,
  });
  return query;
}
async function getUserDataAll() {
  try {
    const response = await fetch("/api/get_user_data_all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("All User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all user data:", error);
  }
}

export function useGetUserDataPublic() {
  const query = useQuery({
    queryKey: ["get_user_data"],
    queryFn: getUserDataPublic,
    retry: 1,
  });
  return query;
}
async function getUserDataPublic() {
  try {
    const response = await fetch("/api/get_user_data_public/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Public User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching public user data:", error);
  }
}

export function useGetUserDataPrivate() {
  const query = useQuery({
    queryKey: ["get_user_data"],
    queryFn: getUserDataPrivate,
    retry: 1,
  });
  return query;
}
async function getUserDataPrivate() {
  try {
    const response = await fetch("/api/get_user_data_private/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Private User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching private user data:", error);
  }
}

export function useGetUserDataById(id) {
  const query = useQuery({
    queryKey: ["get_user_data", id],
    queryFn: () => getUserDataById(id),
    retry: 1,
  });
  return query;
}
async function getUserDataById(id) {
  const url = `/api/get_user_data_by_id/${id}/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
// GET DATA FROM ALL USERS
export function useGetPublicDataAll() {
  const query = useQuery({
    queryKey: ["get_user_data"],
    queryFn: getPublicDataAll,
    retry: 1,
  });
  return query;
}
async function getPublicDataAll() {
  try {
    const response = await fetch("/api/get_public_data_all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log("All Public Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all public data:", error);
  }
}

// DELETE DATA
export async function deleteUserData(itemid) {
  const url = `/api/delete_user_data/${itemid}/`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error deleteing user data:", error);
  }
}

// UPDATE DATA
export async function updateDataById(id, text) {
  const url = `/api/update_data_by_id/${id}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text, // string
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
