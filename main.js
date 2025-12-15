/* ======================================================
   FORMULARIO: guarda 10 campos en localStorage
   ====================================================== */
(function () {
  const form = document.getElementById('registro-form');
  const resetBtn = document.getElementById('f_reset');
  const msg = document.getElementById('f_msg');

  function showMessage(text, ok = true) {
    msg.textContent = text;
    msg.style.color = ok ? 'var(--blue-700)' : 'var(--danger)';
    setTimeout(() => {
      msg.textContent = '';
    }, 4500);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('f_nombre').value.trim();
    const email = document.getElementById('f_email').value.trim();
    const rol = document.getElementById('f_rol').value;
    const edad = document.getElementById('f_edad').value;
    const grado = document.getElementById('f_grado').value.trim();
    const estilo = document.getElementById('f_estilo').value;
    const diagnostico = document.getElementById('f_diagnostico').value;
    const observaciones = document.getElementById('f_observaciones').value.trim();
    const consent = document.getElementById('f_consent').checked;

    if (
      !nombre || !email || !rol || !edad ||
      !grado || !estilo || !diagnostico ||
      !observaciones || !consent
    ) {
      showMessage(
        'Por favor completa los campos obligatorios y acepta el consentimiento.',
        false
      );
      return;
    }

    const data = {
      nombre,
      email,
      rol,
      edad,
      grado,
      escuela: document.getElementById('f_escuela').value.trim(),
      estilo,
      diagnostico,
      apoyos: document.getElementById('f_apoyos').value.trim(),
      observaciones,
      ts: Date.now()
    };

    const KEY = 'pe_registro_10campos_v1';
    const existing = JSON.parse(localStorage.getItem(KEY) || '[]');
    existing.push(data);
    localStorage.setItem(KEY, JSON.stringify(existing));

    showMessage('Registro guardado localmente ✔');
    form.reset();
  });

  resetBtn.addEventListener('click', function () {
    if (confirm('¿Limpiar el formulario?')) {
      form.reset();
      showMessage('Formulario limpiado.');
    }
  });
})();

/* ======================================================
   QUIZ: evaluación de 3 preguntas + trofeo + confeti
   ====================================================== */
(function () {
  const quiz = document.getElementById('quiz');
  const resultBox = document.getElementById('quiz-result');
  const trophyWrap = document.getElementById('trophy-wrap');
  const confetti = document.getElementById('confetti');

  function showTrophy() {
    trophyWrap.style.display = 'flex';
    trophyWrap.classList.add('show');

    confetti.innerHTML = '';
    const colors = ['#ff4757', '#ffb86b', '#7bed9f', '#70a1ff', '#f78fb3'];

    for (let i = 0; i < 20; i++) {
      const s = document.createElement('span');
      s.style.left = (5 + Math.random() * 90) + '%';
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() * 0.4 + 's';
      s.style.transform =
        'translateY(-10px) rotate(' + Math.random() * 360 + 'deg)';
      confetti.appendChild(s);
    }

    confetti.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      confetti.innerHTML = '';
      confetti.setAttribute('aria-hidden', 'true');
    }, 1800);
  }

  function hideTrophy() {
    trophyWrap.style.display = 'none';
    trophyWrap.classList.remove('show');
  }

  quiz.addEventListener('submit', function (e) {
    e.preventDefault();

    const a1 = document.getElementById('q1').value;
    const a2 =
      (document.querySelector('input[name="q2"]:checked') || {}).value || '';
    const a3 = document.getElementById('q3').value;

    let score = 0;
    if (a1 === 'Visual') score++;
    if (a2 === 'Role-play') score++;
    if (a3 === 'Espectro') score++;

    resultBox.style.display = 'block';

    if (score === 3) {
      resultBox.innerHTML =
        '<strong>3/3 — Excelente.</strong> Has respondido correctamente.';
      showTrophy();
    } else {
      resultBox.innerHTML =
        `<strong>${score}/3</strong> — Revisa los conceptos señalados en la página.`;
      hideTrophy();
    }
  });
})();
