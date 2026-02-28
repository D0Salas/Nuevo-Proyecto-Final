const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : window.location.origin;

function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) window.location = "/";
}

function logout() {
  localStorage.removeItem("token");
  window.location = "/";
}

async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);

  if (res.status === 401 || res.status === 403) logout();

  return res;
}
