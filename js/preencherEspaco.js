document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('avancar').addEventListener('click', checkAnswers);
});

var questions = [
  {
    question: [
      {
        frase1: 'A cidade de Lisboa é a capital de ',
        frase2: 'e está localizada na costa ',
        frase3: 'do país. Ela é banhada pelo rio ',
        frase4: 'A cidade é famosa por suas atrações históricas, como a Torre de ',
        frase5: 'e o Mosteiro dos ',
        frase6: 'que atraem milhões de turistas todos os anos.',
      },
    ],
    answers: ['Portugal', 'oeste', 'Tejo', 'Belém', 'Jerónimos'],
  },
  {
    question: [
      {
        frase1: 'O Porto é a segunda maior cidade de ',
        frase2: 'localizada no ',
        frase3: 'do país, na margem direita do rio ',
        frase4: '. Ela é conhecida por seus edifícios históricos, como a Torre dos ',
        frase5: 'e a ',
        frase6: 'da Sé, que datam da Idade Média.',
      },
    ],
    answers: ['Portugal', 'Norte', 'Douro', 'Clérigos', 'Catedral'],
  },
  {
    question: [
      {
        frase1: 'Londres é a capital da Inglaterre e do Reino ',
        frase2: '. Localizada no sudeste do país, a cidade é atravessada pelo rio ',
        frase3: 'Londres é conhecida por seus marcos icônicos, como o Big ',
        frase4: 'e o ',
        frase5: 'de Buckingham. Londres também tem galerias de arte, como a ',
      },
    ],
    answers: ['Unido', 'Tamisa', 'Ben', 'Palácio', 'National'],
  },
  {
    question: [
      {
        frase1: 'A cidade de Paris é a capital da ',
        frase2: 'e é conhecida por seus marcos icônicos, como a Torre ',
        frase3: 'e o ',
        frase4: 'do Triunfo. A cidade está localizada no centro do país e é atravessada pelo rio ',
        frase5: 'E seus pontos turísticos mais famosos são a Catedral de ',
      },
    ],
    answers: ['França', 'Eiffel', 'Arco', 'Sena', 'Notre Dame'],
  },
  {
    question: [
      {
        frase1: 'Nova York é a maior cidade dos Estados Unidos e está localizada na costa',
        frase2: 'do país e é atravessada pelo rio ',
        frase3: '. Nova York é conhecida por seus marcos famosos, como a ',
        frase4: 'Square, o Central ',
        frase5: 'e a Estátua da Liberdade, e por seus arranha-céus icônicos, como o ',
        frase6: 'State Building e o One World Trade Center.',
      },
    ],
    answers: ['Este', 'Hudson', 'Times', 'Park', 'Empire'],
  },
];

var usedQuestions = [];

var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

function getRandomQuestion() {
  var randomIndex = Math.floor(Math.random() * questions.length);
  var randomQuestion = questions[randomIndex];
  if (usedQuestions.includes(randomQuestion)) {
    return getRandomQuestion();
  }
  usedQuestions.push(randomQuestion);
  return randomQuestion;
}

var pergunta1 = getRandomQuestion();

//Função Começar Relogio
var startTime; // Variable to store the start time
var timerElement = document.getElementById('timer-body'); // Timer element in HTML

// Function to start the timer
function startTimer() {
  startTime = new Date().getTime();
  updateTimer();
}

// Function to update the timer display
function updateTimer() {
  var currentTime = new Date().getTime();
  var elapsedTime = currentTime - startTime;
  var seconds = Math.floor(elapsedTime / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Add leading zero if seconds or minutes is less than 10
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  // Update the timer element with the current time
  timerElement.textContent = minutes + ':' + seconds;

  // Call updateTimer again after 1 second
  setTimeout(updateTimer, 1000);
}

// Function to stop the timer and save the time to localStorage
function stopTimerAndSaveTime() {
  var endTime = new Date().getTime();
  var elapsedTime = endTime - startTime;
  var seconds = Math.floor(elapsedTime / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds %= 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  // Remove the leading zero from minutes calculation
  var loggedUserMinutes = parseInt(loggedUser.time.split(':')[0]);
  var loggedUserSeconds = parseInt(loggedUser.time.split(':')[1]);

  var newMinutes = loggedUserMinutes + minutes;
  var newSeconds = loggedUserSeconds + seconds;

  if (newSeconds >= 60) {
    newMinutes += 1;
    newSeconds -= 60;
  }

  if (newSeconds < 10) {
    newSeconds = '0' + newSeconds;
  }

  // Remove the leading zero from newMinutes if it's less than 10
  var newMinutesString = newMinutes.toString();
  if (newMinutes < 10) {
    newMinutesString = '0' + newMinutesString.slice(-1);
  }

  loggedUser.time = newMinutesString + ':' + newSeconds;
  console.log('minutos: ' + newMinutesString + ' segundos: ' + newSeconds);

  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  var users = JSON.parse(localStorage.getItem('users'));
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === loggedUser.username) {
      users[i] = loggedUser;
      break;
    }
  }
  localStorage.setItem('users', JSON.stringify(users));
}

startTimer();

//Função para verificar se as respostas estão corretas
function checkAnswers() {
  var answer0 = document.getElementById('answer0').value;
  var answer1 = document.getElementById('answer1').value;
  var answer2 = document.getElementById('answer2').value;
  var answer3 = document.getElementById('answer3').value;
  var answer4 = document.getElementById('answer4').value;

  var answers = [answer0, answer1, answer2, answer3, answer4];

  var correctAnswers = pergunta1.answers;

  var correctAnswersCounter = 0;

  for (var i = 0; i < answers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      correctAnswersCounter++;
    }
  }

  if (correctAnswersCounter === 5) {
    alert('Parabéns! Você acertou todas as respostas!');
    stopTimerAndSaveTime();
    window.location.href = '../html/levels.html';
  } else {
    alert('Você acertou ' + correctAnswersCounter + ' respostas. Tente novamente!');
    window.location.href = '../html/lvl-preencherEspaco.html';
  }
}

function populateQuestion() {
  var frase1 = document.getElementById('frase1');
  var frase2 = document.getElementById('frase2');
  var frase3 = document.getElementById('frase3');
  var frase4 = document.getElementById('frase4');
  var frase5 = document.getElementById('frase5');
  var frase6 = document.getElementById('frase6');

  frase1.textContent = pergunta1.question[0].frase1;
  frase1.innerHTML += `<input type="text" id="answer0" class="input-answer" placeholder="Resposta 1">`;
  frase2.textContent = pergunta1.question[0].frase2;
  frase2.innerHTML += `<input type="text" id="answer1" class="input-answer" placeholder="Resposta 2">`;
  frase3.textContent = pergunta1.question[0].frase3;
  frase3.innerHTML += `<input type="text" id="answer2" class="input-answer" placeholder="Resposta 3">`;
  frase4.textContent = pergunta1.question[0].frase4;
  frase4.innerHTML += `<input type="text" id="answer3" class="input-answer" placeholder="Resposta 4">`;
  frase5.textContent = pergunta1.question[0].frase5;
  frase5.innerHTML += `<input type="text" id="answer4" class="input-answer" placeholder="Resposta 5">`;
  frase6.textContent = pergunta1.question[0].frase6;
}

populateQuestion();
