// IIFE //
// Pokemon Array of Objects //
let pokemonRepository = (function () {
  let pokemonList = [];
  // Pushing pokemon list from the API //
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Add a new object ot the array and make sure it's object //
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error('pokemon must be an object.');
    }
  }

  // Get the pokemon List //
  function getAll() {
    return pokemonList;
  }

  // button listener so when click on the button, it shows the details of pokemon //
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Add lists of pokemon buttons //
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');

    addButtonListener(button, pokemon);

    pokemonItem.appendChild(button);
    pokemonList.appendChild(pokemonItem);
  }

  // Promise function //
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json(); //convert the result to json //
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // show details when click on the button //
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addButtonListener: addButtonListener,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// Go through all the list and get the names one by one. //
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
