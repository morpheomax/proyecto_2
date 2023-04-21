const form = document.querySelector("form");
const lista = document.querySelector("#lista");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = event.target[0].value;
  const apellido = event.target[1].value;
  const email = event.target[2].value;
  const seleccion = event.target[3].value;
  const feccomp = event.target[4].value;
  const fecseg = event.target[5].value;
  const comentario = event.target[6].value;

  if (
    !nombre.trim() ||
    !apellido.trim() ||
    !email.trim() ||
    !seleccion.trim() ||
    !feccomp.trim() ||
    !fecseg.trim() ||
    !comentario.trim()
  ) {
    let camposFaltantes = [];
    if (!nombre.trim()) camposFaltantes.push("Nombre");
    if (!apellido.trim()) camposFaltantes.push("Apellido");
    if (!email.trim()) camposFaltantes.push("Email");
    if (!seleccion.trim()) camposFaltantes.push("Seleccion");
    if (!feccomp.trim()) camposFaltantes.push("Fecha de Compra");
    if (!fecseg.trim()) camposFaltantes.push("Fecha de Seguimiento");
    if (!comentario.trim()) camposFaltantes.push("Comentario");

    alert(
      "Debe completar los siguientes campos: " + camposFaltantes.join(", ")
    );
    return;
  }

  const item = {
    nombre,
    apellido,
    email,
    seleccion,
    feccomp,
    fecseg,
    comentario,
  };
  datos.push(item);
  actualizarLista();
  form.reset();
  // Se guarda los datos actualizados en localStorage
  localStorage.setItem("datos", JSON.stringify(datos));
});

function actualizarLista() {
  lista.innerHTML = "";
  // Crear la tabla
  const tabla = document.createElement("table");
  const cabecera = document.createElement("tr");
  //
  const cabeceraNombre = document.createElement("th");
  cabeceraNombre.textContent = "Nombre";
  //
  const cabeceraApellido = document.createElement("th");
  cabeceraApellido.textContent = "Apellido";
  //
  const cabeceraEmail = document.createElement("th");
  cabeceraEmail.textContent = "Email";
  //
  const cabeceraSeleccion = document.createElement("th");
  cabeceraSeleccion.textContent = "Selección";
  //
  const cabeceraFecCompra = document.createElement("th");
  cabeceraFecCompra.textContent = "Fecha de Compra";
  //
  const cabeceraFecSeguimiento = document.createElement("th");
  cabeceraFecSeguimiento.textContent = "Fecha de Seguimiento";
  //
  const cabeceraComentario = document.createElement("th");
  cabeceraComentario.textContent = "Comentario";

  const cabeceraEdicion = document.createElement("th");
  cabeceraEdicion.textContent = "Opciones";

  cabecera.appendChild(cabeceraNombre);
  cabecera.appendChild(cabeceraApellido);
  cabecera.appendChild(cabeceraEmail);
  cabecera.appendChild(cabeceraSeleccion);
  cabecera.appendChild(cabeceraFecCompra);
  cabecera.appendChild(cabeceraFecSeguimiento);
  cabecera.appendChild(cabeceraComentario);
  cabecera.appendChild(cabeceraEdicion);
  tabla.appendChild(cabecera);

  // Agregar los datos a la tabla
  for (const item of datos) {
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = item.nombre;

    const celdaApellido = document.createElement("td");
    celdaApellido.textContent = item.apellido;

    const celdaEmail = document.createElement("td");
    celdaEmail.textContent = item.email;

    const celdaSeleccion = document.createElement("td");
    celdaSeleccion.textContent = item.seleccion;

    const celdaFecCompra = document.createElement("td");
    celdaFecCompra.textContent = item.feccomp;

    const celdaFecSeguimiento = document.createElement("td");
    celdaFecSeguimiento.textContent = item.fecseg;

    const celdaComentario = document.createElement("td");
    celdaComentario.textContent = item.comentario;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    fila.appendChild(celdaEmail);
    fila.appendChild(celdaSeleccion);
    fila.appendChild(celdaFecCompra);
    fila.appendChild(celdaFecSeguimiento);
    fila.appendChild(celdaComentario);

    const celdaBotones = document.createElement("td");

    const botonEditar = document.createElement("button");
    botonEditar.innerText = "Editar";
    botonEditar.addEventListener("click", () => editarItem(item));
    celdaBotones.appendChild(botonEditar);

    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.addEventListener("click", () => eliminarItem(item));
    celdaBotones.appendChild(botonEliminar);
    fila.appendChild(celdaBotones);
    tabla.appendChild(fila);
  }
  // Agregar la tabla a la página
  lista.appendChild(tabla);
}

function editarItem(item) {
  const index = datos.indexOf(item);
  const nombre = prompt("Ingrese el nuevo nombre:", item.nombre);
  const apellido = prompt("Ingrese el nuevo apellido:", item.apellido);
  const email = prompt("Ingrese el nuevo apellido:", item.email);
  const seleccion = prompt("Seleccione la opción:", item.seleccion);
  const feccomp = prompt("Ingrese la fecha de Compra:", item.feccomp);
  const fecseg = prompt("Ingrese la fecha de Seguimiento:", item.fecseg);
  const comentario = prompt("Ingrese el nuevo comentario:", item.comentario);

  if (
    !nombre.trim() ||
    !apellido.trim() ||
    !email.trim() ||
    !seleccion.trim() ||
    !feccomp.trim() ||
    !fecseg.trim() ||
    !comentario.trim()
  ) {
    let camposEditar = [];

    if (!nombre.trim()) {
      nombre.trim();
    } else {
      camposFaltantes.push("Nombre");
    }
    if (!apellido.trim()) {
      apellido.trim();
    } else {
      camposFaltantes.push("Apellido");
    }
    if (!email.trim()) {
      email.trim();
    } else {
      camposFaltantes.push("Email");
    }
    if (!seleccion.trim()) {
      seleccion.trim();
    } else {
      camposFaltantes.push("Seleccion");
    }
    if (!feccomp.trim()) {
      feccomp.trim();
    } else {
      camposFaltantes.push("Fecha de Compra");
    }
    if (!fecseg.trim()) {
      fecseg.trim();
    } else {
      camposFaltantes.push("Fecha de Seguimiento");
    }
    if (!comentario.trim()) {
      comentario.trim();
    } else {
      camposFaltantes.push("Comentario");
    }

    alert("Debe completar los siguientes campos: " + camposEditar.join(", "));
    return;
  }

  datos[index] = {
    nombre,
    apellido,
    email,
    seleccion,
    feccomp,
    fecseg,
    comentario,
  };
  actualizarLista();
  // Se guarda los datos actualizados en localStorage
  localStorage.setItem("datos", JSON.stringify(datos));
}

function eliminarItem(item) {
  if (confirm("¿Está seguro de que desea eliminar este registro?")) {
    const index = datos.indexOf(item);
    datos.splice(index, 1);
    actualizarLista();
  }
  // Se guarda los datos actualizados en localStorage
  localStorage.setItem("datos", JSON.stringify(datos));
}

//Leer localStorage para mostrar al cargar la web
function readFromLS() {
  datos = JSON.parse(localStorage.getItem("datos")) || [];

  // const datos = JSON.parse(localStorage.getItem("datos"));
  // datos.forEach((el) => createRow(el));
}

readFromLS();
