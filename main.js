// Formulario
(function(){
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-message');

  function showMessage(text, ok=true){
    msg.textContent = text;
    msg.style.color = ok ? 'green' : 'red';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    showMessage('Formulario enviado correctamente.');
    form.reset();
  });

  form.addEventListener('reset', function(){
    showMessage('Formulario limpiado.');
  });
})();

// Quiz + trofeo + confetti
(function(){
  const quiz = document.getElementById('quiz');
  const resultBox = document.getElementById('quiz-result');
  const trophyWrap = document.getElementById('trophy-wrap');
  const confetti = document.getElementById('confetti');

  function showTrophy(){
    trophyWrap.style.display = 'flex';
    confetti.innerHTML = '';
    const colors = ['#ff4757','#ffb86b','#7bed9f','#70a1ff','#f78fb3'];

    for(let i=0;i<20;i++){
      const s = document.createElement('span');
      s.style.left = Math.random()*100 + '%';
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() + 's';
      confetti.appendChild(s);
    }

    setTimeout(()=> confetti.innerHTML='', 1800);
  }

  quiz.addEventListener('submit', function(e){
    e.preventDefault();

    let score = 0;
    if(document.getElementById('q1').value === 'Visual') score++;
    if((document.querySelector('input[name="q2"]:checked')||{}).value === 'Role-play') score++;
    if(document.getElementById('q3').value === 'Espectro') score++;

    resultBox.style.display = 'block';

    if(score === 3){
      resultBox.innerHTML = '<strong>3/3 — Excelente</strong>';
      showTrophy();
    } else {
      resultBox.innerHTML = `<strong>${score}/3</strong> — Intenta de nuevo`;
    }
  });
})();
