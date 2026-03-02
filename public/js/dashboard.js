checkAuth();

const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const rol = document.getElementById("rol");
const tablaUsuarios = document.getElementById("tablaUsuarios");

let editandoId = null;


// =====================
// CARGAR USUARIOS
// =====================
async function cargarUsuarios(){

  const res = await api("/users");
  const usuarios = await res.json();

  tablaUsuarios.innerHTML = usuarios.map(u=>`
    <tr>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${u.rol}</td>
      <td>
        <button onclick="editar(${u.id},'${u.nombre}','${u.email}','${u.rol}')">
          Editar
        </button>

        <button onclick="eliminar(${u.id})">
          Eliminar
        </button>
      </td>
    </tr>
  `).join("");
}


// =====================
// MODAL
// =====================
function abrirModal(){
  editandoId=null;
  tituloModal.innerText="Nuevo Usuario";
  nombre.value="";
  email.value="";
  rol.value="";
  modal.style.display="block";
}

function cerrarModal(){
  modal.style.display="none";
}


// =====================
// GUARDAR
// =====================
async function guardarUsuario(){

  const data={
    nombre:nombre.value,
    email:email.value,
    rol:rol.value
  };

  if(editandoId){

    await api(`/users/${editandoId}`,{
      method:"PUT",
      body:JSON.stringify(data)
    });

  }else{

    await api("/users",{
      method:"POST",
      body:JSON.stringify(data)
    });
  }

  cerrarModal();
  cargarUsuarios();
}


// =====================
// EDITAR
// =====================
function editar(id,n,e,r){

  editandoId=id;

  tituloModal.innerText="Editar Usuario";

  nombre.value=n;
  email.value=e;
  rol.value=r;

  modal.style.display="block";
}


// =====================
// ELIMINAR
// =====================
async function eliminar(id){

  if(!confirm("¿Eliminar usuario?")) return;

  await api(`/users/${id}`,{
    method:"DELETE"
  });

  cargarUsuarios();
}

cargarUsuarios();
