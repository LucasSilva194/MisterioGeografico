var questions = [
  {
    question: [
      '- Este país está localizado na Europa.',
      '- A capital deste país é Lisboa.',
      '- A língua oficial deste país é o português.',
      '- A moeda deste país é o euro.',
      '- Este país faz fronteira com a Espanha.',
    ],
    answers: ['França', 'Canadá', 'Portugal', 'Itália'],
    correctAnswer: [2],
    images: [
      '../imgs/bandeiras/franca.png',
      '../imgs/bandeiras/canada.png',
      '../imgs/bandeiras/portugal.jpg',
      '../imgs/bandeiras/italia.png',
    ],
  },
  {
    question: [
      '- Este país está localizado na Améria do Sul.',
      '- A capital deste país é Brasília.',
      '- A língua oficial deste país é o português.',
      '- A moeda deste país é o real.',
      '- Este país faz fronteira com a Argentina.',
    ],

    answers: ['Brasil', 'Colombia', 'Argentina', 'USA'],
    correctAnswer: [0],
    images: [
      '../imgs/bandeiras/brasil.jpg',
      '../imgs/bandeiras/colombia.png',
      '../imgs/bandeiras/argentina.png',
      '../imgs/bandeiras/usa.png',
    ],
  },
  {
    question: [
      '- Este país está localizado na América do Norte.',
      '- A capital deste país é Washington.',
      '- A língua oficial deste país é o inglês.',
      '- A moeda deste país é o dólar.',
      '- Este país faz fronteira com o México.',
    ],

    answers: ['Colombia', 'Canadá', 'Argentina', 'USA'],
    correctAnswer: [3],
    images: [
      '../imgs/bandeiras/colombia.png',
      '../imgs/bandeiras/canada.png',
      '../imgs/bandeiras/argentina.png',
      '../imgs/bandeiras/usa.png',
    ],
  },
  {
    question: [
      '- Este país está localizado na América do Sul.',
      '- A capital deste país é Buenos Aires.',
      '- A língua oficial deste país é o espanhol.',
      '- A moeda deste país é o peso.',
      '- Este país faz fronteira com o Brasil.',
    ],

    answers: ['Brasil', 'Argentina', 'Canadá', 'USA'],
    correctAnswer: [1],
    images: [
      '../imgs/bandeiras/brasil.jpg',
      '../imgs/bandeiras/argentina.png',
      '../imgs/bandeiras/canada.png',
      '../imgs/bandeiras/usa.png',
    ],
  },
  {
    question: [
      '- Este país está localizado na Europa.',
      '- A capital deste país é Amesterdão.',
      '- A língua oficial deste país é o holandês.',
      '- A moeda deste país é o euro.',
      '- A flor símbolo deste país é a tulipa.',
    ],

    answers: ['Holanda', 'França', 'Portugal', 'Itália'],
    correctAnswer: [0],
    images: [
      '../imgs/bandeiras/holanda.jpg',
      '../imgs/bandeiras/franca.png',
      '../imgs/bandeiras/portugal.jpg',
      '../imgs/bandeiras/italia.png',
    ],
  },
  {
    question: [
      '- Este país está localizado na Europa.',
      '- A torre Eiffel é um dos símbolos deste país.',
      '- O rio Sena passa por este país.',
      '- Faz fronteira com a Espanha.',
      '- Nação de origem do famoso pintor Claude Monet.',
    ],

    answers: ['França', 'UK', 'Portugal', 'Japão'],
    correctAnswer: [0],
    images: [
      '../imgs/bandeiras/franca.png',
      '../imgs/bandeiras/uk.jpg',
      '../imgs/bandeiras/portugal.jpg',
      '../imgs/bandeiras/japao.png',
    ],
  },
  {
    question: [
      '- Este país está localizado na Europa.',
      '- Conhecido como o país da bota.',
      '- As massas e as pizzas são alguns dos pratos típicos deste país.',
      '- Teve um grande império no passado.',
      '-A marca de carros Ferrari é originária deste país.',
    ],

    answers: ['França', 'Holanda', 'Japão', 'Itália'],
    correctAnswer: [3],
    images: [
      '../imgs/bandeiras/franca.png',
      '../imgs/bandeiras/holanda.jpg',
      '../imgs/bandeiras/japao.png',
      '../imgs/bandeiras/italia.png',
    ],
  },

  {
    question: [
      '- Este país está localizado na América do Sul.',
      '- A capital deste país é Bogotá.',
      '- A língua oficial deste país é o espanhol.',
      '- A moeda deste país é o peso.',
      '- Conhecido como o país do café.',
    ],

    answers: ['Brasil', 'Colombia', 'Argentina', 'USA'],
    correctAnswer: [1],
    images: [
      '../imgs/bandeiras/brasil.jpg',
      '../imgs/bandeiras/colombia.png',
      '../imgs/bandeiras/argentina.png',
      '../imgs/bandeiras/usa.png',
    ],
  },
  {
    question: [
      '- Este país está localizado na América do Norte.',
      '- A capital deste país é Ottawa.',
      '- A língua oficial deste país é o inglês.',
      '- Também se fala francês neste país.',
      '- Conhecido como o país do xarope de ácer.',
    ],

    answers: ['Colombia', 'Canadá', 'Argentina', 'USA'],
    correctAnswer: [1],
    images: [
      '../imgs/bandeiras/colombia.png',
      '../imgs/bandeiras/canada.png',
      '../imgs/bandeiras/argentina.png',
      '../imgs/bandeiras/usa.png',
    ],
  },

  {
    question: [
      '- Este país está localizado na Ásia.',
      '- Muito conhecido pela sua culinária.',
      '- A cultura automóvel é muito forte neste país.',
      '- A moeda deste país é o iene.',
      '- Conhecido como o país do sol nascente.',
    ],

    answers: ['Portugal', 'UK', 'Japão', 'USA'],
    correctAnswer: [2],
    images: [
      '../imgs/bandeiras/portugal.jpg',
      '../imgs/bandeiras/uk.jpg',
      '../imgs/bandeiras/japao.png',
      '../imgs/bandeiras/usa.png',
    ],
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
  var answerButtons = document.getElementsByClassName('answer-button');
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener('click', function () {
      checkAnswer(this.textContent);
    });
  }
}

function checkAnswer(selectedAnswer) {
  var selectedQuestion = questions[usedQuestions[usedQuestions.length - 1]];
  var correctAnswer = selectedQuestion.answers[selectedQuestion.correctAnswer];

  console.log('Selecionada', selectedAnswer, 'Correta:', correctAnswer);

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

var startTime;
var timerElement = document.getElementById('timer-body');

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

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  timerElement.textContent = minutes + ':' + seconds;

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

// Function to populate the HTML elements with a randomly selected question
function populateQuestion() {
  if (usedQuestions.length >= 4) {
    stopTimerAndSaveTime();
    Swal.fire({
      title: 'Parabéns!',
      text: `Concluiu o Enigma das Bandeiras em ${
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
    loggedUser.completedLevels.push(5);
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }

  var questionBody = document.getElementById('message-body');

  var selectedQuestion = getRandomQuestion();

  questionBody.textContent = selectedQuestion.question;
  questionBody.innerHTML = questionBody.innerHTML.replace(/,/g, '<br/>');

  var answerButtons = document.getElementsByClassName('answer-button');
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = selectedQuestion.answers[i];
    answerButtons[i].style.backgroundImage = `url(${selectedQuestion.images[i]})`;
  }

  attachEventListeners();
}
startTimer();

populateQuestion();
