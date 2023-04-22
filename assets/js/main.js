let cuentas = [];
let editMode = false;
let editionId = null;
const addButton = document.getElementById("add");
addButton.addEventListener("click", function (event) {
  if (editMode === false) {
    create(event);
  } else update(event);
});

//Crear
function create(event) {
  event.preventDefault();
  const cuenta = readForm();

  //confirmo que los valores no esten vacios
  const values = Object.values(cuenta);
  const vacios = values.every((value) => value !== "");
  if (vacios === false) {
    confirm(`Existen campos sin completar `);
  } else {
    // si los valores no estan vacios ejecuto el pushador
    cuentas.push(cuenta);
    createRow(cuenta);
    clearForm();
    saveDataLs();
  }
}

// Leer formulario
function readForm() {
  // const nombreInput = document.getElementById("nombre");
  // const montoInput = document.getElementById("monto");
  // const fechaInput = document.getElementById("fecha");
  // const obsInput = document.getElementById("obs");

  // const cuenta = {
  //   nombre: nombreInput.value,
  //   monto: montoInput.value,
  //   fecha: fechaInput.value,
  //   obs: obsInput.value,
  //   id: Date.now(),
  // };

  // return cuenta;

  const { value: nombre } = document.getElementById("nombre");
  const { value: monto } = document.getElementById("monto");
  const { value: fecha } = document.getElementById("fecha");
  const { value: obs } = document.getElementById("obs");

  return { nombre, monto, fecha, obs, id: Date.now() };
}

// Crear tabla
function createRow(cuenta) {
  const tabla = document.getElementById("tabla");

  tabla.innerHTML += `
    <tr id="${cuenta.id}">
    <td>${cuenta.id}</td>
    <td>${cuenta.nombre}</td>
    <td>${Intl.NumberFormat("de-DE").format(cuenta.monto)}</td>
    <td>${cuenta.fecha}</td>
    <td>${cuenta.obs}</td>
<td>

<button class="edit btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask (${
    cuenta.id
  })">Editar</button>
<button class="delete btn btn-danger" onclick="deleteTask(${
    cuenta.id
  })" >Eliminar</button>
</td>
</tr>
`;
}

// Limpiar Formulario
function clearForm() {
  const form = document.getElementById("form");
  form.reset();
}

//Guardar Local Storage
function saveDataLs() {
  try {
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
    location.reload();
  } catch (error) {
    console.error(error);
    alert("Error al guardar los datos en el almacenamiento local.");
  }
}

// Eliminar datos
function deleteTask(id) {
  if (confirm(`¿Está seguro de que desea eliminar el ID ${id}?`)) {
    //borra tabla
    const row = document.getElementById(id);
    row.remove();
    // borra array se reasigna el array cuentas
    cuentas = cuentas.filter((cuenta) => cuenta.id !== id);
    // Guardar nuevo array en Local Storage
    saveDataLs();
  }
}

// Editar datos
function editTask(id) {
  //cambio nombre de Boton Guardar a Actualizar mientras me encuentro en Edición

  editMode = true;
  addButton.innerText = "Actualizar";
  editionId = id;
  // cambio de color fila en edicion
  document.getElementById(id).style.backgroundColor = "rgb(255, 249, 222)";

  const cuenta = cuentas.find((cuenta) => cuenta.id === id);
  const idInput = document.getElementById("id");
  const nombreInput = document.getElementById("nombre");
  const montoInput = document.getElementById("monto");
  const fechaInput = document.getElementById("fecha");
  const obsInput = document.getElementById("obs");

  nombreInput.value = cuenta.nombre;
  montoInput.value = cuenta.monto;
  fechaInput.value = cuenta.fecha;
  obsInput.value = cuenta.obs;
  idInput.value = cuenta.id;
}

// UPDATE FUNCTION
function update(event) {
  event.preventDefault();
  const valores = readForm();
  valores.id = editionId;

  // 1.- modificar array

  const index = cuentas.findIndex((cuenta) => cuenta.id === editionId);
  cuentas.splice(index, 1, valores);

  // 2.- modificar Local Storage
  saveDataLs();

  // 3.- modificar tabla
  const row = document.getElementById(editionId);
  row.innerHTML = `
  <td>${valores.id}</td>
    <td>${valores.nombre}</td>
    <td>${valores.monto}</td>
    <td>${valores.fecha}</td>
    <td>${valores.obs}</td>
<td>

<button class="edit btn btn-secondary"  onclick="editTask (${valores.id} )">Editar</button>
<button class="delete btn btn-danger" onclick="deleteTask(${valores.id})" >Eliminar</button>
</td>
  `;

  // vuelvo al color inicial
  row.style.backgroundColor = "initial";

  // 4- Vuelvo a estado inicial y continuo proceso
  clearForm();
  editMode = false;
  editionId = null;
  addButton.innerText = "Agregar";
}

//Leer datos LS
function readFromLs() {
  cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
  cuentas.forEach((el) => createRow(el));
}
readFromLs();

// sumar cuentas
let totalSaldo = 0;
cuentas.forEach(function (el) {
  totalSaldo += parseInt(el.monto);

  document.getElementById("saldo").textContent =
    Intl.NumberFormat("de-DE").format(totalSaldo);
});
