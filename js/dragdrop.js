var flags = [
    {
        flag: '../imgs/bandeiras/argentina.png',
        answers: ['Argentina', 'Holanda', 'USA', 'Itália'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/brasil.jpg',
        answers: ['Brasil', 'Canadá', 'Colômbia', 'França'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/canada.png',
        answers: ['Canadá', 'Colômbia', 'USA', 'Portugal'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/colombia.png',
        answers: ['Colômbia', 'Japão', 'Itália', 'Holanda'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/franca.png',
        answers: ['França', 'Brasil', 'Reino Unido', 'USA'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/holanda.jpg',
        answers: ['Holanda', 'Itália', 'Canadá', 'Argentina'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/italia.png',
        answers: ['Itália', 'Colômbia', 'Brasil', 'Portugal'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/japao.png',
        answers: ['Japão', 'Brasil', 'Canadá', 'Itália'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/portugal.jpg',
        answers: ['Portugal', 'Colômbia', 'USA', 'França'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/uk.jpg',
        answers: ['Reino Unido', 'Brasil', 'França', 'Canadá'],
        correctAnswer: 0
    },
    {
        flag: '../imgs/bandeiras/usa.png',
        answers: ['USA', 'Portugal', 'Brasil', 'Colômbia'],
        correctAnswer: 0
    },
];

var usedFlags = [];

let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

function getRandomFlag() {
    var unusedFlags = flags.filter(function (flag, index) {
      return usedFlags.indexOf(index) === -1;
    });
  
    if (unusedFlags.length === 0) {
      usedFlags = [];
      unusedFlags = flags;
    }
  
    var randomIndex = Math.floor(Math.random() * unusedFlags.length);
    var selectedFlag = unusedFlags[randomIndex];
    usedFlags.push(flags.indexOf(selectedFlag));
  
    return selectedFlag;
}

console.log(getRandomFlag());

// Function to populate the HTML elements with a randomly selected question
function populateQuestion() {
    if (usedFlags.length >= 3) {
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
          loggedUser.completedLevels.push('1');
        },
      });
    }
  
    var answer1 = document.getElementById('hip1');
    var answer2 = document.getElementById('hip2');
    var answer3 = document.getElementById('hip3');
    var answer4 = document.getElementById('hip4');

    var flag1 = document.getElementById('flag');
  
    var selectedFlag = getRandomFlag();
  
    answer1.textContent = selectedFlag.answers[0];
    answer2.textContent = selectedFlag.answers[1];
    answer3.textContent = selectedFlag.answers[2];
    answer4.textContent = selectedFlag.answers[3];
    flag1.setAttribute("src", selectedFlag.flag);

}

populateQuestion();

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
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

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

startTimer();

//drag and drop

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    const selectedAnswer = document.getElementById(data).textContent
    checkAnswer(selectedAnswer)
}

  function checkAnswer(selectedAnswer) {
    var selectedFlag = flags[usedFlags[usedFlags.length - 1]];
    var correctAnswer = selectedFlag.answers[selectedFlag.correctAnswer];
  
    if (selectedAnswer === correctAnswer) {
      Swal.fire({
        title: 'Bandeira correta!',
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
        title: 'Bandeira incorreta!',
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

