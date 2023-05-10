// Users Array
let users = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@example.com',
  },
  {
    username: 'user1',
    password: 'password1',
    email: 'user1@example.com',
  },
  {
    username: 'user2',
    password: 'password2',
    email: 'user2@example.com',
  },
  {
    username: 'user3',
    password: 'password3',
    email: 'user3@example.com',
  },
];

// Check if users array exists in local storage
if (localStorage.getItem('users') === null) {
  localStorage.setItem('users', JSON.stringify(users));
} else {
  loadUsers();
}

function loadUsers() {
  users = JSON.parse(localStorage.getItem('users'));
}

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function showSuccessMessage() {
  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'Login efetuado com sucesso!',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d9b632',
  });
}

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

  /* check for admin login */
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
      showSuccessMessage();
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

  users.push({
    username: username,
    password: password,
    email: email,
  });

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
