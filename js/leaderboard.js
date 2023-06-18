function createLeaderboard() {
  var usernames = [];

  var users = JSON.parse(localStorage.getItem('users'));

  for (var i = 0; i < users.length; i++) {
    usernames.push(users[i].username);
  }

  var table = document.querySelector('#leaderboard-table table');
  var count = 1;

  for (var i = 0; i < users.length; i++) {
    if (users[i].username !== 'admin') {
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = count;
      cell2.innerHTML = users[i].username;
      cell3.innerHTML = users[i].time;
      count++;
    }
  }

  var table = document.querySelector('#leaderboard-table table');
  var rows = table.querySelectorAll('tr');
  var sortedRows = [];

  for (var i = 0; i < rows.length; i++) {
    sortedRows.push(rows[i]);
  }

  sortedRows.sort(function (a, b) {
    var aTime = a.children[2].textContent;
    var bTime = b.children[2].textContent;

    if (aTime < bTime) {
      return 1; // Invert the return value from -1 to 1
    } else if (aTime > bTime) {
      return -1; // Invert the return value from 1 to -1
    } else {
      return 0;
    }
  });

  for (var i = 0; i < sortedRows.length; i++) {
    table.appendChild(sortedRows[i]);
  }

  /* arrange numbers */
  var rows = table.querySelectorAll('tr');

  for (var i = 0; i < rows.length; i++) {
    rows[i + 1].children[0].innerHTML = i + 1;
  }
}

createLeaderboard();
