function createLeaderboard() {
  var usernames = [];

  var users = JSON.parse(localStorage.getItem('users'));

  for (var i = 0; i < users.length; i++) {
    usernames.push(users[i].username);
  }

  var table = document.querySelector('#leaderboard-table table');
  var count = 1;

  for (var i = 0; i < usernames.length; i++) {
    if (usernames[i] !== 'admin') {
      var row = document.createElement('tr');

      var positionCell = document.createElement('td');
      var usernameCell = document.createElement('td');
      var timeCell = document.createElement('td');

      positionCell.textContent = count;
      usernameCell.textContent = usernames[i];
      timeCell.textContent = '-';

      row.appendChild(positionCell);
      row.appendChild(usernameCell);
      row.appendChild(timeCell);

      table.appendChild(row);

      count++;
    }
  }

  /* highlight loogedUser in table */
  var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  var rows = document.querySelectorAll('#leaderboard-table table tr');

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].children[1].textContent === loggedUser.username) {
      rows[i].style.backgroundColor = '#c9c9c9';
    }
  }
}

createLeaderboard();
