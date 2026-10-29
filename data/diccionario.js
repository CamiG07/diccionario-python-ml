const PALABRAS = "Palabras y funciones";
const LIBRERIAS = "Librerías";
const MODOS = "Modos de programar";

module.exports = [
  // ---------------------------------------------------------------
  // PALABRAS Y FUNCIONES
  // ---------------------------------------------------------------
  {
    id: "def",
    termino: "def",
    categoria: PALABRAS,
    definicion:
      "Palabra clave que define una función: un bloque de código con nombre que recibe parámetros, ejecuta instrucciones y puede devolver un valor con return. Permite reutilizar código sin repetirlo.",
    sintaxis: `def nombre(parametro1, parametro2=valor_por_defecto):
    # instrucciones
    return resultado`,
    ejemplo: `def normalizar(x, minimo, maximo):
    return (x - minimo) / (maximo - minimo)

print(normalizar(50, 0, 100))  # 0.5`,
    usoEnML:
      "Se usa para encapsular pasos de preprocesamiento, métricas personalizadas, funciones de pérdida y rutinas de entrenamiento que se repiten.",
    erroresComunes: [
      "Olvidar return: la función devuelve None sin avisar.",
      "Usar un valor por defecto mutable, como def f(x, lista=[]): la lista se comparte entre llamadas.",
    ],
    relacionados: ["lambda", "class"],
  },
  {
    id: "lambda",
    termino: "lambda",
    categoria: PALABRAS,
    definicion:
      "Crea una función anónima (sin nombre) de una sola expresión. Es útil para funciones pequeñas que se usan una vez, normalmente como argumento de otra función.",
    sintaxis: `lambda argumentos: expresion`,
    ejemplo: `cuadrado = lambda x: x ** 2
print(cuadrado(4))  # 16

modelos = [{"nombre": "A", "precision": 0.82}, {"nombre": "B", "precision": 0.91}]
ordenados = sorted(modelos, key=lambda m: m["precision"], reverse=True)
print(ordenados[0]["nombre"])  # B`,
    usoEnML:
      "Muy frecuente en pandas con .apply() y en el parámetro key de sorted() o max() para ordenar y comparar resultados de modelos.",
    erroresComunes: [
      "Escribir lógica larga dentro de una lambda: se vuelve ilegible; en ese caso conviene usar def.",
      "Intentar usar sentencias (como print o asignaciones): solo admite una expresión.",
    ],
    relacionados: ["def", "Comprensión de listas", "Programación funcional"],
  },
  {
    id: "comprension-de-listas",
    termino: "Comprensión de listas",
    categoria: PALABRAS,
    definicion:
      "Forma compacta de crear una lista nueva a partir de un iterable, con transformación y filtro opcionales, en una sola línea.",
    sintaxis: `[expresion for elemento in iterable if condicion]`,
    ejemplo: `pesos = [0.1, 0.5, 0.9]
activos = [w * 2 for w in pesos if w > 0.2]
print(activos)  # [1.0, 1.8]`,
    usoEnML:
      "Sirve para construir listas de nombres de columnas, filtrar muestras, convertir etiquetas y preparar datos pequeños antes de pasarlos a NumPy o pandas.",
    erroresComunes: [
      "Anidar demasiados ciclos y condiciones: pierde claridad.",
      "Usarla solo por sus efectos secundarios (por ejemplo, para imprimir): para eso va un ciclo for.",
      "Aplicarla a millones de números: NumPy es mucho más rápido.",
    ],
    relacionados: ["lambda", "enumerate", "zip", "Programación vectorizada"],
  },
  {
    id: "class",
    termino: "class",
    categoria: PALABRAS,
    definicion:
      "Palabra clave que define una clase: una plantilla que agrupa datos (atributos) y comportamientos (métodos). A partir de ella se crean objetos.",
    sintaxis: `class NombreClase:
    def __init__(self, parametros):
        self.atributo = parametros

    def metodo(self, argumentos):
        ...`,
    ejemplo: `class ModeloLineal:
    def __init__(self, w=0.0, b=0.0):
        self.w = w
        self.b = b

    def predecir(self, x):
        return self.w * x + self.b

m = ModeloLineal(w=2.0, b=1.0)
print(m.predecir(3))  # 7.0`,
    usoEnML:
      "Los modelos de scikit-learn y las redes de PyTorch (nn.Module) son clases. Crear tus propias clases permite construir modelos y transformadores personalizados.",
    erroresComunes: [
      "Olvidar self como primer parámetro de un método.",
      "Confundir atributos de clase (compartidos) con atributos de instancia (propios de cada objeto).",
    ],
    relacionados: ["def", "Programación orientada a objetos"],
  },
  {
    id: "with",
    termino: "with",
    categoria: PALABRAS,
    definicion:
      "Abre un administrador de contexto: garantiza que un recurso (archivo, conexión, bloqueo) se libere correctamente al terminar el bloque, incluso si ocurre un error.",
    sintaxis: `with expresion as nombre:
    # usar el recurso aquí`,
    ejemplo: `with open("datos.csv", encoding="utf-8") as archivo:
    encabezado = archivo.readline()
print(encabezado)
# fuera del bloque, el archivo ya está cerrado`,
    usoEnML:
      "Se usa al leer archivos de datos y en PyTorch con torch.no_grad() para desactivar el cálculo de gradientes durante la evaluación.",
    erroresComunes: [
      "Intentar leer el archivo después de salir del bloque: ya está cerrado.",
    ],
    relacionados: ["try / except", "PyTorch"],
  },
  {
    id: "try-except",
    termino: "try / except",
    categoria: PALABRAS,
    definicion:
      "Estructura para manejar errores: el código dentro de try se ejecuta y, si lanza una excepción, el control pasa al bloque except en lugar de detener el programa.",
    sintaxis: `try:
    # código que puede fallar
except TipoDeError:
    # qué hacer si falla
else:
    # se ejecuta si no hubo error
finally:
    # se ejecuta siempre`,
    ejemplo: `import pandas as pd

try:
    df = pd.read_csv("vacunacion.csv")
except FileNotFoundError:
    print("No se encontró el archivo de datos.")`,
    usoEnML:
      "Protege la carga de datos (archivos ausentes o corruptos), conversiones de tipos y operaciones como divisiones por cero en métricas.",
    erroresComunes: [
      "Usar except sin tipo: oculta errores reales y dificulta depurar.",
      "Capturar Exception de forma demasiado general cuando se conoce el error esperado.",
    ],
    relacionados: ["with", "pandas"],
  },
  {
    id: "enumerate",
    termino: "enumerate",
    categoria: PALABRAS,
    definicion:
      "Función incorporada que recorre un iterable devolviendo pares (índice, elemento), de modo que no hay que llevar un contador manual.",
    sintaxis: `enumerate(iterable, start=0)`,
    ejemplo: `for i, perdida in enumerate([0.9, 0.6, 0.4], start=1):
    print(f"Época {i}: pérdida {perdida}")`,
    usoEnML:
      "Muy usada para numerar épocas de entrenamiento y lotes (batches) al imprimir el progreso.",
    erroresComunes: [
      "Usar range(len(lista)) cuando enumerate es más claro.",
      "Olvidar que el índice empieza en 0 si no se indica start.",
    ],
    relacionados: ["zip", "Comprensión de listas"],
  },
  {
    id: "zip",
    termino: "zip",
    categoria: PALABRAS,
    definicion:
      "Función incorporada que combina varios iterables elemento por elemento, produciendo tuplas. Se detiene cuando se acaba el más corto.",
    sintaxis: `zip(iterable1, iterable2, ...)`,
    ejemplo: `caracteristicas = [[1, 2], [3, 4], [5, 6]]
etiquetas = ["a", "b", "c"]
for x, y in zip(caracteristicas, etiquetas):
    print(x, y)`,
    usoEnML:
      "Empareja cada muestra con su etiqueta, o las predicciones con los valores reales, para calcular métricas a mano.",
    erroresComunes: [
      "Usar listas de longitudes distintas: los elementos sobrantes se descartan sin avisar.",
      "Reutilizar el resultado: zip devuelve un iterador que se consume una sola vez.",
    ],
    relacionados: ["enumerate", "Comprensión de listas"],
  },

  // ---------------------------------------------------------------
  // LIBRERÍAS
  // ---------------------------------------------------------------
  {
    id: "numpy",
    termino: "NumPy",
    categoria: LIBRERIAS,
    definicion:
      "Librería base para computación numérica. Ofrece arreglos n-dimensionales (ndarray) y operaciones matemáticas rápidas aplicadas a todos los elementos a la vez.",
    sintaxis: `pip install numpy
import numpy as np`,
    ejemplo: `import numpy as np

X = np.array([[1, 2], [3, 4]])
print(X.mean(axis=0))  # [2. 3.]  (promedio por columna)
print(X @ X.T)         # multiplicación de matrices`,
    usoEnML:
      "Es la base de casi todo el ecosistema: pandas, scikit-learn, TensorFlow y PyTorch trabajan con arreglos o tensores muy parecidos. Se usa para matrices de características, álgebra lineal y estadística básica.",
    erroresComunes: [
      "Confundir axis=0 (opera por columnas) con axis=1 (opera por filas).",
      "No notar que una porción (slice) es una vista y modificarla cambia el arreglo original.",
      "Operar arreglos con formas incompatibles (error de broadcasting).",
    ],
    relacionados: ["pandas", "SciPy", "Programación vectorizada"],
  },
  {
    id: "pandas",
    termino: "pandas",
    categoria: LIBRERIAS,
    definicion:
      "Librería para manipular y analizar datos tabulares. Su estructura principal es el DataFrame (tabla con filas y columnas etiquetadas) y permite leer, limpiar, filtrar, agrupar y combinar datos.",
    sintaxis: `pip install pandas
import pandas as pd`,
    ejemplo: `import pandas as pd

df = pd.DataFrame({
    "municipio": ["Soacha", "Bogotá", "Zipaquirá"],
    "cobertura": [92.5, 95.1, 90.3],
})
print(df[df["cobertura"] > 91])
print(df["cobertura"].mean())`,
    usoEnML:
      "Es la herramienta de la etapa de datos: cargar CSV o Excel, limpiar valores nulos, crear nuevas variables (ingeniería de características) y separar X e y.",
    erroresComunes: [
      "Ignorar valores nulos antes de entrenar un modelo.",
      "Modificar una copia o vista y no entender la advertencia SettingWithCopyWarning.",
      "Recorrer filas con for en lugar de usar operaciones sobre columnas completas (más lento).",
    ],
    relacionados: ["NumPy", "Matplotlib", "Seaborn"],
  },
  {
    id: "matplotlib",
    termino: "Matplotlib",
    categoria: LIBRERIAS,
    definicion:
      "Librería de visualización 2D. Permite crear gráficos de líneas, barras, dispersión, histogramas y más, con control total sobre ejes, etiquetas y estilos.",
    sintaxis: `pip install matplotlib
import matplotlib.pyplot as plt`,
    ejemplo: `import matplotlib.pyplot as plt

epocas = [1, 2, 3, 4]
perdida = [0.9, 0.6, 0.4, 0.3]
plt.plot(epocas, perdida, marker="o")
plt.xlabel("Época")
plt.ylabel("Pérdida")
plt.title("Curva de aprendizaje")
plt.show()`,
    usoEnML:
      "Se usa para curvas de pérdida y precisión, histogramas de variables, gráficos de dispersión y comparación de modelos.",
    erroresComunes: [
      "Dejar los ejes sin etiquetas ni título.",
      "Olvidar plt.show() al ejecutar un script (en notebooks no hace falta).",
    ],
    relacionados: ["Seaborn", "pandas"],
  },
  {
    id: "seaborn",
    termino: "Seaborn",
    categoria: LIBRERIAS,
    definicion:
      "Librería de visualización estadística construida sobre Matplotlib. Produce gráficos más atractivos con menos código y se integra directamente con DataFrames de pandas.",
    sintaxis: `pip install seaborn
import seaborn as sns`,
    ejemplo: `import seaborn as sns
import matplotlib.pyplot as plt

sns.heatmap(df.corr(numeric_only=True), annot=True, cmap="coolwarm")
plt.show()`,
    usoEnML:
      "Ideal para el análisis exploratorio: mapas de calor de correlación, distribuciones, diagramas de caja y la matriz de confusión de un clasificador.",
    erroresComunes: [
      "Calcular correlaciones con columnas de texto: hay que usar solo columnas numéricas.",
      "Interpretar correlación como causalidad.",
    ],
    relacionados: ["Matplotlib", "pandas"],
  },
  {
    id: "scipy",
    termino: "SciPy",
    categoria: LIBRERIAS,
    definicion:
      "Librería de algoritmos científicos construida sobre NumPy: estadística, optimización, álgebra lineal avanzada, procesamiento de señales y matrices dispersas.",
    sintaxis: `pip install scipy
from scipy import stats, optimize`,
    ejemplo: `from scipy import stats

x = [1, 2, 3, 4, 5]
y = [2, 4, 5, 4, 5]
r, p_valor = stats.pearsonr(x, y)
print(r, p_valor)`,
    usoEnML:
      "Se usa para pruebas de hipótesis, correlaciones, optimización de funciones y matrices dispersas (por ejemplo, texto representado como vectores).",
    erroresComunes: [
      "Interpretar un p-valor sin considerar el tamaño de la muestra.",
      "Confundir SciPy con NumPy: NumPy ofrece los arreglos; SciPy ofrece algoritmos sobre ellos.",
    ],
    relacionados: ["NumPy", "scikit-learn"],
  },
  {
    id: "scikit-learn",
    termino: "scikit-learn",
    categoria: LIBRERIAS,
    definicion:
      "Librería de machine learning clásico con una interfaz uniforme: clasificación, regresión, agrupamiento, reducción de dimensionalidad, preprocesamiento y evaluación de modelos.",
    sintaxis: `pip install scikit-learn
from sklearn.ensemble import RandomForestClassifier`,
    ejemplo: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
modelo = RandomForestClassifier(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)
print(modelo.score(X_test, y_test))`,
    usoEnML:
      "Es el punto de partida para la mayoría de proyectos de ML tabular. Todos sus modelos comparten los métodos fit(), predict() y score().",
    erroresComunes: [
      "Fuga de datos (data leakage): ajustar un escalador con todos los datos antes de separar entrenamiento y prueba.",
      "No fijar random_state y no poder reproducir los resultados.",
      "Evaluar el modelo con los mismos datos con los que se entrenó.",
    ],
    relacionados: ["Pipeline", "pandas", "NumPy"],
  },
  {
    id: "tensorflow",
    termino: "TensorFlow / Keras",
    categoria: LIBRERIAS,
    definicion:
      "Plataforma de Google para aprendizaje profundo. Keras es su interfaz de alto nivel para definir, entrenar y desplegar redes neuronales con pocas líneas de código.",
    sintaxis: `pip install tensorflow
import tensorflow as tf`,
    ejemplo: `import tensorflow as tf

modelo = tf.keras.Sequential([
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1),
])
modelo.compile(optimizer="adam", loss="mse")
modelo.fit(X_train, y_train, epochs=20, verbose=0)`,
    usoEnML:
      "Se usa para redes neuronales: imágenes, texto y series de tiempo; también para llevar modelos a móviles y navegadores.",
    erroresComunes: [
      "Datos de entrada con una forma (shape) distinta a la que espera la red.",
      "Instalar una versión de TensorFlow incompatible con la versión de Python.",
    ],
    relacionados: ["PyTorch", "NumPy"],
  },
  {
    id: "pytorch",
    termino: "PyTorch",
    categoria: LIBRERIAS,
    definicion:
      "Librería de aprendizaje profundo de Meta, basada en tensores y en diferenciación automática (autograd). Su estilo es muy cercano a Python normal, lo que facilita experimentar y depurar.",
    sintaxis: `pip install torch
import torch`,
    ejemplo: `import torch

x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
y = (x ** 2).sum()
y.backward()
print(x.grad)  # tensor([2., 4., 6.])`,
    usoEnML:
      "Muy usada en investigación y en modelos modernos (visión, lenguaje). Los modelos se definen como clases que heredan de nn.Module.",
    erroresComunes: [
      "Olvidar optimizer.zero_grad(): los gradientes se acumulan entre pasos.",
      "Mezclar tensores en CPU y en GPU en la misma operación.",
    ],
    relacionados: ["TensorFlow / Keras", "class", "with"],
  },

  // ---------------------------------------------------------------
  // MODOS DE PROGRAMAR
  // ---------------------------------------------------------------
  {
    id: "programacion-imperativa",
    termino: "Programación imperativa",
    categoria: MODOS,
    definicion:
      "Estilo en el que el programa es una secuencia de instrucciones que cambian el estado (variables) paso a paso, con ciclos y condicionales.",
    sintaxis: `# Se describe cómo hacer la tarea, instrucción por instrucción`,
    ejemplo: `datos = [4, 8, 15]
suma = 0
for valor in datos:
    suma += valor
promedio = suma / len(datos)
print(promedio)`,
    usoEnML:
      "Aparece en los ciclos de entrenamiento escritos a mano (por épocas y lotes) y en scripts de preparación de datos.",
    erroresComunes: [
      "Usar ciclos sobre grandes volúmenes de datos numéricos cuando una operación vectorizada es mucho más rápida.",
    ],
    relacionados: ["Programación vectorizada", "Programación funcional"],
  },
  {
    id: "programacion-orientada-a-objetos",
    termino: "Programación orientada a objetos",
    categoria: MODOS,
    definicion:
      "Estilo que organiza el código en objetos que combinan datos y comportamiento, usando clases, herencia y encapsulamiento.",
    sintaxis: `class Hija(Padre):
    def metodo(self):
        ...`,
    ejemplo: `class Escalador:
    def fit(self, datos):
        self.minimo = min(datos)
        self.maximo = max(datos)
        return self

    def transform(self, datos):
        return [(d - self.minimo) / (self.maximo - self.minimo) for d in datos]

esc = Escalador().fit([10, 20, 30])
print(esc.transform([10, 20, 30]))  # [0.0, 0.5, 1.0]`,
    usoEnML:
      "Es el estilo de scikit-learn (objetos con fit y predict) y de PyTorch (modelos como clases). Permite crear modelos y transformadores reutilizables.",
    erroresComunes: [
      "Crear jerarquías de herencia complejas cuando una función simple basta.",
    ],
    relacionados: ["class", "Pipeline"],
  },
  {
    id: "programacion-funcional",
    termino: "Programación funcional",
    categoria: MODOS,
    definicion:
      "Estilo que construye programas combinando funciones puras (mismo resultado para los mismos datos, sin modificar estado externo), con herramientas como map, filter y lambda.",
    sintaxis: `map(funcion, iterable)
filter(funcion, iterable)`,
    ejemplo: `valores = [1, 2, 3, 4]
dobles = list(map(lambda x: x * 2, valores))
pares = list(filter(lambda x: x % 2 == 0, valores))
print(dobles, pares)  # [2, 4, 6, 8] [2, 4]`,
    usoEnML:
      "Aparece en transformaciones de datos con pandas (.apply, .map) y en librerías como JAX, que exigen funciones puras.",
    erroresComunes: [
      "Modificar variables globales dentro de la función y perder la pureza.",
    ],
    relacionados: ["lambda", "Comprensión de listas"],
  },
  {
    id: "programacion-vectorizada",
    termino: "Programación vectorizada",
    categoria: MODOS,
    definicion:
      "Estilo que aplica una operación a un arreglo completo de una sola vez, sin escribir ciclos explícitos. Delega el trabajo a código optimizado en C, por lo que es mucho más rápido.",
    sintaxis: `resultado = arreglo_a operacion arreglo_b`,
    ejemplo: `import numpy as np

precios = np.array([100, 250, 400])
con_iva = precios * 1.19
print(con_iva)  # [119.  297.5 476. ]`,
    usoEnML:
      "Es la forma normal de trabajar con datos en ML: multiplicaciones de matrices, normalización y cálculo de pérdidas sobre miles de muestras a la vez.",
    erroresComunes: [
      "Volver a escribir un ciclo for sobre los elementos de un arreglo de NumPy o una columna de pandas.",
      "Ignorar las reglas de broadcasting y obtener formas inesperadas.",
    ],
    relacionados: ["NumPy", "pandas", "Programación imperativa"],
  },
  {
    id: "pipeline",
    termino: "Pipeline",
    categoria: MODOS,
    definicion:
      "Modo de programar en el que los pasos de un proceso (limpieza, escalado, modelo) se encadenan en un solo objeto que se entrena y se aplica en orden.",
    sintaxis: `Pipeline([("nombre_paso", objeto), ...])`,
    ejemplo: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

flujo = Pipeline([
    ("escalado", StandardScaler()),
    ("modelo", LogisticRegression()),
])
flujo.fit(X_train, y_train)
print(flujo.score(X_test, y_test))`,
    usoEnML:
      "Evita la fuga de datos (el escalador solo aprende de entrenamiento), hace el proceso reproducible y simplifica la validación cruzada.",
    erroresComunes: [
      "Aplicar el preprocesamiento por fuera del pipeline y luego olvidar repetirlo con datos nuevos.",
    ],
    relacionados: ["scikit-learn", "Programación orientada a objetos"],
  },
  {
    id: "programacion-exploratoria",
    termino: "Programación exploratoria (notebooks)",
    categoria: MODOS,
    definicion:
      "Estilo interactivo en el que se escribe y ejecuta código por celdas, mezclando código, resultados, gráficos y texto explicativo. Se usa con Jupyter y Google Colab.",
    sintaxis: `# Cada celda se ejecuta de forma independiente y conserva el estado`,
    ejemplo: `# Celda 1
import pandas as pd
df = pd.read_csv("datos.csv")

# Celda 2
df.describe()

# Celda 3
df["edad"].hist()`,
    usoEnML:
      "Ideal para explorar datos, probar ideas rápido y documentar experimentos. Es el entorno habitual para informes y trabajos de ML.",
    erroresComunes: [
      "Ejecutar celdas en desorden y obtener resultados que no se pueden reproducir.",
      "Dejar código de producción en el notebook en lugar de pasarlo a archivos .py.",
    ],
    relacionados: ["pandas", "Matplotlib", "Programación imperativa"],
  },
];
