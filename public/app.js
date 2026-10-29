const lista = document.getElementById("lista");
const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtro");
const contador = document.getElementById("contador");

// Crea un elemento con clase y texto (textContent evita inyección de HTML)
function crear(etiqueta, clase, texto) {
  const e = document.createElement(etiqueta);
  if (clase) e.className = clase;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function seccionTexto(titulo, texto) {
  const s = crear("div", "seccion");
  s.appendChild(crear("h3", null, titulo));
  s.appendChild(crear("p", null, texto));
  return s;
}

function seccionCodigo(titulo, codigo) {
  const s = crear("div", "seccion");
  s.appendChild(crear("h3", null, titulo));
  const pre = crear("pre");
  pre.appendChild(crear("code", null, codigo));
  s.appendChild(pre);
  return s;
}

function seccionLista(titulo, items) {
  const s = crear("div", "seccion");
  s.appendChild(crear("h3", null, titulo));
  const ul = crear("ul");
  items.forEach((item) => ul.appendChild(crear("li", null, item)));
  s.appendChild(ul);
  return s;
}

function seccionRelacionados(items) {
  const s = crear("div", "seccion");
  s.appendChild(crear("h3", null, "Términos relacionados"));
  const caja = crear("div", "relacionados");
  items.forEach((nombre) => {
    const chip = crear("button", "chip", nombre);
    chip.type = "button";
    chip.addEventListener("click", () => {
      buscador.value = nombre;
      filtro.value = "";
      cargarTerminos();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    caja.appendChild(chip);
  });
  s.appendChild(caja);
  return s;
}

function crearTarjeta(t) {
  const tarjeta = crear("article", "tarjeta");

  const cabecera = crear("div", "tarjeta-cabecera");
  const titulo = crear("div", "tarjeta-titulo");
  titulo.appendChild(crear("h2", null, t.termino));
  titulo.appendChild(crear("span", "etiqueta", t.categoria));
  cabecera.appendChild(titulo);
  cabecera.appendChild(crear("p", "resumen", t.definicion));
  cabecera.addEventListener("click", () => tarjeta.classList.toggle("abierta"));

  const detalle = crear("div", "detalle");
  detalle.appendChild(seccionCodigo("Sintaxis", t.sintaxis));
  detalle.appendChild(seccionCodigo("Ejemplo", t.ejemplo));
  detalle.appendChild(seccionTexto("Uso en machine learning", t.usoEnML));
  detalle.appendChild(seccionLista("Errores comunes", t.erroresComunes));
  detalle.appendChild(seccionRelacionados(t.relacionados));

  tarjeta.appendChild(cabecera);
  tarjeta.appendChild(detalle);
  return tarjeta;
}

function pintar(terminos) {
  lista.innerHTML = "";
  contador.textContent = `${terminos.length} término(s) encontrado(s). Haz clic en uno para ver el detalle.`;

  if (terminos.length === 0) {
    lista.appendChild(crear("p", "vacio", "No se encontraron términos con esa búsqueda."));
    return;
  }
  terminos.forEach((t) => lista.appendChild(crearTarjeta(t)));
}

async function cargarTerminos() {
  const params = new URLSearchParams();
  if (buscador.value.trim()) params.set("q", buscador.value.trim());
  if (filtro.value) params.set("categoria", filtro.value);

  const respuesta = await fetch("/api/terminos?" + params.toString());
  const datos = await respuesta.json();
  pintar(datos);
}

async function cargarCategorias() {
  const respuesta = await fetch("/api/categorias");
  const categorias = await respuesta.json();
  categorias.forEach((c) => {
    const opcion = document.createElement("option");
    opcion.value = c;
    opcion.textContent = c;
    filtro.appendChild(opcion);
  });
}

buscador.addEventListener("input", cargarTerminos);
filtro.addEventListener("change", cargarTerminos);

cargarCategorias();
cargarTerminos();
