export async function sendFriendRequest(receiverId, token) {
  return fetch(`${API_BASE}/friend-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiver_id: receiverId }),
  }).then((res) => res.json());
}
const API_BASE = import.meta.env.VITE_API_URL;

export async function sendFriendRequestByUsername(username, token) {
  return fetch(`${API_BASE}/friend-request-by-username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiver_username: username }),
  }).then((res) => res.json());
}

export async function deleteFriend(friendId, token) {
  const res = await fetch(`${API_BASE}/friend/${friendId}`, {
      method: "DELETE",
      headers: {
          "Authorization": `Bearer ${token}`,
      },
  });
  return res.json();
}



export async function respondFriendRequest(id, action, token) {
  return fetch(`${API_BASE}/friend-request/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action }),
  }).then((res) => res.json());
}

export async function getFriends(token) {
  return fetch(`${API_BASE}/friends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getFriendStatus(receiverId, token) {
  try {
    const response = await fetch(`${API_BASE}/friend-status/${receiverId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { error: "No se pudo obtener el estado" };
  }
}

export async function getPendingRequests(token) {
  const response = await fetch(`${API_BASE}/friend-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();
  console.log("Respuesta cruda de getPendingRequests:", text);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${text}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch {
    throw new Error("Respuesta no es JSON válida");
  }
}
