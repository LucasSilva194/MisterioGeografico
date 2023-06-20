const { get } = require('http');

class User {
  constructor(username, password, email, time = '-') {
    this.username = username;
    this.password = password;
    this.email = email;
    this.time = time;
  }
}

let users = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@example.com',
    time: '-',
    completedLevels: [],
  },
  {
    username: 'user1',
    password: 'password1',
    email: 'user1@example.com',
    time: '-',
    completedLevels: [],
  },
  {
    username: 'user2',
    password: 'password2',
    email: 'user2@example.com',
    time: '-',
    completedLevels: [],
  },
  {
    username: 'user3',
    password: 'password3',
    email: 'user3@example.com',
    time: '-',
    completedLevels: [],
  },
];

// Check if users array exists in local storage
if (localStorage.getItem('users') === null) {
  localStorage.setItem('users', JSON.stringify(users));
} else {
  loadUsers();
}

function loadUsers() {
  users = JSON.parse(localStorage.getItem('users')).map(
    (user) => new User(user.username, user.password, user.email, user.time, user.completedLevels)
  );
}

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

/* function showSuccessMessage() {
  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'Login efetuado com sucesso!',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d9b632',
  });
} */

function showErrorMessage() {
  Swal.fire({
    icon: 'error',
    title: 'Erro de Login',
    text: 'Utilizador ou Palavra-passe Incorretos!',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d9b632',
  });
}

function showInputErrorMessage() {
  Swal.fire({
    icon: 'error',
    title: 'Erro de Login',
    text: 'Os campos não devem estar vazios!',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d9b632',
  });
}

// Login function
function login() {
  var username = document.getElementById('username-input').value;
  var password = document.getElementById('password-input').value;

  if (username === '' || password === '') {
    showInputErrorMessage();
    return;
  }

  // Check for admin login
  if (username === 'admin' && password === 'admin') {
    Swal.fire({
      icon: 'success',
      title: 'Bem-vindo ADMIN!',
      text: 'Login efetuado com sucesso!',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d9b632',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '../html/admin.html';
      }
    });
    return;
  }

  for (var i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: `Bem vindo(a), ${username}!`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#d9b632',
      }).then((result) => {
        if (result.isConfirmed) {
          /* redirect to index */
          window.location.href = '/';
        }
      });
      localStorage.setItem('loggedUser', JSON.stringify(users[i]));

      return;
    }
  }

  showErrorMessage();
}

// Register function
function register() {
  var username = document.getElementById('username-input').value;
  var password = document.getElementById('password-input').value;
  var email = document.getElementById('email-input').value;

  if (username === '' || password === '' || email === '') {
    showInputErrorMessage();
    return;
  }

  for (var i = 0; i < users.length; i++) {
    if (username === users[i].username) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de Registo',
        text: 'O utilizador já existe!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d9b632',
      });
      return;
    } else if (email === users[i].email) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de Registo',
        text: 'O email já existe!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d9b632',
      });
      return;
    }
  }

  users.push(new User(username, password, email));

  saveUsers();

  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'Registo efetuado com sucesso!',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d9b632',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '../html/login.html';
    }
  });
}

// Edit user function
function editUser() {
  let newEmail = document.getElementById('new-email').value;
  let newPassword = document.getElementById('new-password').value;
  let newPasswordConfirm = document.getElementById('confirm-password').value;

  let currentEmail = JSON.parse(localStorage.getItem('loggedUser')).email;
  let currentPassword = JSON.parse(localStorage.getItem('loggedUser')).password;

  if (newEmail === '') {
    newEmail = currentEmail;
  } else {
    for (var i = 0; i < users.length; i++) {
      if (newEmail === users[i].email) {
        Swal.fire({
          icon: 'error',
          title: 'Erro de Edição',
          text: 'O email já existe!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d9b632',
        });
        return;
      }
    }
  }

  if (newPassword === '') {
    newPassword = currentPassword;
  } else if (newPassword !== newPasswordConfirm) {
    Swal.fire({
      icon: 'error',
      title: 'Erro de Edição',
      text: 'As palavras-passe não coincidem!',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d9b632',
    });
    return;
  }

  for (var i = 0; i < users.length; i++) {
    if (currentEmail === users[i].email) {
      users[i].email = newEmail;
      users[i].password = newPassword;
    }
  }

  saveUsers();
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  loggedUser.email = newEmail;
  loggedUser.password = newPassword;
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'Edição efetuada com sucesso!',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d9b632',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '../html/profile.html';
    }
  });
}
