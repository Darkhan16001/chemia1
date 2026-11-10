
// ===============================================
// ХИМИЯ | ЗАТ МӨЛШЕРІ. МОЛЬДІК МАССА
// 1-КУРС | 80 МИНУТ
// BY DARKHAN
// ===============================================

// HTML-дегі элементтер
const $ = id => document.getElementById(id);

// Қауіпсіз мәтін шығару
function safe(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

// Рандом сан
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

// Рандом араластыру
function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomNumber(i + 1);

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// ===============================================
// 1. ОҚУШЫЛАР ЖӘНЕ САҚТАУ
// ===============================================

const defaultNames = [
  "Рамазан",
  "Тұрғанжан",
  "Нұрай",
  "Әлқуат",
  "Шырай",
  "Гүлсезім",
  "Маржан",
  "Мариям",
  "Жансая",
  "Азиза",
  "Ақсезім",
  "Нұрболсын",
  "Ақнұр",
  "Іңкәр",
  "Асхат",
  "Аяжан",
  "Мирас",
  "Санжар",
  "Ерасыл",
  "Нұрасыл",
  "Расул",
  "Айнұр",
  "Дархан",
  "Айкерім"
];

const STORAGE_KEY = "darkhan_chemistry_complete_v4";

function newState() {
  return {
    students: defaultNames.map((name, index) => ({
      id: index + 1,
      name: name,
      present: true
    })),

    teams: [[], [], []],
    grades: [],

    selectedStudent: null,
    selectedProblem: null,
    individualAnswer: false,
    usedProblems: [],

    oralIndex: 0,
    oralAnswer: false,

    notebookAnswers: {}
  };
}

let state = newState();

try {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);

    if (
      parsed &&
      Array.isArray(parsed.students) &&
      Array.isArray(parsed.teams) &&
      Array.isArray(parsed.grades)
    ) {
      state = {
        ...newState(),
        ...parsed
      };
    }
  }
} catch (error) {
  console.warn("Деректерді оқу қатесі:", error);
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.warn("Деректер сақталмады:", error);
  }
}

function presentStudents() {
  return state.students.filter(s => s.present);
}

function getStudent(id) {
  return state.students.find(s => s.id === id);
}

function studentTeam(id) {
  const index = state.teams.findIndex(team =>
    team.includes(id)
  );

  return index === -1 ? null : index + 1;
}

function validTeams() {
  const ids = presentStudents().map(s => s.id);
  const members = state.teams.flat();

  return (
    ids.length > 0 &&
    members.length === ids.length &&
    new Set(members).size === ids.length &&
    ids.every(id => members.includes(id))
  );
}

// ===============================================
// 2. САБАҚТЫҢ ТАЙМЕРІ
// ===============================================

let secondsLeft = 80 * 60;
let timerInterval = null;

function updateClock() {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  $("clock").textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      updateClock();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("80 минут аяқталды!");
    }
  }, 1000);
}

// ===============================================
// 3. СЛАЙДТАРДЫҢ ЖҮЙЕСІ
// ===============================================

const slides = [];

let currentPage = 0;

function addSlide(title, section, html) {
  slides.push({
    title,
    section,
    html
  });
}

function addDynamic(title, section, render) {
  slides.push({
    title,
    section,
    render
  });
}

function showSlide() {
  const slide = slides[currentPage];

  if (!slide) return;

  $("slide").innerHTML = slide.render
    ? slide.render()
    : slide.html;

  $("section").textContent = slide.section;
  $("slideTitle").textContent = slide.title;

  $("counter").textContent =
    (currentPage + 1) + " / " + slides.length;

  $("back").disabled = currentPage === 0;

  $("next").disabled =
    currentPage === slides.length - 1;

  $("main").scrollTop = 0;
}

function nextSlide() {
  if (currentPage < slides.length - 1) {
    currentPage++;
    showSlide();
  }
}

function previousSlide() {
  if (currentPage > 0) {
    currentPage--;
    showSlide();
  }
}

function goToSlide(title) {
  const index = slides.findIndex(s => s.title === title);

  if (index >= 0) {
    currentPage = index;
    showSlide();
  }
}

$("next").addEventListener("click", nextSlide);
$("back").addEventListener("click", previousSlide);

// ===============================================
// 4. СУРЕТТЕР
// ===============================================

const images = {
  laboratory:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",

  chemistry:
    "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1200&q=85",

  science:
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85"
};

// ===============================================
// 5. КІРІСПЕ
// ===============================================

addSlide(
  "Зат мөлшері. Мольдік масса",
  "Кіріспе • 5 минут",
  `
  <div class="hero">
    <div>
      <div class="subtitle">ХИМИЯ • 1-КУРС</div>

      <h1>
        Зат мөлшері.<br>
        <span class="blue">Мольдік масса</span>
      </h1>

      <p>
        Бүгін
        <b class="green-text">моль</b>,
        <b class="blue">зат мөлшері</b>
        және
        <b class="gold">мольдік масса</b>
        ұғымдарын үйренеміз.
      </p>

      <p>
        <b class="red">Маңызды:</b>
        химиялық есептерде
        формуланы дұрыс қолдану қажет.
      </p>

      <span class="chip">Түсіндірме</span>
      <span class="chip">Конспект</span>
      <span class="chip">Дәптер</span>
      <span class="chip">3 топ</span>
      <span class="chip">Жеке есеп</span>

      <p>
        <button class="btn success" onclick="startTimer()">
          ▶ Сабақты бастау
        </button>
      </p>
    </div>

    <div class="photo-card">
      <img
        class="photo"
        src="${images.laboratory}"
        alt="Химия зертханасы"
      >

      <div class="photo-label">
        Химия — заттардың құрамын,
        құрылысын және қасиеттерін
        зерттейтін ғылым.
      </div>
    </div>
  </div>
  `
);

addSlide(
  "Сабақтың мақсаты",
  "Кіріспе",
  `
  <h2>Сабақтың мақсаты</h2>

  <div class="grid2">
    <div class="card blue-card">
      <h3>Білу және түсіну</h3>

      <ul>
        <li>Моль ұғымын түсіну.</li>
        <li>Зат мөлшерін анықтау.</li>
        <li>Авогадро тұрақтысын білу.</li>
        <li>Мольдік массаны есептеу.</li>
      </ul>
    </div>

    <div class="card green-card">
      <h3>Есептеу және қолдану</h3>

      <ul>
        <li>Формулаларды дұрыс таңдау.</li>
        <li>Дәптерге есептер шығару.</li>
        <li>Ауызша сұрақтарға жауап беру.</li>
        <li>Тақтада жеке есеп шығару.</li>
      </ul>
    </div>
  </div>

  <div class="note">
    Сабақ соңында әр студент
    зат мөлшері мен мольдік массаға
    байланысты есептерді шығара алады.
  </div>
  `
);

// ===============================================
// 6. 17 ТҮСІНДІРМЕ БЕТІ
// ===============================================

