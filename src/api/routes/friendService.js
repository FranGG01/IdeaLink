const API = "http://127.0.0.1:5000/api";

export async function sendFriendRequest(receiverId, token) {
  return fetch(`${API}/friend-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiver_id: receiverId }),
  }).then((res) => res.json());
}

export async function respondFriendRequest(id, action, token) {
  return fetch(`${API}/friend-request/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action }),
  }).then((res) => res.json());
}

export async function getFriends(token) {
  return fetch(`${API}/friends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getPendingRequests(token) {
  const response = await fetch(`${API}/friend-requests`, {
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
