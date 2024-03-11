var questions = [
  {
    question: 'Qual dos seguintes países não faz parte do Reino Unido?',
    answers: ['Inglaterra', 'Escócia', 'Irlanda', 'País de Gales'],
    correctAnswer: 2,
  },
  {
    question: 'Qual dos seguintes continentes é o menor em tamanho?',
    answers: ['Ásia', 'Austrália', 'Europa', 'América do Sul'],
    correctAnswer: 1,
  },
  {
    question: 'Qual é o pico de montanha mais alto de África?',
    answers: ['Monte Kilimanjaro', 'Monte Elbrus', 'Monte Everest', 'Monte Fuji'],
    correctAnswer: 0,
  },
  {
    question: 'Qual dos seguintes oceanos é o maior do mundo?',
    answers: ['Oceano Atlântico', 'Oceano Índico', 'Oceano Pacífico', 'Oceano Ártico'],
    correctAnswer: 2,
  },
  {
    question: 'Qual é a capital do Canadá?',
    answers: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
    correctAnswer: 1,
  },
  {
    question: 'Qual dos seguintes países não está localizado na América do Sul?',
    answers: ['Brasil', 'Argentina', 'México', 'Chile'],
    correctAnswer: 2,
  },
  {
    question: 'Qual dos seguintes rios é o mais longo do mundo?',
    answers: ['Rio Amazonas', 'Rio Nilo', 'Rio Yangtze', 'Rio Mississipi'],
    correctAnswer: 1,
  },
  {
    question: 'Qual dos seguintes países é o menor em termos de área terrestre?',
    answers: ['Malta', 'Mónaco', 'Vaticano', 'San Marino'],
    correctAnswer: 2,
  },
  {
    question: 'Qual dos seguintes desertos é o maior do mundo?',
    answers: ['Deserto do Saara', 'Deserto da Arábia', 'Deserto de Gobi', 'Deserto de Kalahari'],
    correctAnswer: 0,
  },
  {
    question: 'Qual dos seguintes países é o maior em termos de área terrestre?',
    answers: ['China', 'Índia', 'Rússia', 'Estados Unidos da América'],
    correctAnswer: 2,
  },
];

var usedQuestions = [];

let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

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

function checkAnswer(selectedAnswer) {
  var selectedQuestion = questions[usedQuestions[usedQuestions.length - 1]];
  var correctAnswer = selectedQuestion.answers[selectedQuestion.correctAnswer];

  if (selectedAnswer === correctAnswer) {
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
        populateQuestion();
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
    });
  }
}

function attachEventListeners() {
  var answerButtons = document.getElementsByClassName('answer-button');
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener('click', function () {
      checkAnswer(this.value);
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

  console.log('Minutes:', minutes); // Debugging
  console.log('Seconds:', seconds); // Debugging

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  console.log('Final Minutes:', minutes); // Debugging
  console.log('Final Seconds:', seconds); // Debugging

  // Save the time to loggedUser
  loggedUser.time = minutes + ':' + seconds;
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

  // Save the time to the users array in localStorage
  var users = JSON.parse(localStorage.getItem('users'));
  users.forEach(function (user) {
    if (user.username === loggedUser.username) {
      user.time = loggedUser.time;
    }
  });
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
      },
    });
    loggedUser.completedLevels.push(1);
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }

  var questionTitle = document.getElementById('question-title');
  var questionBody = document.getElementById('question-body');
  var answer1 = document.getElementById('answer1');
  var answer2 = document.getElementById('answer2');
  var answer3 = document.getElementById('answer3');
  var answer4 = document.getElementById('answer4');

  var selectedQuestion = getRandomQuestion();

  questionTitle.textContent = 'Desafio dos Continentes:';
  questionBody.textContent = selectedQuestion.question;
  answer1.value = selectedQuestion.answers[0];
  answer2.value = selectedQuestion.answers[1];
  answer3.value = selectedQuestion.answers[2];
  answer4.value = selectedQuestion.answers[3];

  attachEventListeners();
}

startTimer();

populateQuestion();
