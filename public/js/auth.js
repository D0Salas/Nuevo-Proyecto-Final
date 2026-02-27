// verificar si existe sesión
function checkAuth() {

  const token = localStorage.getItem("token");

  if (!token) {
    window.location = "/";
    return;
  }
}

// cerrar sesión
function logout() {
  localStorage.removeItem("token");
  window.location = "/";
}

// helper para requests protegidos
async function api(url, options = {}) {

  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  const res = await fetch(url, config);

  // token expirado
  if (res.status === 401 || res.status === 403) {
    logout();
  }

  return res;
}