// ТҮСІНДІРМЕ 1
addSlide(
  "Зат мөлшері дегеніміз не?",
  "Түсіндірме 1/17",
  `
  <h2>Зат мөлшері дегеніміз не?</h2>

  <div class="grid2">
    <div class="card">
      <p>
        <b class="blue">Зат мөлшері</b> —
        заттың құрылымдық бөлшектерінің
        санын сипаттайтын физикалық шама.
      </p>

      <p>
        Құрылымдық бөлшектер:
      </p>

      <ul>
        <li>Атомдар</li>
        <li>Молекулалар</li>
        <li>Иондар</li>
      </ul>
    </div>

    <div class="card green-card">
      <h3>Белгіленуі</h3>

      <div class="formula">n</div>

      <p>
        Өлшем бірлігі:
        <b class="gold">моль</b>
      </p>
    </div>
  </div>

  <div class="note red-note">
    <b class="red">Есте сақта!</b>
    Масса мен зат мөлшері
    әртүрлі шамалар.
  </div>
  `
);

// ТҮСІНДІРМЕ 2
addSlide(
  "Атом, молекула және ион",
  "Түсіндірме 2/17",
  `
  <h2>Атом, молекула және ион</h2>

  <div class="grid3">
    <div class="card">
      <h3>Атом</h3>

      <p>
        Химиялық элементтің қасиеттерін
        анықтайтын ең кіші бөлшек.
      </p>

      <p class="gold">H, O, Fe</p>
    </div>

    <div class="card">
      <h3>Молекула</h3>

      <p>
        Өзара байланысқан
        атомдардан тұратын бөлшек.
      </p>

      <p class="gold">H₂O, CO₂, O₂</p>
    </div>

    <div class="card">
      <h3>Ион</h3>

      <p>
        Электр заряды бар атом
        немесе атомдар тобы.
      </p>

      <p class="gold">Na⁺, Cl⁻, SO₄²⁻</p>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 3
addSlide(
  "Неліктен моль қажет?",
  "Түсіндірме 3/17",
  `
  <h2>Химияда моль не үшін қажет?</h2>

  <div class="grid2">
    <div class="card">
      <h3>Негізгі себеп</h3>

      <p>
        Атомдар мен молекулалар
        өте ұсақ болады.
      </p>

      <p>
        Олардың санын жеке-жеке
        анықтау өте қиын.
      </p>

      <p>
        Сондықтан химияда
        <b class="blue">моль</b>
        қолданылады.
      </p>
    </div>

    <div class="card blue-card">
      <h3>Салыстыру</h3>

      <p>1 жұп = 2 зат.</p>
      <p>1 ондық = 10 зат.</p>

      <div class="formula">
        1 моль ≈ 6,02×10²³
      </div>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 4
addSlide(
  "Су молекуласы",
  "Түсіндірме 4/17",
  `
  <h2>Су молекуласының құрылысы</h2>

  <div class="grid2">
    <div class="card">
      <div class="molecule">
        <div class="atom-ball hydrogen">H</div>
        <div class="bond"></div>
        <div class="atom-ball oxygen">O</div>
        <div class="bond"></div>
        <div class="atom-ball hydrogen">H</div>
      </div>

      <p class="center">
        H₂O — су молекуласының
        шартты сызбасы.
      </p>
    </div>

    <div class="card">
      <h3>H₂O құрамында</h3>

      <p>
        <b class="blue">2 сутек атомы</b>
      </p>

      <p>
        <b class="red">1 оттек атомы</b>
      </p>

      <p>
        1 моль H₂O массасы
        шамамен <b class="gold">18 г</b>.
      </p>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 5
addSlide(
  "Авогадро тұрақтысы",
  "Түсіндірме 5/17",
  `
  <h2>Авогадро тұрақтысы</h2>

  <div class="center">
    <div class="big blue">
      6,02 × 10²³
    </div>

    <p>
      Бір мольдегі бөлшектердің
      жуық саны.
    </p>
  </div>

  <div class="formula">
    N = n × Nₐ
  </div>

  <div class="note">
    <b class="red">N</b> — бөлшектер саны.

    <b class="blue">n</b> — зат мөлшері.

    <b class="green-text">Nₐ</b> —
    Авогадро тұрақтысы.
  </div>
  `
);

// ТҮСІНДІРМЕ 6
addSlide(
  "Бөлшектер санын табу",
  "Түсіндірме 6/17",
  `
  <h2>Молекулалар санын есептеу</h2>

  <div class="card">
    <p class="question">
      2 моль O₂ құрамында
      қанша молекула болады?
    </p>

    <p>
      <b class="blue">Берілгені:</b>
      n = 2 моль.
    </p>

    <p>
      <b class="red">Формула:</b>
      N = n × Nₐ
    </p>

    <div class="formula">
      N = 2 × 6,02×10²³
    </div>

    <p class="green-text">
      <b>
        Жауабы: 1,204×10²⁴ молекула.
      </b>
    </p>
  </div>
  `
);

// ТҮСІНДІРМЕ 7
addSlide(
  "Масса мен зат мөлшері",
  "Түсіндірме 7/17",
  `
  <h2>Масса және зат мөлшері</h2>

  <div class="grid2">
    <div class="card">
      <h3>Масса — m</h3>

      <p>
        Заттың массасын көрсетеді.
      </p>

      <p>
        Өлшем бірлігі — грамм.
      </p>

      <div class="formula">
        m = 36 г
      </div>
    </div>

    <div class="card">
      <h3>Зат мөлшері — n</h3>

      <p>
        Бөлшектер санына байланысты.
      </p>

      <p>
        Өлшем бірлігі — моль.
      </p>

      <div class="formula">
        n = 2 моль
      </div>
    </div>
  </div>

  <div class="note red-note">
    <b class="red">Маңызды:</b>
    36 г H₂O — 2 моль,
    ал 36 г CO₂ — шамамен 0,82 моль.
  </div>
  `
);

// ТҮСІНДІРМЕ 8
addSlide(
  "Мольдік масса",
  "Түсіндірме 8/17",
  `
  <h2>Мольдік масса дегеніміз не?</h2>

  <p>
    <b class="blue">Мольдік масса</b> —
    заттың бір молінің массасы.
  </p>

  <div class="formula">
    M = m / n
  </div>

  <div class="grid3">
    <div class="card center">
      <h3>M</h3>
      <p>Мольдік масса</p>
      <b class="gold">г/моль</b>
    </div>

    <div class="card center">
      <h3>m</h3>
      <p>Масса</p>
      <b class="gold">г</b>
    </div>

    <div class="card center">
      <h3>n</h3>
      <p>Зат мөлшері</p>
      <b class="gold">моль</b>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 9
addSlide(
  "Атомдық және молекулалық масса",
  "Түсіндірме 9/17",
  `
  <h2>Атомдық және молекулалық масса</h2>

  <div class="grid2">
    <div class="card blue-card">
      <h3>Салыстырмалы атомдық масса</h3>

      <p>
        <b class="blue">Aᵣ</b> —
        элемент атомының
        салыстырмалы массасы.
      </p>

      <p>H ≈ 1</p>
      <p>C ≈ 12</p>
      <p>O ≈ 16</p>
    </div>

    <div class="card green-card">
      <h3>Салыстырмалы молекулалық масса</h3>

      <p>
        <b class="green-text">Mᵣ</b> —
        молекула атомдарының
        салыстырмалы массаларының қосындысы.
      </p>

      <div class="formula">
        Mᵣ(H₂O) ≈ 18
      </div>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 10
addSlide(
  "Менделеев кестесімен жұмыс",
  "Түсіндірме 10/17",
  `
  <h2>Менделеев кестесін қолдану</h2>

  <p>
    NaOH мольдік массасын табамыз.
  </p>

  <div class="grid3">
    <div class="card center">
      <h3>Na — Натрий</h3>
      <div class="big gold">23</div>
    </div>

    <div class="card center">
      <h3>O — Оттек</h3>
      <div class="big blue">16</div>
    </div>

    <div class="card center">
      <h3>H — Сутек</h3>
      <div class="big green-text">1</div>
    </div>
  </div>

  <div class="formula">
    M(NaOH) = 23 + 16 + 1 = 40 г/моль
  </div>
  `
);

// ТҮСІНДІРМЕ 11
addSlide(
  "Судың мольдік массасы",
  "Түсіндірме 11/17",
  `
  <h2>Судың мольдік массасы</h2>

  <div class="grid2">
    <div class="card">
      <h3>H₂O формуласы</h3>

      <p>2 сутек атомы.</p>
      <p>1 оттек атомы.</p>

      <p>H ≈ 1, O ≈ 16.</p>
    </div>

    <div class="card green-card">
      <h3>Есептеу</h3>

      <div class="formula">
        2×1 + 16 = 18
      </div>

      <p class="green-text">
        <b>
          M(H₂O) = 18 г/моль
        </b>
      </p>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 12
addSlide(
  "Көмірқышқыл газы",
  "Түсіндірме 12/17",
  `
  <h2>CO₂ мольдік массасы</h2>

  <div class="grid2">
    <div class="card">
      <h3>Құрамы</h3>

      <p>1 көміртек атомы.</p>
      <p>2 оттек атомы.</p>

      <p>C ≈ 12, O ≈ 16.</p>
    </div>

    <div class="card">
      <h3>Шешімі</h3>

      <div class="formula">
        12 + 2×16 = 44
      </div>

      <p class="green-text">
        <b>
          M(CO₂) = 44 г/моль
        </b>
      </p>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 13
addSlide(
  "Жақшасы бар формулалар",
  "Түсіндірме 13/17",
  `
  <h2>Жақшасы бар қосылысты есептеу</h2>

  <p>
    Мысал: <b class="blue">Ca(OH)₂</b>
  </p>

  <div class="grid2">
    <div class="card">
      <h3>Атомдық массалар</h3>

      <p>Ca = 40</p>
      <p>O = 16</p>
      <p>H = 1</p>
    </div>

    <div class="card">
      <h3>Жақша ережесі</h3>

      <p>
        Сырттағы 2 саны
        OH тобына түгел әсер етеді.
      </p>

      <div class="formula">
        40 + 2×(16+1)
      </div>
    </div>
  </div>

  <div class="note">
    <b class="green-text">
      Жауабы: 74 г/моль.
    </b>
  </div>
  `
);

// ТҮСІНДІРМЕ 14
addSlide(
  "Зат мөлшерін есептеу",
  "Түсіндірме 14/17",
  `
  <h2>Масса арқылы зат мөлшерін табу</h2>

  <div class="card">
    <p class="question">
      54 г судың зат мөлшерін анықта.
    </p>

    <p>
      <b class="blue">Берілгені:</b>
      m = 54 г
    </p>

    <p>
      <b class="red">Табу керек:</b>
      n — ?
    </p>

    <p>
      <b class="green-text">Формула:</b>
      n = m/M
    </p>

    <div class="formula">
      n = 54/18 = 3 моль
    </div>

    <p class="green-text">
      <b>Жауабы: 3 моль.</b>
    </p>
  </div>
  `
);

// ТҮСІНДІРМЕ 15
addSlide(
  "Зат массасын есептеу",
  "Түсіндірме 15/17",
  `
  <h2>Заттың массасын қалай табамыз?</h2>

  <div class="card">
    <p class="question">
      2,5 моль CO₂ массасын тап.
    </p>

    <p>
      <b class="blue">Берілгені:</b>
      n = 2,5 моль
    </p>

    <p>
      <b class="red">Мольдік масса:</b>
      M(CO₂) = 44 г/моль
    </p>

    <div class="formula">
      m = n×M = 2,5×44
    </div>

    <p class="green-text">
      <b>Жауабы: 110 г.</b>
    </p>
  </div>
  `
);

// ТҮСІНДІРМЕ 16
addSlide(
  "Формуланы дұрыс таңдау",
  "Түсіндірме 16/17",
  `
  <h2>Қай формуланы қолданамыз?</h2>

  <div class="grid3">
    <div class="card">
      <h3>Зат мөлшері</h3>

      <p>
        Масса белгілі болғанда.
      </p>

      <div class="formula">
        n = m/M
      </div>
    </div>

    <div class="card">
      <h3>Масса</h3>

      <p>
        Моль саны белгілі болғанда.
      </p>

      <div class="formula">
        m = n×M
      </div>
    </div>

    <div class="card">
      <h3>Бөлшектер саны</h3>

      <p>
        Моль саны арқылы.
      </p>

      <div class="formula">
        N = n×Nₐ
      </div>
    </div>
  </div>
  `
);

// ТҮСІНДІРМЕ 17
addSlide(
  "Есеп шығарудағы қателер",
  "Түсіндірме 17/17",
  `
  <h2>Жиі жіберілетін қателер</h2>

  <div class="grid2">
    <div class="card red-card">
      <h3 class="red">Қате тәсілдер</h3>

      <ul>
        <li>Индекстерді ескермеу.</li>
        <li>Массаны мольмен шатастыру.</li>
        <li>Өлшем бірлігін жазбау.</li>
        <li>Қате формула қолдану.</li>
      </ul>
    </div>

    <div class="card green-card">
      <h3 class="green-text">Дұрыс тәсіл</h3>

      <ol>
        <li>Берілгенін жаз.</li>
        <li>Не табу керек екенін анықта.</li>
        <li>Формуланы таңда.</li>
        <li>Есепте және тексер.</li>
      </ol>
    </div>
  </div>
  `
);

// ===============================================
// 7. ДӘПТЕРГЕ КОНСПЕКТ
// ===============================================

addSlide(
  "Конспект №1",
  "Конспект • 15 минут",
  `
  <div class="subtitle">
    ДӘПТЕРГЕ ЖАЗЫП АЛ
  </div>

  <h2>Конспект №1 — анықтамалар</h2>

  <div class="card">
    <ol>
      <li>
        <b class="red">Зат мөлшері</b> —
        құрылымдық бөлшектер санын
        сипаттайтын шама.
      </li>

      <li>
        Зат мөлшері
        <b class="blue">n</b>
        әрпімен белгіленеді.
      </li>

      <li>
        Өлшем бірлігі —
        <b class="green-text">моль</b>.
      </li>

      <li>
        1 моль ≈ 6,02×10²³ бөлшек.
      </li>

      <li>
        <b class="red">Мольдік масса</b> —
        бір моль заттың массасы.
      </li>

      <li>
        Мольдік массаның бірлігі —
        <b class="gold">г/моль</b>.
      </li>
    </ol>
  </div>
  `
);

addSlide(
  "Конспект №2",
  "Конспект",
  `
  <div class="subtitle">
    ДӘПТЕРГЕ ЖАЗЫП АЛ
  </div>

  <h2>Конспект №2 — формулалар</h2>

  <div class="grid2">
    <div class="card">
      <p><b class="red">1.</b> n = m/M</p>
      <p><b class="red">2.</b> m = n×M</p>
      <p><b class="red">3.</b> M = m/n</p>
    </div>

    <div class="card">
      <p><b class="blue">4.</b> N = n×Nₐ</p>
      <p><b class="blue">5.</b> n = N/Nₐ</p>
      <p>
        <b class="blue">6.</b>
        Nₐ ≈ 6,02×10²³ моль⁻¹
      </p>
    </div>
  </div>

  <div class="note">
    n — зат мөлшері;
    m — масса;
    M — мольдік масса;
    N — бөлшектер саны.
  </div>
  `
);

addSlide(
  "Конспект №3",
  "Конспект",
  `
  <div class="subtitle">
    ДӘПТЕРГЕ ЖАЗЫП АЛ
  </div>

  <h2>Конспект №3 — мольдік массалар</h2>

  <div class="grid2">
    <div class="card">
      <p>H₂O = <b class="green-text">18 г/моль</b></p>
      <p>CO₂ = <b class="green-text">44 г/моль</b></p>
      <p>O₂ = <b class="green-text">32 г/моль</b></p>
      <p>H₂ = <b class="green-text">2 г/моль</b></p>
    </div>

    <div class="card">
      <p>NaCl = <b class="green-text">58,5 г/моль</b></p>
      <p>NaOH = <b class="green-text">40 г/моль</b></p>
      <p>H₂SO₄ = <b class="green-text">98 г/моль</b></p>
      <p>CaCO₃ = <b class="green-text">100 г/моль</b></p>
    </div>
  </div>

  <div class="note red-note">
    <b class="red">Тапсырма:</b>
    осы сегіз заттың мольдік массасын
    өздерің есептеп жазыңдар.
  </div>
  `
);

// ===============================================
// 8. ДӘПТЕР ТАПСЫРМАЛАРЫ
// ===============================================

const notebookSets = [
  {
    title: "Зат мөлшері және масса",
    tasks: [
      "72 г H₂O зат мөлшерін анықта.",
      "88 г CO₂ зат мөлшерін тап.",
      "3 моль O₂ массасын есепте.",
      "0,5 моль NaOH массасын тап."
    ],
    answers: [
      "n = 72/18 = 4 моль.",
      "n = 88/44 = 2 моль.",
      "m = 3×32 = 96 г.",
      "m = 0,5×40 = 20 г."
    ]
  },

  {
    title: "Молекулалар саны",
    tasks: [
      "2 моль H₂O молекулаларының санын тап.",
      "0,25 моль CO₂ молекула санын есепте.",
      "3,01×10²³ O₂ молекуласының зат мөлшерін тап.",
      "1,204×10²⁴ NH₃ молекуласының зат мөлшерін тап."
    ],
    answers: [
      "N = 1,204×10²⁴ молекула.",
      "N = 1,505×10²³ молекула.",
      "n = 0,5 моль.",
      "n = 2 моль."
    ]
  },

  {
    title: "Күрделірек есептер",
    tasks: [
      "196 г H₂SO₄ зат мөлшерін есепте.",
      "1,5 моль CaCO₃ массасын анықта.",
      "0,75 моль NaCl массасын тап.",
      "49 г H₂SO₄ молекулалар санын есепте."
    ],
    answers: [
      "n = 196/98 = 2 моль.",
      "m = 1,5×100 = 150 г.",
      "m = 0,75×58,5 = 43,875 г.",
      "n = 49/98 = 0,5 моль; N = 3,01×10²³."
    ]
  }
];

notebookSets.forEach((set, index) => {
  addDynamic(
    "Дәптер тапсырмасы №" + (index + 1),
    "Дәптер жұмысы • 15 минут",
    () => renderNotebook(index)
  );
});

function renderNotebook(index) {
  const set = notebookSets[index];
  const visible = !!state.notebookAnswers[index];

  return `
    <div class="subtitle">
      ДӘПТЕРГЕ ЕСЕП ШЫҒАР
    </div>

    <h2>
      №${index + 1}. ${set.title}
    </h2>

    ${set.tasks.map((task, i) => `
      <div class="task">
        <p>
          <span class="task-number">
            ${i + 1}.
          </span>

          ${safe(task)}
        </p>
      </div>
    `).join("")}

    <div class="note blue-note">
      <b class="blue">Талап:</b>
      Берілгені → Табу керек →
      Формула → Шешуі → Жауап.
    </div>

    <p>
      <button
        class="btn warning"
        onclick="toggleNotebook(${index})">
        ${visible ? "Жауапты жасыру" : "Жауаптарды көру"}
      </button>
    </p>

    ${visible ? `
      <div class="answer">
        <b>Дұрыс жауаптар:</b>

        ${set.answers.map((answer, i) => `
          <p>${i + 1}. ${safe(answer)}</p>
        `).join("")}
      </div>
    ` : ""}
  `;
}

function toggleNotebook(index) {
  state.notebookAnswers[index] =
    !state.notebookAnswers[index];

  saveState();
  showSlide();
}

// ===============================================
// 9. ҚАТЫСУШЫЛАРДЫ БЕЛГІЛЕУ
// ===============================================

addDynamic(
  "Қатысушылар",
  "Оқушыларды тексеру",
  renderAttendance
);

function renderAttendance() {
  const count = presentStudents().length;
  const absent = state.students.length - count;

  return `
    <h2>Сабаққа қатысушылар</h2>

    <p class="muted">
      Келмеген оқушының жанындағы
      <b class="red">✕</b>
      батырмасын бас.

      Қайта қосу үшін
      <b class="green-text">↺</b>
      бас.
    </p>

    <div class="grid3">
      <div class="card center">
        <h3>Барлығы</h3>
        <div class="big blue">
          ${state.students.length}
        </div>
      </div>

      <div class="card center">
        <h3>Келгендер</h3>
        <div class="big green-text">
          ${count}
        </div>
      </div>

      <div class="card center">
        <h3>Келмегендер</h3>
        <div class="big red">
          ${absent}
        </div>
      </div>
    </div>

    <div class="student-grid">
      ${state.students.map(s => `
        <div class="student-item ${s.present ? "" : "absent"}">
          <span>${safe(s.name)}</span>

          <button
            class="x-btn ${s.present ? "" : "restore"}"
            onclick="toggleStudent(${s.id})">
            ${s.present ? "✕" : "↺"}
          </button>
        </div>
      `).join("")}
    </div>

    <div class="note">
      Қатысушылар анықталған соң
      келесі бетте 3 топқа бөлінеді.
    </div>
  `;
}

function toggleStudent(id) {
  const s = getStudent(id);

  if (!s) return;

  if (
    s.present &&
    state.grades.some(g => g.id === id)
  ) {
    alert(
      "Бұл оқушы бағаланған. " +
      "Бағасы журналда сақталған."
    );
    return;
  }

  s.present = !s.present;

  // Тізім өзгерсе, топтарды қайта құрамыз.
  state.teams = [[], [], []];

  if (
    !s.present &&
    state.selectedStudent === id
  ) {
    state.selectedStudent = null;
    state.selectedProblem = null;
    state.individualAnswer = false;
  }

  saveState();
  showSlide();
}

// ===============================================
// 10. ОҚУШЫЛАРДЫ 3 ТОПҚА БӨЛУ
// ===============================================

addDynamic(
  "3 топқа бөлу",
  "Топтық жұмыс",
  renderTeams
);

function divideTeams() {
  const ids = shuffle(
    presentStudents().map(s => s.id)
  );

  if (!ids.length) {
    alert("Алдымен қатысушыларды белгіле.");
    return;
  }

  state.teams = [[], [], []];

  ids.forEach((id, index) => {
    state.teams[index % 3].push(id);
  });

  state.oralIndex = 0;
  state.oralAnswer = false;

  saveState();
  showSlide();
}

function renderTeams() {
  const presentCount = presentStudents().length;

  return `
    <h2>3 топқа кездейсоқ бөліну</h2>

    <p>
      Қатысушылар:
      <b class="green-text">
        ${presentCount} оқушы
      </b>
    </p>

    <p>
      <button
        class="btn success"
        onclick="divideTeams()">
        🎲 Рандом 3 топқа бөлу
      </button>
    </p>

    <div class="grid3">
      ${state.teams.map((team, index) => `
        <div class="team-card">
          <h3>
            ${["🔵", "🟢", "🟡"][index]}
            ${index + 1}-топ
          </h3>

          <p class="small">
            ${team.length} оқушы
          </p>

          <div class="team-members">
            ${team.map((id, i) => `
              <div>
                ${i + 1}.
                ${safe(getStudent(id)?.name || "")}
              </div>
            `).join("") || "Әлі бөлінген жоқ"}
          </div>
        </div>
      `).join("")}
    </div>

    <div class="note blue-note">
      <b>Ереже:</b>
      3 топ тек ауызша сұрақтарға
      жауап береді. Жеке есеп
      шығару келесі бөлімде бөлек болады.
    </div>
  `;
}

// ===============================================
// 11. 3 ТОПҚА АУЫЗША СҰРАҚТАР
// ===============================================

const oralQuestions = [
  {
    q: "Зат мөлшері дегеніміз не?",
    a: "Құрылымдық бөлшектердің санын сипаттайтын физикалық шама."
  },
  {
    q: "Зат мөлшерінің өлшем бірлігі қандай?",
    a: "Моль."
  },
  {
    q: "Авогадро тұрақтысының жуық мәні қандай?",
    a: "6,02×10²³ моль⁻¹."
  },
  {
    q: "Мольдік масса дегеніміз не?",
    a: "Бір моль заттың массасы."
  },
  {
    q: "Мольдік массаның өлшем бірлігі қандай?",
    a: "г/моль."
  },
  {
    q: "Су молекуласының формуласы қандай?",
    a: "H₂O. Оның құрамында екі сутек және бір оттек атомы бар."
  },
  {
    q: "Зат мөлшерін массадан қалай табамыз?",
    a: "n = m/M."
  },
  {
    q: "Массаны моль саны арқылы қалай табамыз?",
    a: "m = n×M."
  },
  {
    q: "1 моль H₂O мен 1 моль CO₂ молекула саны бірдей ме?",
    a: "Иә. Екеуінде де шамамен 6,02×10²³ молекула бар."
  },
  {
    q: "CO₂ мольдік массасы неге 44 г/моль?",
    a: "12 + 2×16 = 44 г/моль."
  },
  {
    q: "Молекулалар санын қалай есептейміз?",
    a: "N = n×Nₐ."
  },
  {
    q: "Химиялық есеп шығарудың кезеңдері қандай?",
    a: "Берілгені, табу керек, формула, шешуі, жауап."
  }
];

addDynamic(
  "3 топтың ауызша ойыны",
  "Ауызша сұрақ-жауап",
  renderOralGame
);

function renderOralGame() {
  const index = state.oralIndex;

  if (index >= oralQuestions.length) {
    return `
      <div class="center">
        <h1 class="green-text">
          Ауызша ойын аяқталды!
        </h1>

        <p>
          Үш топ барлық сұраққа
          ауызша жауап берді.
        </p>

        <button
          class="btn primary"
          onclick="goToSlide('Жеке тақта жұмысы')">
          Жеке есептерге өту →
        </button>
      </div>
    `;
  }

  const question = oralQuestions[index];
  const team = (index % 3) + 1;

  return `
    <div class="subtitle">
      3 ТОП • АУЫЗША СҰРАҚ-ЖАУАП
    </div>

    <h2>${team}-топтың сұрағы</h2>

    <div class="grid2">
      <div class="card">
        <span class="badge">
          Сұрақ ${index + 1}/${oralQuestions.length}
        </span>

        <div class="team-question" style="margin-top:18px">
          ${safe(question.q)}
        </div>

        <div class="note">
          Топ мүшелері ақылдасып,
          жауабын
          <b class="blue">ауызша айтады</b>.
        </div>
      </div>

      <div class="card">
        <h3>Жауапты тексеру</h3>

        ${state.oralAnswer ? `
          <div class="answer">
            <b>Дұрыс жауап:</b>
            <p>${safe(question.a)}</p>
          </div>

          <p>
            <button
              class="btn primary"
              onclick="nextOralQuestion()">
              Келесі сұрақ →
            </button>
          </p>
        ` : `
          <p>
            Алдымен топ жауабын айтып бітсін.
            Одан кейін дұрыс жауапты аш.
          </p>

          <button
            class="btn warning"
            onclick="revealOralAnswer()">
            Жауапты көру
          </button>
        `}

        <div class="note blue-note">
          Бұл бөлімде
          <b>55–100 балл қойылмайды</b>.
          Топтар тек ауызша жауап береді.
        </div>
      </div>
    </div>
  `;
}

function revealOralAnswer() {
  state.oralAnswer = true;
  saveState();
  showSlide();
}

function nextOralQuestion() {
  if (!state.oralAnswer) return;

  state.oralIndex++;
  state.oralAnswer = false;

  saveState();
  showSlide();
}

// ===============================================
// 12. ЖЕКЕ ЕСЕПТЕР БАНКІ
// ===============================================

const problems = [
  ["36 г H₂O зат мөлшерін тап.",
   "M=18 г/моль; n=36/18=2 моль."],

  ["44 г CO₂ зат мөлшерін тап.",
   "M=44 г/моль; n=44/44=1 моль."],

  ["2 моль O₂ массасын есепте.",
   "M=32 г/моль; m=2×32=64 г."],

  ["3 моль H₂ массасын тап.",
   "M=2 г/моль; m=3×2=6 г."],

  ["58,5 г NaCl зат мөлшерін тап.",
   "M=58,5 г/моль; n=1 моль."],

  ["0,5 моль H₂O массасын тап.",
   "m=0,5×18=9 г."],

  ["98 г H₂SO₄ зат мөлшерін тап.",
   "M=98 г/моль; n=1 моль."],

  ["4 моль CO₂ массасын тап.",
   "m=4×44=176 г."],

  ["16 г CH₄ зат мөлшерін тап.",
   "M=16 г/моль; n=1 моль."],

  ["0,25 моль N₂ массасын тап.",
   "M=28 г/моль; m=7 г."],

  ["80 г NaOH зат мөлшерін тап.",
   "M=40 г/моль; n=2 моль."],

  ["2 моль CaCO₃ массасын тап.",
   "M=100 г/моль; m=200 г."],

  ["34 г NH₃ зат мөлшерін тап.",
   "M=17 г/моль; n=2 моль."],

  ["1,5 моль SO₂ массасын тап.",
   "M=64 г/моль; m=96 г."],

  ["27 г Al зат мөлшерін тап.",
   "M=27 г/моль; n=1 моль."],

  ["0,2 моль Fe массасын тап.",
   "M=56 г/моль; m=11,2 г."],

  ["180 г C₆H₁₂O₆ зат мөлшерін тап.",
   "M=180 г/моль; n=1 моль."],

  ["5 моль H₂O массасын тап.",
   "m=5×18=90 г."],

  ["64 г O₂ зат мөлшерін тап.",
   "n=64/32=2 моль."],

  ["0,75 моль NaCl массасын тап.",
   "m=0,75×58,5=43,875 г."],

  ["1 моль H₂O молекулалар санын тап.",
   "N≈6,02×10²³ молекула."],

  ["0,5 моль CO₂ молекулалар санын тап.",
   "N=3,01×10²³ молекула."],

  ["2 моль H₂ молекулалар санын тап.",
   "N=1,204×10²⁴ молекула."],

  ["3,01×10²³ H₂O молекуласының зат мөлшерін тап.",
   "n=0,5 моль."],

  ["1,204×10²⁴ O₂ молекуласының зат мөлшерін тап.",
   "n=2 моль."],

  ["10 г CaCO₃ зат мөлшерін тап.",
   "n=10/100=0,1 моль."],

  ["0,4 моль NaOH массасын тап.",
   "m=0,4×40=16 г."],

  ["142 г Na₂SO₄ зат мөлшерін тап.",
   "M=142 г/моль; n=1 моль."],

  ["0,25 моль H₂SO₄ массасын тап.",
   "m=0,25×98=24,5 г."],

  ["4,515×10²³ NH₃ молекуласының зат мөлшерін тап.",
   "n=0,75 моль."]
];

const grades = [
  55, 60, 65, 70, 75,
  80, 85, 90, 95, 100
];

// ===============================================
// 13. ЖЕКЕ ОҚУШЫНЫ РАНДОМ ТАҢДАУ
// ===============================================

addDynamic(
  "Жеке тақта жұмысы",
  "Рандом жеке бағалау",
  renderIndividual
);

function chooseIndividual() {
  if (state.selectedStudent !== null) {
    alert("Алдымен қазіргі оқушыны бағала.");
    return;
  }

  const availableStudents = presentStudents().filter(s =>
    !state.grades.some(g => g.id === s.id)
  );

  if (!availableStudents.length) {
    alert("Барлық қатысушы бағаланды.");
    return;
  }

  const selected =
    availableStudents[randomNumber(availableStudents.length)];

  let availableProblems = problems
    .map((_, i) => i)
    .filter(i => !state.usedProblems.includes(i));

  if (!availableProblems.length) {
    state.usedProblems = [];
    availableProblems = problems.map((_, i) => i);
  }

  const problemIndex =
    availableProblems[randomNumber(availableProblems.length)];

  state.selectedStudent = selected.id;
  state.selectedProblem = problemIndex;
  state.individualAnswer = false;
  state.usedProblems.push(problemIndex);

  saveState();
  showSlide();
}

function revealIndividualAnswer() {
  if (state.selectedStudent === null) return;

  state.individualAnswer = true;

  saveState();
  showSlide();
}

function giveGrade(value) {
  if (
    state.selectedStudent === null ||
    !state.individualAnswer
  ) return;

  const s = getStudent(state.selectedStudent);
  const p = problems[state.selectedProblem];

  if (!s || !p) return;

  state.grades.push({
    id: s.id,
    name: s.name,
    team: studentTeam(s.id),
    question: p[0],
    answer: p[1],
    grade: value
  });

  state.selectedStudent = null;
  state.selectedProblem = null;
  state.individualAnswer = false;

  saveState();
  showSlide();
}

function renderIndividual() {
  const count = presentStudents().length;
  const assessed = state.grades.filter(g =>
    getStudent(g.id)?.present
  ).length;

  if (state.selectedStudent === null) {
    return `
      <div class="center">
        <div class="subtitle">
          ЖЕКЕ ЖҰМЫС • ТАҚТАҒА ШЫҒУ
        </div>

        <h2>Тақтаға кім шығады?</h2>

        <div class="big blue">
          ${assessed}/${count}
        </div>

        <p>Бағаланған оқушылар саны</p>

        <button
          class="btn primary"
          style="font-size:26px;padding:20px 36px"
          onclick="chooseIndividual()"
          ${assessed >= count ? "disabled" : ""}>
          🎲 Рандом оқушы таңдау
        </button>

        <div class="note">
          Әр оқушы жеке есеп шығарады.
          Барлық қатысушы бағаланғанша
          қайта таңдалмайды.
        </div>
      </div>
    `;
  }

  const s = getStudent(state.selectedStudent);
  const p = problems[state.selectedProblem];

  if (!s || !p) {
    return `<h2>Оқушы немесе есеп табылмады.</h2>`;
  }

  const team = studentTeam(s.id);

  return `
    <div class="subtitle">
      ТАҚТАДАҒЫ ЖЕКЕ ЕСЕП
    </div>

    <div class="grid2">
      <div class="card">
        <h3>Таңдалған оқушы</h3>

        <div class="student-name">
          ${safe(s.name)}
        </div>

        <span class="badge">
          ${team ? team + "-топ" : "Жеке жұмыс"}
        </span>

        <p class="question">
          ${safe(p[0])}
        </p>

        <div class="note">
          <b class="blue">Берілгені</b> →
          <b class="red">Формула</b> →
          <b class="green-text">Шешуі</b> →
          Жауап
        </div>

        ${state.individualAnswer ? `
          <div class="answer">
            <b>Дұрыс шешімі:</b>
            <p>${safe(p[1])}</p>
          </div>
        ` : `
          <p>
            <button
              class="btn warning"
              onclick="revealIndividualAnswer()">
              Жауапты көру
            </button>
          </p>
        `}
      </div>

      <div class="card">
        <h3>Оқытушының бағалауы</h3>

        <p>
          Оқушы есепті тақтаға
          шығарып болған соң
          дұрыс шешіммен салыстыр.
        </p>

        ${state.individualAnswer ? `
          <div class="grade-grid">
            ${grades.map(g => `
              <button
                class="grade-btn"
                onclick="giveGrade(${g})">
                ${g}
              </button>
            `).join("")}
          </div>

          <div class="note">
            Баға журналға
            автоматты түрде сақталады.
          </div>
        ` : `
          <div class="note red-note">
            Алдымен «Жауапты көру»
            батырмасын бас.
          </div>
        `}
      </div>
    </div>
  `;
}

// ===============================================
// 14. БАҒАЛАУ ЖУРНАЛЫ
// ===============================================

addDynamic(
  "Бағалау журналы",
  "Жеке бағалау",
  renderJournal
);

function renderJournal() {
  const marks = state.grades;

  const average = marks.length
    ? (
        marks.reduce((sum, m) => sum + m.grade, 0) /
        marks.length
      ).toFixed(1)
    : "—";

  return `
    <h2>Электрондық бағалау журналы</h2>

    <div class="grid3">
      <div class="card center">
        <h3>Қатысушылар</h3>

        <div class="big blue">
          ${presentStudents().length}
        </div>
      </div>

      <div class="card center">
        <h3>Бағаланғандар</h3>

        <div class="big green-text">
          ${marks.length}
        </div>
      </div>

      <div class="card center">
        <h3>Орташа балл</h3>

        <div class="big gold">
          ${average}
        </div>
      </div>
    </div>

    <div class="card table-scroll" style="margin-top:18px">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Оқушы</th>
            <th>Топ</th>
            <th>Есеп</th>
            <th>Балл</th>
          </tr>
        </thead>

        <tbody>
          ${marks.map((m, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${safe(m.name)}</td>
              <td>${m.team || "—"}</td>
              <td>${safe(m.question)}</td>
              <td class="green-text">
                <b>${m.grade}</b>
              </td>
            </tr>
          `).join("") || `
            <tr>
              <td colspan="5">
                Әлі баға қойылған жоқ.
              </td>
            </tr>
          `}
        </tbody>
      </table>
    </div>

    <p style="text-align:right">
      <button
        class="btn success"
        onclick="downloadJournal()">
        Журналды сақтау
      </button>
    </p>
  `;
}

function downloadJournal() {
  const rows = [
    ["№", "Оқушы", "Топ", "Есеп", "Жауап", "Балл"],

    ...state.grades.map((m, i) => [
      i + 1,
      m.name,
      m.team || "",
      m.question,
      m.answer,
      m.grade
    ])
  ];

  const csv = "\uFEFF" + rows.map(row =>
    row.map(value =>
      '"' + String(value).replace(/"/g, '""') + '"'
    ).join(";")
  ).join("\r\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "himiya_bagalar.csv";
  a.click();

  URL.revokeObjectURL(url);
}

// ===============================================
// 15. ҮЙ ТАПСЫРМАСЫ
// ===============================================

addSlide(
  "Үй тапсырмасы",
  "Үй жұмысы • 5 минут",
  `
  <h2>Үй тапсырмасы</h2>

  <div class="grid2">
    <div class="card blue-card">
      <h3>1. Презентация жасау</h3>

      <p>
        <b class="gold">Тақырып:</b>
        «Моль әлеміне саяхат:
        заттардың массасы мен мөлшері»
      </p>

      <p>8–10 слайд.</p>

      <ul>
        <li>Зат мөлшері мен моль.</li>
        <li>Авогадро тұрақтысы.</li>
        <li>Мольдік масса.</li>
        <li>Үш есептің шешімі.</li>
        <li>Суреттер мен қорытынды.</li>
      </ul>
    </div>

    <div class="card green-card">
      <h3>2. Дәптерге орындау</h3>

      <ol>
        <li>Мольдің анықтамасын жаз.</li>
        <li>Бес негізгі формуланы түсіндір.</li>
        <li>H₂O, CO₂, NaCl, H₂SO₄ мольдік массаларын есепте.</li>
        <li>36 г H₂O зат мөлшерін тап.</li>
        <li>0,5 моль O₂ молекула санын тап.</li>
        <li>Мольдің маңызы туралы 8–10 сөйлем жаз.</li>
      </ol>
    </div>
  </div>

  <div class="note">
    Презентация — 10 балл.
    Дәптер жұмысы — 10 балл.
    Барлығы — 20 балл.
  </div>
  `
);

// ===============================================
// 16. ҚОРЫТЫНДЫ
// ===============================================

addSlide(
  "Қорытынды",
  "Сабақ аяқталды",
  `
  <div class="center">
    <div class="subtitle">
      ХИМИЯ • 1-КУРС
    </div>

    <h1>Сабақ қорытындысы</h1>

    <div class="grid3">
      <div class="card">
        <h3>Білдік</h3>
        <p>Зат мөлшері және моль.</p>
      </div>

      <div class="card">
        <h3>Үйрендік</h3>
        <p>Мольдік массаны есептеу.</p>
      </div>

      <div class="card">
        <h3>Орындадық</h3>
        <p>Жазбаша және ауызша тапсырмалар.</p>
      </div>
    </div>

    <h2
      class="green-text"
      style="margin-top:30px">
      Назарларыңызға рақмет!
    </h2>

    <div class="big gold">
      BY DARKHAN
    </div>
  </div>
  `
);

// ===============================================
// 17. КАЛЬКУЛЯТОР
// ===============================================

$("calcOpen").onclick = () => {
  $("calculator").classList.toggle("hidden");
};

$("calcClose").onclick = () => {
  $("calculator").classList.add("hidden");
};

let calcText = "";

const calculatorKeys = [
  "7", "8", "9", "÷",
  "4", "5", "6", "×",
  "1", "2", "3", "−",
  "C", "0", ".", "+",
  "(", ")", "⌫", "="
];

$("calcKeys").innerHTML = calculatorKeys.map(key => `
  <button data-key="${key}">
    ${key}
  </button>
`).join("");

$("calcKeys").onclick = event => {
  const button = event.target.closest("button");

  if (!button) return;

  calculatorPress(button.dataset.key);
};

function calculatorPress(key) {
  if (key === "C") {
    calcText = "";
  } else if (key === "⌫") {
    calcText = calcText.slice(0, -1);
  } else if (key === "=") {
    try {
      const expression = calcText
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

      calcText = String(calculate(expression));
    } catch {
      calcText = "Қате";
    }
  } else {
    if (calcText === "Қате") {
      calcText = "";
    }

    calcText += key;
  }

  $("calcDisplay").value = calcText;
}

// Қауіпсіз арифметикалық есептеу
function calculate(source) {
  if (!/^[0-9+\-*/(). ]+$/.test(source)) {
    throw Error("Қате өрнек");
  }

  let pos = 0;

  function skip() {
    while (source[pos] === " ") {
      pos++;
    }
  }

  function factor() {
    skip();

    if (source[pos] === "+") {
      pos++;
      return factor();
    }

    if (source[pos] === "-") {
      pos++;
      return -factor();
    }

    if (source[pos] === "(") {
      pos++;

      const result = expression();

      skip();

      if (source[pos] !== ")") {
        throw Error("Жақша қатесі");
      }

      pos++;

      return result;
    }

    const match =
      /^(?:\d+(?:\.\d*)?|\.\d+)/.exec(
        source.slice(pos)
      );

    if (!match) {
      throw Error("Сан қатесі");
    }

    pos += match[0].length;

    return Number(match[0]);
  }

  function term() {
    let value = factor();

    while (true) {
      skip();

      const operator = source[pos];

      if (operator !== "*" && operator !== "/") {
        break;
      }

      pos++;

      const other = factor();

      value = operator === "*"
        ? value * other
        : value / other;
    }

    return value;
  }

  function expression() {
    let value = term();

    while (true) {
      skip();

      const operator = source[pos];

      if (operator !== "+" && operator !== "-") {
        break;
      }

      pos++;

      const other = term();

      value = operator === "+"
        ? value + other
        : value - other;
    }

    return value;
  }

  const result = expression();

  skip();

  if (
    pos !== source.length ||
    !Number.isFinite(result)
  ) {
    throw Error("Есептеу қатесі");
  }

  return Number(result.toPrecision(12));
}

// ===============================================
// 18. МЕНДЕЛЕЕВ КЕСТЕСІ — 118 ЭЛЕМЕНТ
// ===============================================

// Реттік нөмір | Таңба | Қазақша атауы | Масса
const elementText = `
H|Сутек|1.008
He|Гелий|4.003
Li|Литий|6.94
Be|Бериллий|9.012
B|Бор|10.81
C|Көміртек|12.011
N|Азот|14.007
O|Оттек|15.999
F|Фтор|18.998
Ne|Неон|20.180
Na|Натрий|22.990
Mg|Магний|24.305
Al|Алюминий|26.982
Si|Кремний|28.085
P|Фосфор|30.974
S|Күкірт|32.06
Cl|Хлор|35.45
Ar|Аргон|39.948
K|Калий|39.098
Ca|Кальций|40.078
Sc|Скандий|44.956
Ti|Титан|47.867
V|Ванадий|50.942
Cr|Хром|51.996
Mn|Марганец|54.938
Fe|Темір|55.845
Co|Кобальт|58.933
Ni|Никель|58.693
Cu|Мыс|63.546
Zn|Мырыш|65.38
Ga|Галлий|69.723
Ge|Германий|72.630
As|Мышьяк|74.922
Se|Селен|78.971
Br|Бром|79.904
Kr|Криптон|83.798
Rb|Рубидий|85.468
Sr|Стронций|87.62
Y|Иттрий|88.906
Zr|Цирконий|91.224
Nb|Ниобий|92.906
Mo|Молибден|95.95
Tc|Технеций|[98]
Ru|Рутений|101.07
Rh|Родий|102.906
Pd|Палладий|106.42
Ag|Күміс|107.868
Cd|Кадмий|112.414
In|Индий|114.818
Sn|Қалайы|118.710
Sb|Сурьма|121.760
Te|Теллур|127.60
I|Йод|126.904
Xe|Ксенон|131.293
Cs|Цезий|132.905
Ba|Барий|137.327
La|Лантан|138.905
Ce|Церий|140.116
Pr|Празеодим|140.908
Nd|Неодим|144.242
Pm|Прометий|[145]
Sm|Самарий|150.36
Eu|Еуропий|151.964
Gd|Гадолиний|157.25
Tb|Тербий|158.925
Dy|Диспрозий|162.500
Ho|Гольмий|164.930
Er|Эрбий|167.259
Tm|Тулий|168.934
Yb|Иттербий|173.045
Lu|Лютеций|174.967
Hf|Гафний|178.49
Ta|Тантал|180.948
W|Вольфрам|183.84
Re|Рений|186.207
Os|Осмий|190.23
Ir|Иридий|192.217
Pt|Платина|195.084
Au|Алтын|196.967
Hg|Сынап|200.592
Tl|Таллий|204.38
Pb|Қорғасын|207.2
Bi|Висмут|208.980
Po|Полоний|[209]
At|Астат|[210]
Rn|Радон|[222]
Fr|Франций|[223]
Ra|Радий|[226]
Ac|Актиний|[227]
Th|Торий|232.038
Pa|Протактиний|231.036
U|Уран|238.029
Np|Нептуний|[237]
Pu|Плутоний|[244]
Am|Америций|[243]
Cm|Кюрий|[247]
Bk|Берклий|[247]
Cf|Калифорний|[251]
Es|Эйнштейний|[252]
Fm|Фермий|[257]
Md|Менделевий|[258]
No|Нобелий|[259]
Lr|Лоуренсий|[266]
Rf|Резерфордий|[267]
Db|Дубний|[268]
Sg|Сиборгий|[269]
Bh|Борий|[270]
Hs|Хассий|[277]
Mt|Мейтнерий|[278]
Ds|Дармштадтий|[281]
Rg|Рентгений|[282]
Cn|Коперниций|[285]
Nh|Нихоний|[286]
Fl|Флеровий|[289]
Mc|Московий|[290]
Lv|Ливерморий|[293]
Ts|Теннессин|[294]
Og|Оганесон|[294]
`;

const elements = elementText
  .trim()
  .split("\n")
  .map((line, index) => {
    const [symbol, name, mass] =
      line.trim().split("|");

    return {
      number: index + 1,
      symbol,
      name,
      mass
    };
  });

// Периодтардағы бағандар
const periodColumns = [
  [1, 18],
  [1, 2, 13, 14, 15, 16, 17, 18],
  [1, 2, 13, 14, 15, 16, 17, 18],
  Array.from({length: 18}, (_, i) => i + 1),
  Array.from({length: 18}, (_, i) => i + 1)
];

// Элементтің периодтық жүйедегі орны
function elementPosition(number) {
  if (number <= 54) {
    let index = number - 1;

    for (let period = 0; period < 5; period++) {
      if (index < periodColumns[period].length) {
        return {
          row: period + 1,
          col: periodColumns[period][index]
        };
      }

      index -= periodColumns[period].length;
    }
  }

  // 6-период
  if (number >= 55 && number <= 57) {
    return {row: 6, col: number - 54};
  }

  // Лантаноидтар
  if (number >= 58 && number <= 71) {
    return {row: 9, col: number - 54};
  }

  if (number >= 72 && number <= 86) {
    return {row: 6, col: number - 68};
  }

  // 7-период
  if (number >= 87 && number <= 89) {
    return {row: 7, col: number - 86};
  }

  // Актиноидтар
  if (number >= 90 && number <= 103) {
    return {row: 10, col: number - 86};
  }

  if (number >= 104 && number <= 118) {
    return {row: 7, col: number - 100};
  }

  return {row: 10, col: 18};
}

// Химиялық элементтердің топтары
const nonmetals = new Set([
  "H", "C", "N", "O", "P", "S", "Se"
]);

const metalloids = new Set([
  "B", "Si", "Ge", "As", "Sb", "Te"
]);

const nobleGases = new Set([
  "He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"
]);

const halogens = new Set([
  "F", "Cl", "Br", "I", "At", "Ts"
]);

function elementCategory(number, symbol) {
  if (number >= 57 && number <= 71) {
    return "lanth";
  }

  if (number >= 89 && number <= 103) {
    return "act";
  }

  if (nobleGases.has(symbol)) {
    return "noble";
  }

  if (halogens.has(symbol)) {
    return "halogen";
  }

  if (nonmetals.has(symbol)) {
    return "nonmetal";
  }

  if (metalloids.has(symbol)) {
    return "metalloid";
  }

  return "metal";
}

// Периодтық кестені экранға салу
function buildPeriodicTable() {
  $("periodicGrid").innerHTML =
    elements.map((element, index) => {
      const position =
        elementPosition(element.number);

      const category = elementCategory(
        element.number,
        element.symbol
      );

      return `
        <button
          class="element ${category}"
          style="
            grid-row:${position.row};
            grid-column:${position.col};
          "
          onclick="showElement(${index})"
          title="${safe(element.name)}">

          <span class="number">
            ${element.number}
          </span>

          <span class="symbol">
            ${element.symbol}
          </span>

          <span class="element-name">
            ${safe(element.name)}
          </span>

          <span class="mass">
            ${element.mass}
          </span>
        </button>
      `;
    }).join("");
}

// Элементті басқанда толық ақпарат
function showElement(index) {
  const element = elements[index];

  if (!element) return;

  $("elementInfo").innerHTML = `
    <b class="blue">
      ${element.number}.
      ${safe(element.name)}
      (${element.symbol})
    </b>

    <div>
      Атомдық масса немесе
      көрсетілген изотоптың массалық саны:

      <b class="green-text">
        ${element.mass}
      </b>
    </div>

    <div class="small muted">
      Шаршы жақшадағы мән
      тұрақты изотопы жоқ элементтің
      таңдалған изотопының массалық саны.
    </div>
  `;
}

// Кестені ашу және жабу
$("tableOpen").onclick = () => {
  $("tableModal").classList.remove("hidden");
};

$("tableClose").onclick = () => {
  $("tableModal").classList.add("hidden");
};

$("tableModal").onclick = event => {
  if (event.target === $("tableModal")) {
    $("tableModal").classList.add("hidden");
  }
};

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    $("tableModal").classList.add("hidden");
    $("calculator").classList.add("hidden");
  }
});

// ===============================================
// 19. САЙТТЫ ІСКЕ ҚОСУ
// ===============================================

buildPeriodicTable();
showSlide();
updateClock();
