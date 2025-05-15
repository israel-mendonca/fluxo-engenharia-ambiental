document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const grade = document.getElementById("grade");
  
  // Remove contadores existentes para evitar duplicação
  document.querySelectorAll('#contador-horas').forEach(el => el.remove());
  
  // Cria o contador de horas
  const contadorHoras = document.createElement("div");
  contadorHoras.id = "contador-horas";
  document.body.appendChild(contadorHoras);

  // Dados das disciplinas (mantido igual ao seu original)
  const disciplinas = [
    // Período 1
    { nome: "Biologia Celular", periodo: 1 },
    { nome: "Cálculo I", periodo: 1 },
    { nome: "Desenho Técnico", periodo: 1 },
    { nome: "Ecologia I", periodo: 1 },
    { nome: "Geometria Analítica", periodo: 1 },
    { nome: "Introdução à Engenharia Ambiental", periodo: 1 },
    { nome: "Química Geral e Analítica", periodo: 1 },
    { nome: "Química Geral Experimental", periodo: 1, correquisitos: ["Química Geral e Analítica"] },
  
    // Período 2
    { nome: "Álgebra Linear", periodo: 2 },
    { nome: "Cálculo II", periodo: 2, prerequisitos: ["Cálculo I"] },
    { nome: "Ecologia II", periodo: 2, prerequisitos: ["Ecologia I"] },
    { nome: "Estatística", periodo: 2, prerequisitos: ["Cálculo I"] },
    { nome: "Física: Mecânica", periodo: 2, prerequisitos: ["Cálculo I"] },
    { nome: "Geologia Geral", periodo: 2 },
    { nome: "Lab. Física: Mecânica", periodo: 2, correquisitos: ["Física: Mecânica"] },
    { nome: "Química Orgânica", periodo: 2 },
    { nome: "Química Orgânica Experimental", periodo: 2, prerequisitos: ["Química Geral Experimental"], correquisitos: ["Química Orgânica"] },
  
    // Período 3
    { nome: "Algoritmos e Programação", periodo: 3 },
    { nome: "Bioquímica Ambiental", periodo: 3, prerequisitos: ["Biologia Celular", "Química Orgânica"] },
    { nome: "Cálculo III", periodo: 3, prerequisitos: ["Cálculo II"] },
    { nome: "Física: Eletromagnetismo", periodo: 3, prerequisitos: ["Cálculo I"] },
    { nome: "Geomática I", periodo: 3 },
    { nome: "Lab. Física: Eletromagnetismo", periodo: 3, correquisitos: ["Física: Eletromagnetismo"] },
    { nome: "Metodologia Científica", periodo: 3 },
    { nome: "Química Ambiental", periodo: 3, prerequisitos: ["Química Geral e Analítica", "Química Orgânica"] },
  
    // Período 4
    { nome: "Cálculo Numérico", periodo: 4, prerequisitos: ["Algoritmos e Programação", "Cálculo III"] },
    { nome: "Expressão Gráfica", periodo: 4, prerequisitos: ["Desenho Técnico"] },
    { nome: "Fenômenos de Transporte I", periodo: 4, correquisitos: ["Cálculo Numérico"] },
    { nome: "Geomática II", periodo: 4, correquisitos: ["Sensoriamento Remoto"] },
    { nome: "Introdução à Ciência do Solo", periodo: 4, prerequisitos: ["Geologia Geral"] },
    { nome: "Mecânica dos Materiais", periodo: 4, prerequisitos: ["Cálculo II"] },
    { nome: "Microbiologia Ambiental", periodo: 4, prerequisitos: ["Bioquímica Ambiental"] },
    { nome: "Sensoriamento Remoto", periodo: 4 },
  
    // Período 5
    { nome: "Biorremediação", periodo: 5, prerequisitos: ["Microbiologia Ambiental"] },
    { nome: "Fenômenos de Transporte II", periodo: 5, prerequisitos: ["Fenômenos de Transporte I"] },
    { nome: "Hidráulica", periodo: 5, prerequisitos: ["Expressão Gráfica", "Fenômenos de Transporte I"] },
    { nome: "Mecânica dos Solos", periodo: 5, prerequisitos: ["Introdução à Ciência do Solo"] },
    { nome: "Qualidade da Água", periodo: 5, prerequisitos: ["Química Ambiental"] },
    { nome: "Resistência dos Materiais", periodo: 5, prerequisitos: ["Mecânica dos Materiais"] },
  
    // Período 6
    { nome: "Instalações Elétricas", periodo: 6, prerequisitos: ["Física: Eletromagnetismo"] },
    { nome: "Materiais de Construção Civil", periodo: 6 },
    { nome: "Meteorologia e Climatologia Ambiental", periodo: 6, prerequisitos: ["Fenômenos de Transporte II"] },
    { nome: "Resíduos Sólidos I", periodo: 6, prerequisitos: ["Mecânica dos Solos"] },
    { nome: "Sistemas de Abastecimento de Água", periodo: 6, prerequisitos: ["Hidráulica"] },
    { nome: "Sistema de Informação Geográfica", periodo: 6, prerequisitos: ["Sensoriamento Remoto"] },
    { nome: "Sistemas de Tratamento de Água", periodo: 6, prerequisitos: ["Hidráulica"] },
    { nome: "Teoria das Estruturas", periodo: 6, prerequisitos: ["Resistência dos Materiais"] },
  
    // Período 7
    { nome: "Estruturas de Concreto Armado", periodo: 7, prerequisitos: ["Teoria das Estruturas"], correquisitos: ["Fundações e Obras Geotécnicas"] },
    { nome: "Fundações e Obras Geotécnicas", periodo: 7, prerequisitos: ["Mecânica dos Solos"] },
    { nome: "Gestão Ambiental", periodo: 7, prerequisitos: ["Resíduos Sólidos I"] },
    { nome: "Hidrologia", periodo: 7, prerequisitos: ["Meteorologia e Climatologia Ambiental"] },
    { nome: "Limnologia Aplicada", periodo: 7, prerequisitos: ["Ecologia II", "Qualidade da Água"] },
    { nome: "Recuperação de Áreas Degradadas", periodo: 7, prerequisitos: ["Introdução à Ciência do Solo"] },
    { nome: "Sistemas de Esgotamento Sanitário", periodo: 7, prerequisitos: ["Hidráulica"] },
    { nome: "Sistemas de Tratamento de Águas Residuárias", periodo: 7, prerequisitos: ["Hidráulica"] },
  
    // Período 8
    { nome: "Avaliação de Impactos Ambientais", periodo: 8 },
    { nome: "Economia Ambiental", periodo: 8 },
    { nome: "Engenharia de Recursos Hídricos I", periodo: 8, prerequisitos: ["Fundações e Obras Geotécnicas", "Hidráulica", "Hidrologia"] },
    { nome: "Higiene e Vigilância Sanitária de Alimentos", periodo: 8, prerequisitos: ["Microbiologia Ambiental", "Qualidade da Água"] },
    { nome: "Poluição e Tratamento do Ar", periodo: 8, prerequisitos: ["Meteorologia e Climatologia Ambiental"] },
    { nome: "Sistemas Hidráulicos Prediais", periodo: 8, prerequisitos: ["Hidráulica"] },
    { nome: "Técnicas de Construção Civil", periodo: 8, prerequisitos: ["Estruturas de Concreto Armado", "Materiais de Construção Civil"] },
    { nome: "Trabalho de Conclusão de Curso", periodo: 8, prerequisitos: ["Metodologia Científica"] },
  
    // Período 9
    { nome: "Cultura, Sociedade e Políticas Públicas", periodo: 9 },
    { nome: "Epidemiologia e Saúde Pública", periodo: 9 },
    { nome: "Gestão Empresarial e Empreendedorismo", periodo: 9 },
    { nome: "Legislação e Direito Ambiental", periodo: 9 },
    { nome: "Licenciamento Ambiental", periodo: 9, prerequisitos: ["Avaliação de Impactos Ambientais"] },
    { nome: "Planejamento das Construções", periodo: 9, prerequisitos: ["Técnicas de Construção Civil"] },
  
    // Período 10
    { nome: "Estágio Obrigatório", periodo: 10 },
  ];

  // Cargas horárias (mantido igual ao seu original)
  const cargasHorarias = {
    "Biologia Celular": 60,
    "Cálculo I": 90,
    "Desenho Técnico": 45,
    "Ecologia I": 45,
    "Geometria Analítica": 60,
    "Introdução à Engenharia Ambiental": 30,
    "Química Geral e Analítica": 45,
    "Química Geral Experimental": 30,
    "Álgebra Linear": 45,
    "Cálculo II": 90,
    "Ecologia II": 45,
    "Estatística": 60,
    "Física: Mecânica": 60,
    "Geologia Geral": 60,
    "Lab. Física: Mecânica": 30,
    "Química Orgânica": 30,
    "Química Orgânica Experimental": 30,
    "Algoritmos e Programação": 60,
    "Bioquímica Ambiental": 60,
    "Cálculo III": 90,
    "Física: Eletromagnetismo": 60,
    "Geomática I": 60,
    "Lab. Física: Eletromagnetismo": 30,
    "Metodologia Científica": 30,
    "Química Ambiental": 60,
    "Cálculo Numérico": 60,
    "Expressão Gráfica": 45,
    "Fenômenos de Transporte I": 60,
    "Geomática II": 60,
    "Introdução à Ciência do Solo": 60,
    "Mecânica dos Materiais": 60,
    "Microbiologia Ambiental": 45,
    "Sensoriamento Remoto": 45,
    "Biorremediação": 60,
    "Fenômenos de Transporte II": 60,
    "Hidráulica": 60,
    "Mecânica dos Solos": 60,
    "Qualidade da Água": 60,
    "Resistência dos Materiais": 60,
    "Instalações Elétricas": 60,
    "Materiais de Construção Civil": 60,
    "Meteorologia e Climatologia Ambiental": 60,
    "Resíduos Sólidos I": 60,
    "Sistemas de Abastecimento de Água": 45,
    "Sistema de Informação Geográfica": 45,
    "Sistemas de Tratamento de Água": 45,
    "Teoria das Estruturas": 60,
    "Estruturas de Concreto Armado": 60,
    "Fundações e Obras Geotécnicas": 45,
    "Gestão Ambiental": 45,
    "Hidrologia": 60,
    "Limnologia Aplicada": 45,
    "Recuperação de Áreas Degradadas": 60,
    "Sistemas de Esgotamento Sanitário": 30,
    "Sistemas de Tratamento de Águas Residuárias": 60,
    "Avaliação de Impactos Ambientais": 60,
    "Economia Ambiental": 45,
    "Engenharia de Recursos Hídricos I": 75,
    "Higiene e Vigilância Sanitária de Alimentos": 30,
    "Poluição e Tratamento do Ar": 60,
    "Sistemas Hidráulicos Prediais": 60,
    "Técnicas de Construção Civil": 60,
    "Trabalho de Conclusão de Curso": 30,
    "Cultura, Sociedade e Políticas Públicas": 45,
    "Epidemiologia e Saúde Pública": 45,
    "Gestão Empresarial e Empreendedorismo": 60,
    "Legislação e Direito Ambiental": 45,
    "Licenciamento Ambiental": 45,
    "Planejamento das Construções": 60,
    "Estágio Obrigatório": 160
  };

      // Estado da aplicação
  const state = {
    completedHours: 0,
    completedCourses: new Set()
  };

  // Inicialização
  initGrade();
  initEventListeners();
  updateAll();

  // Funções principais
  function initGrade() {
    // Remove qualquer seletor de período existente
    const oldSelector = document.getElementById("mobile-period-selector");
    if (oldSelector) oldSelector.remove();
    
    // Agrupa e ordena disciplinas por período
    const periods = groupByPeriod(disciplinas);
    const sortedPeriods = Object.keys(periods)
      .sort((a, b) => a - b)
      .map(period => ({ period, courses: periods[period] }));
    showTwoPeriodsAtATime(sortedPeriods);
    
    // Cria colunas em sequência vertical
    sortedPeriods.forEach(({ period, courses }) => {
      const column = createColumn(period, courses);
      grade.appendChild(column);
    });
  }

  function initEventListeners() {
    // Evento único para clique e touch
    document.addEventListener("click", handleCourseClick);
    document.addEventListener("touchend", handleCourseClick, { passive: true });
  }

  function handleCourseClick(e) {
    const disciplina = e.target.closest(".disciplina");
    if (!disciplina || disciplina.classList.contains("bloqueada")) return;
    
    if (e.type === 'touchend') e.preventDefault();
    toggleCourseCompletion(disciplina);
    updateAll();
  }

  // Funções auxiliares
  function groupByPeriod(courses) {
    return courses.reduce((acc, course) => {
      const period = course.periodo;
      if (!acc[period]) acc[period] = [];
      acc[period].push(course);
      return acc;
    }, {});
  }

  function createColumn(period, courses) {
    const column = document.createElement("div");
    column.className = "column";
    column.innerHTML = `
      <h2 class="periodo-title">${period}º Período</h2>
      <div class="courses-container"></div>
    `;
    
    const container = column.querySelector('.courses-container');
    courses.forEach(course => {
      container.appendChild(createCourseElement(course));
    });

    return column;
  }

  function createCourseElement(course) {
    const div = document.createElement("div");
    div.className = "disciplina";
    div.dataset.nome = course.nome;
    
    if (course.prerequisitos) {
      div.dataset.prerequisitos = course.prerequisitos.join(",");
    }
    if (course.correquisitos) {
      div.dataset.correquisitos = course.correquisitos.join(",");
    }
    
    div.innerHTML = `
      <div class="nome-disciplina">${course.nome}</div>
      ${course.prerequisitos || course.correquisitos ? 
        `<div class="requisitos">
          ${course.prerequisitos ? `Pré: ${course.prerequisitos.join(', ')}<br>` : ''}
          ${course.correquisitos ? `Cor: ${course.correquisitos.join(', ')}` : ''}
        </div>` : ''
      }
    `;
    
    return div;
  }
    // Lógica de estado
    function toggleCourseCompletion(courseElement) {
      courseElement.classList.toggle("feita");
      const courseName = courseElement.dataset.nome;
      
      if (courseElement.classList.contains("feita")) {
        state.completedCourses.add(courseName);
      } else {
        state.completedCourses.delete(courseName);
      }
    }
  
    function updateAll() {
      updateCourseStates();
      updateHoursCounter();
    }
  
    function updateCourseStates() {
      document.querySelectorAll(".disciplina").forEach(course => {
        if (course.classList.contains("feita")) return;
        
        const isBlocked = checkIfBlocked(course);
        course.classList.remove("bloqueada", "liberada");
        course.classList.add(isBlocked ? "bloqueada" : "liberada");
      });
    }
  
    function checkIfBlocked(course) {
      const prereqs = (course.dataset.prerequisitos || "").split(",").filter(Boolean);
      const coreqs = (course.dataset.correquisitos || "").split(",").filter(Boolean);
      
      const hasMissingPrereqs = prereqs.length > 0 && 
        !prereqs.every(prereq => state.completedCourses.has(prereq));
      
      const hasBlockedCoreqs = coreqs.some(coreq => {
        const coreqEl = document.querySelector(`.disciplina[data-nome="${coreq}"]`);
        return coreqEl && coreqEl.classList.contains("bloqueada");
      });
      
      return hasMissingPrereqs || hasBlockedCoreqs;
    }
  
    function updateHoursCounter() {
      state.completedHours = Array.from(state.completedCourses)
        .reduce((total, course) => total + (cargasHorarias[course] || 0), 0);
    
      // Versão mobile ultra compacta
      if (window.innerWidth <= 768) {
        contadorHoras.innerHTML = `
          <div class="total-hours">${state.completedHours}h</div>
        `;
      } 
      // Versão desktop completa
      else {
        contadorHoras.innerHTML = `
          <div class="total-hours">Horas: ${state.completedHours}</div>
          <div class="requirements">
            <div> 2.500h: Avaliação de Impactos Ambientais</div>
            <div> 2.600h: TCC</div>
          </div>
        `;
      }
    }
    
  });

    function showTwoPeriodsAtATime(sortedPeriods) {
      if (window.innerWidth <= 768) {
        document.querySelectorAll(".column").forEach(col => col.style.display = "none");

        const periodIndices = sortedPeriods.map(p => parseInt(p.period, 10));
        const currentGroup = [periodIndices[0], periodIndices[1]];

        document.querySelectorAll(".column").forEach(col => {
          const title = col.querySelector("h2")?.textContent || "";
          const match = title.match(/(\d+)º/);
          const periodo = match ? parseInt(match[1]) : null;

          if (currentGroup.includes(periodo)) {
            col.style.display = "block";
          }
        });
      }
    }
