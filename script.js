const cursos = [
  {
    nombre: "Epistemología E Historia De La Pedagogía Y La Educación",
    id: "epist",
    requisitos: [],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Desarrollo Humano: Enfoques Y Teorías",
    id: "deshum1",
    requisitos: [],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Desarrollo Humano: Dimensiones",
    id: "deshum2",
    requisitos: ["deshum1"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Desarrollo Humano: Procesos",
    id: "deshum3",
    requisitos: ["deshum2"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Taller De Competencias Comunicativas",
    id: "comunicativas",
    requisitos: [],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Electiva De Contexto I",
    id: "electiva1",
    requisitos: [],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Electiva De Contexto II",
    id: "electiva2",
    requisitos: ["electiva1"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Educación Y Teorías Pedagógicas Contemporáneas",
    id: "educacion1",
    requisitos: ["epist"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Modelos Y Tendencias Pedagógicas Contemporáneas",
    id: "modelos1",
    requisitos: [],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Procesos Curriculares",
    id: "procesosCurr",
    requisitos: ["modelos1"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Procesos De Evaluación En Educación",
    id: "evaluacion",
    requisitos: ["procesosCurr"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Administración Y Legislación Educativa",
    id: "admin",
    requisitos: ["evaluacion"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Electiva De Profundización I",
    id: "prof1",
    requisitos: [],
    creditos: 2,
    creditosRequeridos: 74
  },
  {
    nombre: "Electiva De Profundización II",
    id: "prof2",
    requisitos: ["prof1"],
    creditos: 2,
    creditosRequeridos: 0
  },
  {
    nombre: "Electiva De Profundización III",
    id: "prof3",
    requisitos: ["prof2"],
    creditos: 2,
    creditosRequeridos: 0
  }
];

let creditosAcumulados = 0;
const aprobados = new Set();

function actualizarCreditos() {
  document.getElementById("creditos").innerText =
    `Créditos acumulados: ${creditosAcumulados}`;
}

function puedeAprobar(curso) {
  return curso.requisitos.every(id => aprobados.has(id)) &&
         creditosAcumulados >= curso.creditosRequeridos;
}

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("ramo");
    div.id = curso.id;
    div.innerHTML = `<strong>${curso.nombre}</strong><br>
                     Créditos: ${curso.creditos}<br>
                     Requiere: ${curso.creditosRequeridos}`;

    if (aprobados.has(curso.id)) {
      div.classList.add("approved");
    } else if (puedeAprobar(curso)) {
      div.classList.add("unlocked");
      div.onclick = () => aprobarCurso(curso);
    }

    contenedor.appendChild(div);
  });
}

function aprobarCurso(curso) {
  if (!puedeAprobar(curso) || aprobados.has(curso.id)) return;
  aprobados.add(curso.id);
  creditosAcumulados += curso.creditos;
  actualizarCreditos();
  renderMalla();
}

window.onload = () => {
  actualizarCreditos();
  renderMalla();
};

