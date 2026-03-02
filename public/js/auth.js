const API_URL = "http://localhost:3000";

// ========================
// VERIFICAR LOGIN
// ========================
function checkAuth(){

  const token = localStorage.getItem("token");

  if(!token){
    window.location="/";
  }
}

// ========================
// LOGOUT
// ========================
function logout(){
  localStorage.removeItem("token");
  window.location="/";
}

// ========================
// API HELPER
// ========================
async function api(url, options = {}) {

  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }
  };

  const res = await fetch(API_URL + url, config);

  if(res.status === 401 || res.status === 403){
    logout();
  }

  return res;
}
