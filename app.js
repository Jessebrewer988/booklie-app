// Game Class: Represents a game
class Game {
  constructor(title, developer, year) {
    this.title = title;
    this.developer = developer;
    this.year = year;
  }
}

// UI Class: Handles User Interface
class UI {
  static displayGames() {
    const StoredGames = Store.getGames();

    const games = StoredGames;
    for (let game in games) {
      UI.addGameToList(games[game]);
    }
  }

  static addGameToList(game) {
    const list = document.querySelector('#game-list');
    const row = document.createElement('tr');

    row.innerHTML = `
            <td>${game.title}</td>
            <td>${game.developer}</td>
            <td>${game.year}</td>
            <td class="trash-td"><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  static deleteGame(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#game-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 500);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#developer').value = '';
    document.querySelector('#year').value = '';
  }
}

// Store Class: Handles Local Storage
class Store {
  static getGames() {
    let games;
    if (localStorage.getItem('games') === null) {
      games = [];
    } else {
      games = JSON.parse(localStorage.getItem('games'));
    }
    return games;
  }

  static addGame(game) {
    const games = Store.getGames();
    games.push(game);
    localStorage.setItem('games', JSON.stringify(games));
  }

  static removeGame(year) {
    const games = Store.getGames();

    games.forEach((game, index) => {
      if (game.year === year) {
        games.splice(index, 1);
      }
    });
    localStorage.setItem('games', JSON.stringify(games));
  }
}

// Events: Display Games
document.addEventListener('DOMContentLoaded', UI.displayGames);

// Event: Add a Game to the List
document.querySelector('#game-form').addEventListener('submit', e => {
  // Stop actual submit
  e.preventDefault();
  // Get form values
  const title = document.querySelector('#title').value;
  const developer = document.querySelector('#developer').value;
  const year = document.querySelector('#year').value;

  // Validate
  if (title === '' || developer === '' || year === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate Game
    const game = new Game(title, developer, year);

    // Add Game to UI
    UI.addGameToList(game);

    // Add game to Store
    Store.addGame(game);

    // Show alert
    UI.showAlert('Game Added!', 'success');

    // Clear form fields
    UI.clearFields();
  }
});

// Event: Remove a Game from the Table and Storage
document.querySelector('#game-list').addEventListener('click', e => {
  // Remove from UI
  UI.deleteGame(e.target);

  //Remove Game from store
  Store.removeGame(e.target.parentElement.previousElementSibling.textContent);

  // Show Success Message
  UI.showAlert('Game Removed', 'success');
});
