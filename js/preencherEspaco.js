document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('avancar').addEventListener('click', checkAnswers )
    });

var questions = [
    {
        question:['A cidade de Lisboa é a capital de ','e está localizada na costa ','do país. Ela é banhada pelo rio ','e tem um clima mediterrâneo, com invernos suaves e verões quentes e secos. A cidade é famosa por suas atrações históricas, como a Torre de ','e o Mosteiro dos ','que atraem milhões de turistas todos os anos.'],
        answers: ['Portugal', 'oeste' , 'Tejo' , 'Belém', 'Jerónimos'],
    },
    {
        question: ['O Porto é a segunda maior cidade de ','localizada no ','do país, na margem direita do rio ','. Ela é conhecida por seus edifícios históricos, como a Torre dos','e a ','da Sé, que datam da Idade Média.'],
        answers: ['Portugal', 'Norte', 'Douro', 'Clérigos', 'Catedral'],
    },
    {
        question: ['Londres é a capital da Inglaterra e do Reino ','. Localizada no sudeste do país, a cidade é atravessada pelo rio ','e tem uma rica história que remonta aos tempos romanos. Londres é conhecida por seus marcos icônicos, como o Big ','e o ','de Buckingham.'],
        answers: ['Unido', 'Tamisa', 'Ben', 'Palácio'],
    },
    {
        question: ['A cidade de Paris é a capital da ','e é conhecida por seus marcos icônicos, como a Torre ','e o ','do Triunfo. A cidade está localizada no centro do país e é atravessada pelo rio ','.'],
        answers: ['França', 'Eiffel', 'Arco', 'Sena'],
    },
    {
        question: ['Nova York é a maior cidade dos Estados Unidos e um importante centro financeiro, cultural e turístico. A cidade está localizada na costa ','do país e é atravessada pelo rio ','. Nova York é conhecida por seus marcos famosos, como a ','Square, o Central ','e a Estátua da Liberdade, e por seus arranha-céus icônicos, como o ','State Building e o One World Trade Center.'],
        answers: ['Este', 'Hudson', 'Times', 'Park', 'Empire'],
    },
];


var usedQuestions = [];

var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

function getRandomQuestion() {
    var unusedQuestions = questions.filter(function (question, index) {
      return usedQuestions.indexOf(index) === -1;
    });
  
    if (unusedQuestions.length === 0) {
      // All questions have been used, reset the usedQuestions array
      usedQuestions = [];
      unusedQuestions = questions;
    }
  
    var randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    var selectedQuestion = unusedQuestions[randomIndex];
    usedQuestions.push(questions.indexOf(selectedQuestion));
  
    return selectedQuestion;
}

var pergunta1 = getRandomQuestion();

var questionTitle = document.getElementById('answer-body');

console.log(pergunta1);
console.log(questionTitle);
console.log(pergunta1.question.length);

for(let i = 0; i<pergunta1.question.length; i++) {
    questionTitle.innerHTML += pergunta1.question[i];
    if(i == pergunta1.question.length - 1) {
        break;
    }
    questionTitle.innerHTML += `<input id='answer${i}' type="text" class="form-control">`;
}


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
    var correctAnswers = 0;
    for(let i = 0; i<pergunta1.answers.length; i++) {
        var answer = document.getElementById(`answer${i}`).value;
        if(answer === pergunta1.answers[i]) {
            correctAnswers++;
        }
    }
    console.log(correctAnswers);
    if(correctAnswers === pergunta1.answers.length) {
        stopTimerAndSaveTime();
        //faz-me um swal para a pagina de levels quando clico no avancar
        swal.fire({
            title: "Parabéns!",
            text: "Acertaste a frase!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            willClose: () => {
                window.location.href = './levels.html';
            }
        });
    } else {
        swal.fire({
            title: "Ups!",
            text: "Não acertaste a frase!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    }
}













