const cursos = [
  {
    "nombre": "Epistemología E Historia De La Pedagogía Y La Educación",
    "id": "epist", "requisitos": [], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Desarrollo Humano: Enfoques Y Teorías",
    "id": "deshum1", "requisitos": [], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Desarrollo Humano: Dimensiones",
    "id": "deshum2", "requisitos": ["deshum1"], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Desarrollo Humano: Procesos",
    "id": "deshum3", "requisitos": ["deshum2"], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Taller De Competencias Comunicativas",
    "id": "comunicativas", "requisitos": [], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Electiva De Contexto I",
    "id": "electiva1", "requisitos": [], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Electiva De Contexto II",
    "id": "electiva2", "requisitos": ["electiva1"], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Educación Y Teorías Pedagógicas Contemporáneas",
    "id": "educacion1", "requisitos": ["epist"], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Modelos Y Tendencias Pedagógicas Contemporáneas",
    "id": "modelos1", "requisitos": [], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Procesos Curriculares",
    "id": "procesosCurr", "requisitos": ["modelos1"], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Procesos De Evaluación En Educación",
    "id": "evaluacion", "requisitos": ["procesosCurr"], "creditos": 2, "creditosRequeridos": 0
  },
  {
    "nombre": "Administración Y Legislación Educativa",
    "id": "admin", "requisitos": ["evaluacion"], "creditos": 2, "creditosRequeridos": 0
  }
  // Puedes copiar y pegar el resto aquí mismo para completar todos los cursos
];

let creditosTotales = 0;
const aprobados = new Set();

function puedeDesbloquear(curso) {
  return curso.requisitos.every(r => aprobados.has(r)) &&
         creditosTotales >= curso.creditosRequeridos;
}

function actualizarUI() {
  cursos.forEach(curso => {
    const div = document.getElementById(curso.id);
    const btn = div.querySelector("button");
    if (aprobados.has(curso.id)) {
      div.classList.add("approved");
      btn.disabled = true;
      btn.textContent = "Aprobado";
    } else if (puedeDesbloquear(curso)) {
      div.classList.remove("locked");
      btn.disabled = false;
    } else {
      div.classList.add("locked");
      btn.disabled = true;
    }
  });
  document.getElementById("total-creditos").textContent = `Créditos acumulados: ${creditosTotales}`;
}

function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso locked";
    div.id = curso.id;

    const nombre = document.createElement("h4");
    nombre.textContent = curso.nombre;

    const creditos = document.createElement("p");
    creditos.textContent = `Créditos: ${curso.creditos}`;

    const btn = document.createElement("button");
    btn.textContent = "Aprobar";
    btn.disabled = true;
    btn.onclick = () => {
      aprobados.add(curso.id);
      creditosTotales += curso.creditos;
      actualizarUI();
    };

    div.appendChild(nombre);
    div.appendChild(creditos);
    div.appendChild(btn);
    contenedor.appendChild(div);
  });
  actualizarUI();
}

window.onload = crearMalla;
