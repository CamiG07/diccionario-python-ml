const PALABRAS = "Palabras y funciones";
const LIBRERIAS = "Librerías";
const HERRAMIENTAS = "Herramientas y entorno";
const CONCEPTOS = "Conceptos de machine learning";

module.exports = [
  // ---------------------------------------------------------------
  // PALABRAS Y FUNCIONES (nuevas)
  // ---------------------------------------------------------------
  {
    id: "for-while",
    termino: "for / while",
    categoria: PALABRAS,
    definicion:
      "Estructuras de repetición. for recorre los elementos de un iterable (lista, rango, columnas); while repite un bloque mientras una condición siga siendo verdadera.",
    sintaxis: `for elemento in iterable:
    # instrucciones

while condicion:
    # instrucciones`,
    ejemplo: `for epoca in range(3):
    print("Época", epoca)

paso = 0
while paso < 3:
    paso += 1
print(paso)  # 3`,
    usoEnML:
      "for recorre épocas y lotes durante el entrenamiento; while sirve para entrenar hasta que la pérdida baje de un umbral.",
    erroresComunes: [
      "Crear un while infinito por olvidar actualizar la condición.",
      "Modificar una lista mientras se recorre con for: produce resultados inesperados.",
    ],
    relacionados: ["range", "enumerate", "Programación imperativa"],
  },
  {
    id: "if-elif-else",
    termino: "if / elif / else",
    categoria: PALABRAS,
    definicion:
      "Estructura condicional: ejecuta un bloque de código u otro según se cumpla o no una condición. elif permite encadenar varias condiciones y else cubre el caso restante.",
    sintaxis: `if condicion1:
    # bloque 1
elif condicion2:
    # bloque 2
else:
    # bloque final`,
    ejemplo: `precision = 0.87
if precision >= 0.9:
    print("Excelente")
elif precision >= 0.8:
    print("Buena")
else:
    print("Mejorable")`,
    usoEnML:
      "Se usa para decidir si se detiene el entrenamiento, clasificar un resultado según un umbral o elegir un camino de preprocesamiento.",
    erroresComunes: [
      "Escribir = (asignación) en lugar de == (comparación).",
      "Olvidar los dos puntos o la sangría (indentación) del bloque.",
      "Comparar decimales con == : por la precisión de punto flotante conviene usar umbrales o math.isclose.",
    ],
    relacionados: ["for / while", "try / except"],
  },
  {
    id: "import",
    termino: "import",
    categoria: PALABRAS,
    definicion:
      "Palabra clave que carga un módulo o una librería para poder usar sus funciones y clases. Se puede importar todo el módulo, una parte o darle un alias.",
    sintaxis: `import modulo
import modulo as alias
from modulo import nombre`,
    ejemplo: `import numpy as np
from sklearn.model_selection import train_test_split

print(np.__version__)`,
    usoEnML:
      "Todo proyecto de ML empieza con importaciones: np, pd y plt son alias estándar que se reconocen en toda la comunidad.",
    erroresComunes: [
      "Nombrar un archivo propio igual a una librería (por ejemplo numpy.py): Python importa el tuyo y falla.",
      "Usar from modulo import * : mezcla nombres y dificulta saber de dónde viene cada función.",
      "No instalar el paquete antes: aparece ModuleNotFoundError.",
    ],
    relacionados: ["pip", "NumPy", "pandas"],
  },
  {
    id: "list",
    termino: "list (lista)",
    categoria: PALABRAS,
    definicion:
      "Colección ordenada y modificable de elementos. Admite elementos de distintos tipos, indexación desde 0 y cortes (slicing).",
    sintaxis: `lista = [elemento1, elemento2, ...]
lista[0]        # primer elemento
lista[1:3]      # corte
lista.append(x) # agregar al final`,
    ejemplo: `columnas = ["edad", "ingreso"]
columnas.append("ciudad")
print(columnas[0])   # edad
print(columnas[1:])  # ['ingreso', 'ciudad']`,
    usoEnML:
      "Guarda nombres de columnas, valores de pérdida por época y datos pequeños antes de convertirlos a arreglos de NumPy.",
    erroresComunes: [
      "Hacer b = a creyendo que se copia: ambas variables apuntan a la misma lista; para copiar se usa a.copy().",
      "Pedir un índice fuera de rango (IndexError).",
    ],
    relacionados: ["dict (diccionario)", "tuple (tupla)", "Comprensión de listas", "NumPy"],
  },
  {
    id: "dict",
    termino: "dict (diccionario)",
    categoria: PALABRAS,
    definicion:
      "Colección de pares clave-valor. Permite acceder a un dato por su nombre (clave) en lugar de por su posición. Las claves deben ser únicas e inmutables.",
    sintaxis: `diccionario = {"clave": valor, ...}
diccionario["clave"]
diccionario.get("clave", valor_por_defecto)`,
    ejemplo: `hiperparametros = {"n_estimators": 100, "max_depth": 5}
print(hiperparametros["max_depth"])   # 5
hiperparametros["max_depth"] = 8
print(hiperparametros.get("seed", 42))  # 42 (no existe, usa el valor por defecto)`,
    usoEnML:
      "Almacena hiperparámetros, métricas de un modelo, el mapeo de etiquetas a números y es la forma más directa de crear un DataFrame de pandas.",
    erroresComunes: [
      "Acceder a una clave que no existe con [] y obtener KeyError; .get() evita el error.",
      "Usar una lista como clave: las claves tienen que ser inmutables.",
    ],
    relacionados: ["list (lista)", "*args y **kwargs", "pandas"],
  },
  {
    id: "tuple",
    termino: "tuple (tupla)",
    categoria: PALABRAS,
    definicion:
      "Colección ordenada e inmutable: una vez creada, sus elementos no se pueden cambiar. Se usa para agrupar valores que van juntos.",
    sintaxis: `tupla = (valor1, valor2)
a, b = tupla   # desempaquetado`,
    ejemplo: `forma = (150, 4)
filas, columnas = forma
print(filas, columnas)  # 150 4`,
    usoEnML:
      "El atributo shape de NumPy y pandas es una tupla. Además, funciones como train_test_split devuelven varios resultados juntos en una tupla.",
    erroresComunes: [
      "Una tupla de un solo elemento necesita coma: (5,); sin ella es solo un número entre paréntesis.",
      "Intentar modificar un elemento: provoca TypeError.",
    ],
    relacionados: ["list (lista)", "NumPy", "zip"],
  },
  {
    id: "f-string",
    termino: "f-string",
    categoria: PALABRAS,
    definicion:
      "Cadena de texto con prefijo f que permite insertar variables y expresiones dentro de llaves {} y controlar su formato.",
    sintaxis: `f"texto {variable}"
f"{numero:.2f}"   # 2 decimales
f"{proporcion:.1%}"  # porcentaje`,
    ejemplo: `exactitud = 0.9234
print(f"Exactitud: {exactitud:.2%}")  # Exactitud: 92.34%`,
    usoEnML:
      "Es la forma estándar de mostrar métricas y progreso del entrenamiento con formato legible.",
    erroresComunes: [
      "Olvidar la f antes de las comillas: las llaves se imprimen literalmente.",
      "Usar comillas del mismo tipo dentro de la expresión en versiones antiguas de Python.",
    ],
    relacionados: ["enumerate", "Precisión, recall y F1"],
  },
  {
    id: "range",
    termino: "range",
    categoria: PALABRAS,
    definicion:
      "Función incorporada que genera una secuencia de números enteros con inicio, fin (no incluido) y paso. No crea la lista completa en memoria.",
    sintaxis: `range(fin)
range(inicio, fin)
range(inicio, fin, paso)`,
    ejemplo: `for i in range(0, 10, 2):
    print(i)   # 0 2 4 6 8
print(list(range(3)))  # [0, 1, 2]`,
    usoEnML:
      "Controla el número de épocas y recorre los datos en saltos del tamaño de cada lote.",
    erroresComunes: [
      "Esperar que el valor final esté incluido: range(5) llega hasta 4.",
      "Pensar que range devuelve una lista: para verla hay que convertirla con list().",
    ],
    relacionados: ["for / while", "yield"],
  },
  {
    id: "args-kwargs",
    termino: "*args y **kwargs",
    categoria: PALABRAS,
    definicion:
      "Permiten que una función reciba una cantidad variable de argumentos. *args reúne los argumentos posicionales en una tupla; **kwargs reúne los argumentos con nombre en un diccionario.",
    sintaxis: `def funcion(*args, **kwargs):
    ...`,
    ejemplo: `def sumar(*numeros):
    return sum(numeros)
print(sumar(1, 2, 3))  # 6

def configurar(**opciones):
    return opciones
print(configurar(lr=0.01, epocas=10))  # {'lr': 0.01, 'epocas': 10}`,
    usoEnML:
      "Los modelos de scikit-learn aceptan hiperparámetros como argumentos con nombre; con un diccionario se pasan así: RandomForestClassifier(**parametros).",
    erroresComunes: [
      "Poner **kwargs antes de *args en la definición: es un error de sintaxis.",
      "Confundir el asterisco de desempaquetado con el de multiplicación.",
    ],
    relacionados: ["def", "dict (diccionario)", "tuple (tupla)"],
  },
  {
    id: "yield",
    termino: "yield",
    categoria: PALABRAS,
    definicion:
      "Convierte una función en un generador: en lugar de devolver todo de una vez, entrega un valor cada vez que se le pide y recuerda dónde se quedó.",
    sintaxis: `def generador():
    yield valor`,
    ejemplo: `def lotes(datos, tamano):
    for i in range(0, len(datos), tamano):
        yield datos[i:i + tamano]

for lote in lotes([1, 2, 3, 4, 5], 2):
    print(lote)
# [1, 2]
# [3, 4]
# [5]`,
    usoEnML:
      "Permite entregar los datos por lotes (batches) sin cargar todo el conjunto en memoria, que es la idea detrás de los cargadores de datos de PyTorch y Keras.",
    erroresComunes: [
      "Recorrer un generador por segunda vez: ya se consumió y queda vacío.",
      "Confundirlo con return: yield no termina la función, la pausa.",
    ],
    relacionados: ["def", "range", "for / while"],
  },

  // ---------------------------------------------------------------
  // LIBRERÍAS (nuevas)
  // ---------------------------------------------------------------
  {
    id: "xgboost",
    termino: "XGBoost",
    categoria: LIBRERIAS,
    definicion:
      "Librería de gradient boosting: construye árboles de decisión uno tras otro, y cada árbol corrige los errores del anterior. Es rápida y suele dar muy buen rendimiento en datos tabulares.",
    sintaxis: `pip install xgboost
from xgboost import XGBClassifier`,
    ejemplo: `from xgboost import XGBClassifier

modelo = XGBClassifier(n_estimators=200, learning_rate=0.1, max_depth=4)
modelo.fit(X_train, y_train)
print(modelo.score(X_test, y_test))`,
    usoEnML:
      "Muy usada en competencias y proyectos con tablas de datos (clasificación y regresión). Tiene interfaz compatible con scikit-learn.",
    erroresComunes: [
      "Usar demasiados árboles sin detención temprana (early stopping): sobreajusta.",
      "Dejar sin ajustar learning_rate y max_depth, que tienen mucho efecto en el resultado.",
    ],
    relacionados: ["scikit-learn", "Random Forest", "Sobreajuste"],
  },
  {
    id: "opencv",
    termino: "OpenCV",
    categoria: LIBRERIAS,
    definicion:
      "Librería de visión por computador: lectura y escritura de imágenes y video, filtros, detección de bordes y rostros, y transformaciones geométricas.",
    sintaxis: `pip install opencv-python
import cv2`,
    ejemplo: `import cv2

imagen = cv2.imread("foto.jpg")
gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
pequena = cv2.resize(gris, (224, 224))
print(pequena.shape)  # (224, 224)`,
    usoEnML:
      "Prepara imágenes antes de entrenar redes neuronales: redimensionar, convertir a escala de grises y normalizar.",
    erroresComunes: [
      "OpenCV lee los colores en orden BGR, no RGB; al graficar con Matplotlib los colores salen alterados.",
      "Si la ruta es incorrecta, imread devuelve None en lugar de lanzar un error.",
    ],
    relacionados: ["NumPy", "TensorFlow / Keras", "PyTorch"],
  },
  {
    id: "nltk",
    termino: "NLTK",
    categoria: LIBRERIAS,
    definicion:
      "Librería de procesamiento de lenguaje natural (PLN): separación de texto en palabras u oraciones (tokenización), listas de palabras vacías, derivación de palabras y corpus lingüísticos.",
    sintaxis: `pip install nltk
import nltk`,
    ejemplo: `import nltk
from nltk.tokenize import word_tokenize

nltk.download("punkt")
print(word_tokenize("El modelo aprende de los datos.", language="spanish"))
# ['El', 'modelo', 'aprende', 'de', 'los', 'datos', '.']`,
    usoEnML:
      "Se usa para preparar texto antes de convertirlo en números: tokenizar, quitar palabras vacías y reducir palabras a su raíz.",
    erroresComunes: [
      "No descargar los recursos necesarios con nltk.download(); según la versión instalada el recurso puede llamarse punkt o punkt_tab, y el mensaje de error indica cuál falta.",
      "Olvidar indicar el idioma al trabajar con texto en español.",
    ],
    relacionados: ["scikit-learn", "pandas"],
  },
  {
    id: "statsmodels",
    termino: "statsmodels",
    categoria: LIBRERIAS,
    definicion:
      "Librería de modelos estadísticos que entrega resultados detallados: coeficientes, errores estándar, p-valores e intervalos de confianza. Es más interpretativa que predictiva.",
    sintaxis: `pip install statsmodels
import statsmodels.api as sm`,
    ejemplo: `import statsmodels.api as sm

X = sm.add_constant(df["horas_estudio"])
modelo = sm.OLS(df["nota"], X).fit()
print(modelo.summary())`,
    usoEnML:
      "Útil cuando importa entender qué variables influyen y con qué significancia, por ejemplo en regresión lineal y análisis de series de tiempo.",
    erroresComunes: [
      "Olvidar sm.add_constant: el modelo se ajusta sin intercepto.",
      "Interpretar un coeficiente significativo como relación causal.",
    ],
    relacionados: ["SciPy", "pandas", "scikit-learn"],
  },
  {
    id: "joblib",
    termino: "joblib",
    categoria: LIBRERIAS,
    definicion:
      "Librería para guardar y cargar objetos de Python de forma eficiente, en especial modelos entrenados y arreglos grandes. También permite paralelizar tareas.",
    sintaxis: `pip install joblib
import joblib`,
    ejemplo: `import joblib

joblib.dump(modelo, "modelo.joblib")
modelo_cargado = joblib.load("modelo.joblib")
print(modelo_cargado.predict(X_test[:3]))`,
    usoEnML:
      "Permite entrenar una vez y reutilizar el modelo después (por ejemplo, desde una API) sin volver a entrenarlo.",
    erroresComunes: [
      "Cargar el archivo con una versión distinta de scikit-learn que la usada al guardarlo: puede fallar o dar resultados distintos.",
      "Cargar archivos de origen desconocido: al deserializar se puede ejecutar código, así que solo se cargan archivos de confianza.",
    ],
    relacionados: ["scikit-learn", "Pipeline"],
  },

  // ---------------------------------------------------------------
  // HERRAMIENTAS Y ENTORNO (nueva categoría)
  // ---------------------------------------------------------------
  {
    id: "venv",
    termino: "Entorno virtual (venv)",
    categoria: HERRAMIENTAS,
    definicion:
      "Carpeta aislada con su propia copia de Python y sus propias librerías. Cada proyecto puede tener versiones distintas sin que choquen entre sí.",
    sintaxis: `python -m venv .venv
.venv\\Scripts\\activate        # Windows
source .venv/bin/activate     # macOS y Linux
deactivate`,
    ejemplo: `python -m venv .venv
.venv\\Scripts\\activate
pip install numpy pandas scikit-learn`,
    usoEnML:
      "Los proyectos de ML dependen de versiones específicas (TensorFlow, PyTorch, scikit-learn); el entorno virtual evita conflictos entre proyectos.",
    erroresComunes: [
      "Instalar paquetes sin activar el entorno: quedan en el Python global.",
      "Incluir la carpeta .venv en una entrega o en un repositorio: es pesada y no es necesaria; basta con un requirements.txt.",
    ],
    relacionados: ["pip", "Git y GitHub"],
  },
  {
    id: "pip",
    termino: "pip",
    categoria: HERRAMIENTAS,
    definicion:
      "Gestor de paquetes de Python: instala, actualiza y desinstala librerías desde el repositorio PyPI y permite guardar la lista de dependencias de un proyecto.",
    sintaxis: `pip install paquete
pip uninstall paquete
pip freeze > requirements.txt
pip install -r requirements.txt`,
    ejemplo: `python -m pip install scikit-learn
python -m pip freeze > requirements.txt`,
    usoEnML:
      "Instala todo el ecosistema (NumPy, pandas, scikit-learn, TensorFlow, PyTorch) y deja registrado el entorno para que otra persona reproduzca el proyecto.",
    erroresComunes: [
      "Usar un pip que pertenece a otra instalación de Python; python -m pip garantiza que sea la misma.",
      "Confundir el nombre del paquete con el de importación: se instala scikit-learn pero se importa sklearn.",
    ],
    relacionados: ["Entorno virtual (venv)", "import"],
  },
  {
    id: "git",
    termino: "Git y GitHub",
    categoria: HERRAMIENTAS,
    definicion:
      "Git es un sistema de control de versiones: guarda el historial de cambios de un proyecto y permite volver atrás o trabajar en ramas. GitHub es un servicio web para alojar esos repositorios y colaborar.",
    sintaxis: `git init
git add .
git commit -m "mensaje"
git push`,
    ejemplo: `git init
git add .
git commit -m "Primera versión del diccionario"`,
    usoEnML:
      "Permite registrar cada experimento y compartir código y notebooks con el equipo. Los datos grandes y los modelos pesados no se suben directamente.",
    erroresComunes: [
      "Subir datos sensibles, contraseñas o claves; para evitarlo se usa un archivo .gitignore.",
      "Hacer commits enormes con mensajes vagos: no ayudan a entender el historial.",
    ],
    relacionados: ["Entorno virtual (venv)", "Programación exploratoria (notebooks)"],
  },

  // ---------------------------------------------------------------
  // CONCEPTOS DE MACHINE LEARNING (nueva categoría)
  // ---------------------------------------------------------------
  {
    id: "sobreajuste",
    termino: "Sobreajuste (overfitting)",
    categoria: CONCEPTOS,
    definicion:
      "Ocurre cuando un modelo aprende demasiado bien los datos de entrenamiento, incluido su ruido, y por eso generaliza mal a datos nuevos. El caso contrario, subajuste (underfitting), es un modelo tan simple que no aprende ni los patrones principales.",
    sintaxis: `# Señal de alerta: gran diferencia entre el puntaje de entrenamiento y el de prueba`,
    ejemplo: `print(modelo.score(X_train, y_train))  # 0.99
print(modelo.score(X_test, y_test))    # 0.78`,
    usoEnML:
      "Se reduce con más datos, modelos más simples, regularización, validación cruzada, límites de profundidad en árboles y detención temprana en redes neuronales.",
    erroresComunes: [
      "Evaluar solo con los datos de entrenamiento y creer que el modelo es excelente.",
      "Ajustar hiperparámetros mirando el conjunto de prueba: el modelo termina adaptado también a esos datos.",
    ],
    relacionados: ["Validación cruzada", "Hiperparámetros y GridSearchCV", "Random Forest"],
  },
  {
    id: "validacion-cruzada",
    termino: "Validación cruzada",
    categoria: CONCEPTOS,
    definicion:
      "Técnica para evaluar un modelo dividiendo los datos en k partes: se entrena con k-1 partes y se prueba con la restante, repitiendo hasta que cada parte haya sido de prueba. El resultado final es el promedio de los k puntajes.",
    sintaxis: `cross_val_score(modelo, X, y, cv=5)`,
    ejemplo: `from sklearn.model_selection import cross_val_score

puntajes = cross_val_score(modelo, X, y, cv=5)
print(puntajes.mean(), puntajes.std())`,
    usoEnML:
      "Da una estimación más estable del rendimiento que una sola división entrenamiento-prueba, sobre todo con pocos datos.",
    erroresComunes: [
      "Preprocesar todos los datos antes de la validación cruzada: genera fuga de datos; lo correcto es meter el preprocesamiento en un Pipeline.",
      "Mezclar al azar datos de series de tiempo: se debe respetar el orden cronológico.",
    ],
    relacionados: ["Sobreajuste (overfitting)", "Pipeline", "scikit-learn"],
  },
  {
    id: "matriz-confusion",
    termino: "Matriz de confusión",
    categoria: CONCEPTOS,
    definicion:
      "Tabla que compara las clases reales con las predichas por un clasificador. En clasificación binaria muestra verdaderos negativos, falsos positivos, falsos negativos y verdaderos positivos.",
    sintaxis: `confusion_matrix(y_real, y_predicho)
# Formato binario: [[VN, FP],
#                   [FN, VP]]`,
    ejemplo: `from sklearn.metrics import confusion_matrix

y_real = [1, 0, 1, 1, 0]
y_pred = [1, 0, 0, 1, 0]
print(confusion_matrix(y_real, y_pred))
# [[2 0]
#  [1 2]]`,
    usoEnML:
      "Muestra qué tipo de errores comete el modelo, algo que un solo número como la exactitud no revela. De ella se derivan precisión, recall y F1.",
    erroresComunes: [
      "Leer las filas y columnas al revés: en scikit-learn las filas son las clases reales y las columnas las predichas.",
    ],
    relacionados: ["Precisión, recall y F1", "Seaborn"],
  },
  {
    id: "precision-recall-f1",
    termino: "Precisión, recall y F1",
    categoria: CONCEPTOS,
    definicion:
      "Métricas de clasificación. Precisión: de lo que el modelo marcó como positivo, cuánto era realmente positivo (VP / (VP + FP)). Recall (sensibilidad): de todos los positivos reales, cuántos encontró (VP / (VP + FN)). F1: media armónica entre ambos.",
    sintaxis: `F1 = 2 * (precision * recall) / (precision + recall)`,
    ejemplo: `from sklearn.metrics import precision_score, recall_score, f1_score

y_real = [1, 0, 1, 1, 0]
y_pred = [1, 0, 0, 1, 0]
print(precision_score(y_real, y_pred))  # 1.0
print(recall_score(y_real, y_pred))     # 0.666...
print(f1_score(y_real, y_pred))         # 0.8 aprox.`,
    usoEnML:
      "Son esenciales cuando las clases están desbalanceadas, por ejemplo detección de fraude o de enfermedades, donde la exactitud engaña.",
    erroresComunes: [
      "Usar solo la exactitud (accuracy) con clases desbalanceadas: un modelo que siempre predice la clase mayoritaria parece bueno.",
      "Confundir precisión (precision) con exactitud (accuracy): son métricas distintas.",
    ],
    relacionados: ["Matriz de confusión", "scikit-learn", "f-string"],
  },
  {
    id: "hiperparametros",
    termino: "Hiperparámetros y GridSearchCV",
    categoria: CONCEPTOS,
    definicion:
      "Los hiperparámetros son configuraciones que se fijan antes de entrenar (número de árboles, profundidad, tasa de aprendizaje); el modelo no los aprende solo. GridSearchCV prueba combinaciones de ellos usando validación cruzada y elige la mejor.",
    sintaxis: `GridSearchCV(modelo, rejilla_de_parametros, cv=5)`,
    ejemplo: `from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

rejilla = {"n_estimators": [50, 100], "max_depth": [3, 5, None]}
busqueda = GridSearchCV(RandomForestClassifier(random_state=42), rejilla, cv=5)
busqueda.fit(X_train, y_train)
print(busqueda.best_params_)`,
    usoEnML:
      "Mejora el rendimiento de un modelo de forma sistemática en lugar de probar valores al azar.",
    erroresComunes: [
      "Usar una rejilla enorme: el tiempo crece con cada combinación y cada partición de la validación cruzada.",
      "No reservar un conjunto de prueba final que la búsqueda nunca haya visto.",
    ],
    relacionados: ["Validación cruzada", "Random Forest", "dict (diccionario)"],
  },
  {
    id: "estandarizacion",
    termino: "Estandarización (StandardScaler)",
    categoria: CONCEPTOS,
    definicion:
      "Transformación que centra cada variable en media 0 y desviación estándar 1, usando z = (x - media) / desviación. Se diferencia de la normalización min-max, que lleva los valores a un rango como 0 a 1.",
    sintaxis: `escalador = StandardScaler()
escalador.fit_transform(X_train)
escalador.transform(X_test)`,
    ejemplo: `from sklearn.preprocessing import StandardScaler

escalador = StandardScaler()
X_train_esc = escalador.fit_transform(X_train)
X_test_esc = escalador.transform(X_test)`,
    usoEnML:
      "Es necesaria en modelos sensibles a la escala, como regresión logística, SVM, k-vecinos y redes neuronales, para que una variable en miles no domine a otra en decenas.",
    erroresComunes: [
      "Aplicar fit_transform sobre los datos de prueba: el escalador aprende de datos que no debería ver (fuga de datos); en prueba solo se usa transform.",
      "Escalar árboles de decisión sin necesidad: no dependen de la escala.",
    ],
    relacionados: ["Pipeline", "scikit-learn", "Gradiente descendente"],
  },
  {
    id: "gradiente-descendente",
    termino: "Gradiente descendente",
    categoria: CONCEPTOS,
    definicion:
      "Algoritmo de optimización que ajusta los parámetros de un modelo moviéndolos en dirección contraria al gradiente de la función de pérdida, para ir reduciendo el error paso a paso. Cada paso se escala con la tasa de aprendizaje.",
    sintaxis: `parametro = parametro - tasa_aprendizaje * gradiente`,
    ejemplo: `w = 0.0
tasa = 0.1
for _ in range(50):
    gradiente = 2 * (w - 3)   # derivada de (w - 3) ** 2
    w = w - tasa * gradiente
print(round(w, 3))  # 3.0`,
    usoEnML:
      "Es el motor del entrenamiento de regresiones y redes neuronales. En PyTorch y TensorFlow el gradiente se calcula automáticamente (autograd).",
    erroresComunes: [
      "Tasa de aprendizaje muy alta: el error oscila o diverge; muy baja: el entrenamiento es lentísimo.",
      "No escalar las variables: las curvas de error se deforman y la convergencia se hace lenta.",
    ],
    relacionados: ["PyTorch", "TensorFlow / Keras", "Estandarización (StandardScaler)"],
  },
  {
    id: "random-forest",
    termino: "Random Forest",
    categoria: CONCEPTOS,
    definicion:
      "Modelo de ensamble formado por muchos árboles de decisión. Cada árbol se entrena con una muestra aleatoria de los datos y considera un subconjunto aleatorio de variables en cada división. La predicción final es el voto mayoritario (clasificación) o el promedio (regresión).",
    sintaxis: `RandomForestClassifier(n_estimators=100, max_depth=None, random_state=42)`,
    ejemplo: `from sklearn.ensemble import RandomForestClassifier

bosque = RandomForestClassifier(n_estimators=200, max_depth=6, random_state=42)
bosque.fit(X_train, y_train)
print(bosque.feature_importances_)`,
    usoEnML:
      "Funciona bien con pocos ajustes, soporta variables numéricas y categóricas codificadas, y entrega la importancia de cada variable.",
    erroresComunes: [
      "Interpretar la importancia de variables como causalidad: solo indica cuánto usa el modelo cada variable.",
      "Dejar los árboles crecer sin límite de profundidad en datos ruidosos: puede sobreajustar.",
    ],
    relacionados: ["scikit-learn", "XGBoost", "Sobreajuste (overfitting)", "Hiperparámetros y GridSearchCV"],
  },
];
