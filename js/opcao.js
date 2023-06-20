var questions = [
  {
    question: 'identifique quais os monumentos e locais famosos pertencem à cidade de Paris.',
    answers: [
      'Torre Eiffel',
      'Arco do Triunfo',
      'Pont du Gard',
      'Palácio das Papas',
      'Catedral de Notre-Dame',
    ],
    correctAnswer: [0, 1, 4],
  },
  {
    question: 'Identifique quais são as capitais da Europa Ocidental.',
    answers: ['Lisboa', 'Paris', 'Madrid', 'Roma', 'Berlim'],
    correctAnswer: [1, 2, 3],
  },
  {
    question: 'Quais são os oceanos que banham a África?',
    answers: [
      'Oceano Atlântico',
      'Oceano Índico',
      'Oceano Pacífico',
      'Oceano Ártico',
      'Oceano Antártico',
    ],
    correctAnswer: [0, 1],
  },
  {
    question: 'Identifique as cadeias montanhosas mais altas do mundo.',
    answers: [
      'Montanhas Rochosas',
      'Cordilheira dos Andes',
      'Montanhas Urais',
      'Himalaias',
      'Alpes',
    ],
    correctAnswer: [1, 3],
  },
  {
    question: 'Quais são as línguas oficiais do Canadá?',
    answers: ['Inglês', 'Francês', 'Espanhol', 'Alemão', 'Chinês'],
    correctAnswer: [0, 1],
  },
  {
    question: 'Pelo que é conhecida a Itália?',
    answers: [
      'País das especiarias',
      'País das massas',
      'País do Futebol',
      'País das tulipas',
      'País das flores',
    ],
    correctAnswer: [1],
  },
  {
    question: 'Quais são os principais monumentos encontrados em Roma?',
    answers: ['Coliseu', 'Torre de Pisa', 'Panteão', 'Basílica de São Pedro', 'Fontana di Trevi'],
    correctAnswer: [0, 2, 3, 4],
  },
  {
    question: 'Quais são os distritos que formam a região Norte de Portugal?',
    answers: ['Minho', 'Trás-os-Montes e Alto Douro', 'Beira Alta', 'Portalegre', 'Alentejo'],
    correctAnswer: [0, 1],
  },
  {
    question: 'Os principais monumentos de Lisboa são:',
    answers: [
      'Torre de Belém',
      'Mosteiro de Alcobaça',
      'Torre dos Clérigos',
      'Panteão Nacional',
      'Castelo de São Jorge',
    ],
    correctAnswer: [0, 3, 4],
  },
];
var usedQuestions = [];

var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

function getRandomQuestion() {
  var unusedQuestions = questions.filter(function (question, index) {
    return usedQuestions.indexOf(index) === -1;
  });

  if (unusedQuestions.length === 0) {
    usedQuestions = [];
    unusedQuestions = questions;
  }

  var randomIndex = Math.floor(Math.random() * unusedQuestions.length);
  var selectedQuestion = unusedQuestions[randomIndex];
  usedQuestions.push(questions.indexOf(selectedQuestion));

  return selectedQuestion;
}

let selectedAnswers = [];

function attachEventListeners() {
  var answer1 = document.getElementById('answer1');
  var answer2 = document.getElementById('answer2');
  var answer3 = document.getElementById('answer3');
  var answer4 = document.getElementById('answer4');
  var answer5 = document.getElementById('answer5');

  answer1.addEventListener('click', function () {
    selectedAnswers.push(answer1.value);
  });
  answer2.addEventListener('click', function () {
    selectedAnswers.push(answer2.value);
  });
  answer3.addEventListener('click', function () {
    selectedAnswers.push(answer3.value);
  });
  answer4.addEventListener('click', function () {
    selectedAnswers.push(answer4.value);
  });
  answer5.addEventListener('click', function () {
    selectedAnswers.push(answer5.value);
  });

  var answerButton = document.getElementById('avancar');

  answerButton.addEventListener('click', function () {
    checkAnswers();
  });
}

/* check if selectedAnswers are correct */
function checkAnswers() {
  var selectedQuestion = usedQuestions[usedQuestions.length - 1];
  var correctAnswer = questions[selectedQuestion].correctAnswer;
  var answer1 = document.getElementById('answer1');
  var answer2 = document.getElementById('answer2');
  var answer3 = document.getElementById('answer3');
  var answer4 = document.getElementById('answer4');
  var answer5 = document.getElementById('answer5');

  console.log('Correta:', correctAnswer);
  console.log('Selecionada:', selectedAnswers);

  var isCorrect = true;

  for (var i = 0; i < selectedAnswers.length; i++) {
    if (!correctAnswer.includes(parseInt(selectedAnswers[i]))) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    Swal.fire({
      title: 'Resposta correta!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        selectedAnswers = [];
        populateQuestion();
        answer1.checked = false;
        answer2.checked = false;
        answer3.checked = false;
        answer4.checked = false;
        answer5.checked = false;
      },
    });
  } else {
    Swal.fire({
      title: 'Resposta incorreta!',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        selectedAnswers = []; // Reset selected answers
        /* clear selected checkboxes */
        answer1.checked = false;
        answer2.checked = false;
        answer3.checked = false;
        answer4.checked = false;
        answer5.checked = false;
      },
    });
  }
}

var startTime;
var timerElement = document.getElementById('timer-body');

function startTimer() {
  startTime = new Date().getTime();
  updateTimer();
}

function updateTimer() {
  var currentTime = new Date().getTime();
  var elapsedTime = currentTime - startTime;
  var seconds = Math.floor(elapsedTime / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds %= 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  timerElement.textContent = minutes + ':' + seconds;

  setTimeout(updateTimer, 1000);
}

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

// Function to populate the HTML elements with a randomly selected question
function populateQuestion() {
  if (usedQuestions.length >= 4) {
    stopTimerAndSaveTime();
    Swal.fire({
      title: 'Parabéns!',
      text: `Concluiu o desafio dos continentes em ${
        timerElement.textContent.split(':')[0]
      } minutos e ${timerElement.textContent.split(':')[1]} segundos!`,
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        window.location.href = './levels.html';
        loggedUser.completedLevels.push('2');
      },
    });
  }

  var questionTitle = document.getElementById('question-title');
  var questionBody = document.getElementById('question-body');

  var selectedQuestion = getRandomQuestion();

  questionTitle.textContent = 'Desafio dos Continentes:';
  questionBody.textContent = selectedQuestion.question;

  var answer1Label = document.getElementById('answer1-label');
  var answer2Label = document.getElementById('answer2-label');
  var answer3Label = document.getElementById('answer3-label');
  var answer4Label = document.getElementById('answer4-label');
  var answer5Label = document.getElementById('answer5-label');
  answer1Label.textContent = selectedQuestion.answers[0];
  answer2Label.textContent = selectedQuestion.answers[1];
  answer3Label.textContent = selectedQuestion.answers[2];
  answer4Label.textContent = selectedQuestion.answers[3];
  answer5Label.textContent = selectedQuestion.answers[4];

  attachEventListeners();
}
startTimer();

populateQuestion();
