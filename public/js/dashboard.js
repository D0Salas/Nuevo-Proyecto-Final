const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const rol = document.getElementById("rol");
const tablaUsuarios = document.getElementById("tablaUsuarios");

checkAuth();

let editandoId = null;

async function cargarUsuarios() {
  const res = await api("/users");
  const usuarios = await res.json();

  tablaUsuarios.innerHTML = usuarios.map(u => `
    <tr>
      <td>${escapeHtml(u.nombre ?? "")}</td>
      <td>${escapeHtml(u.email ?? "")}</td>
      <td>${escapeHtml(u.rol ?? "")}</td>
      <td>
        <button onclick="editar(${u.id}, '${esc(u.nombre)}', '${esc(u.email)}', '${esc(u.rol)}')">Editar</button>
        <button onclick="eliminar(${u.id})">Eliminar</button>
      </td>
    </tr>
  `).join("");
}

function abrirModal() {
  editandoId = null;
  tituloModal.textContent = "Nuevo Usuario";
  nombre.value = "";
  email.value = "";
  rol.value = "user";
  modal.style.display = "block";
}

function cerrarModal() {
  modal.style.display = "none";
}

async function guardarUsuario() {
  const data = {
    nombre: nombre.value.trim(),
    email: email.value.trim(),
    rol: rol.value
  };

  if (!data.nombre || !data.email) {
    alert("Nombre y email son obligatorios");
    return;
  }

  if (editandoId) {
    await api(`/users/${editandoId}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  } else {
    await api("/users", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  cerrarModal();
  cargarUsuarios();
}

function editar(id, n, e, r) {
  editandoId = id;
  tituloModal.textContent = "Editar Usuario";
  nombre.value = n;
  email.value = e;
  rol.value = r || "user";
  modal.style.display = "block";
}

async function eliminar(id) {
  if (!confirm("¿Eliminar usuario?")) return;
  await api(`/users/${id}`, { method: "DELETE" });
  cargarUsuarios();
}

function esc(s) {
  return String(s ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

cargarUsuarios();
