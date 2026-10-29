const express = require("express");
const path = require("path");
const base = require("./data/diccionario");
const extra = require("./data/terminos-extra");

const app = express();
const PORT = process.env.PORT || 3000;

// Orden en que se muestran las categorías
const ORDEN_CATEGORIAS = [
  "Palabras y funciones",
  "Librerías",
  "Modos de programar",
  "Herramientas y entorno",
  "Conceptos de machine learning",
];

// Une las dos listas y las agrupa por categoría (el orden interno se conserva)
const terminos = [...base, ...extra].sort(
  (a, b) =>
    ORDEN_CATEGORIAS.indexOf(a.categoria) - ORDEN_CATEGORIAS.indexOf(b.categoria)
);

app.use(express.static(path.join(__dirname, "public")));

// Quita tildes y pasa a minúsculas para que "libreria" encuentre "librería"
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Lista de categorías sin repetir
app.get("/api/categorias", (req, res) => {
  const categorias = [...new Set(terminos.map((t) => t.categoria))];
  res.json(categorias);
});

// Lista de términos, con filtros opcionales ?q=texto&categoria=nombre
app.get("/api/terminos", (req, res) => {
  const { q, categoria } = req.query;
  let resultado = terminos;

  if (categoria) {
    resultado = resultado.filter((t) => t.categoria === categoria);
  }

  if (q) {
    const buscado = normalizar(q);
    resultado = resultado.filter((t) => {
      const texto = [t.termino, t.definicion, t.usoEnML].join(" ");
      return normalizar(texto).includes(buscado);
    });
  }

  res.json(resultado);
});

// Un término por su id
app.get("/api/terminos/:id", (req, res) => {
  const encontrado = terminos.find((t) => t.id === req.params.id);
  if (!encontrado) {
    return res.status(404).json({ error: "Término no encontrado" });
  }
  res.json(encontrado);
});

app.listen(PORT, () => {
  console.log(`Diccionario disponible en http://localhost:${PORT}`);
});
