// IIFE //
// Pokemon Array of Objects //
let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
    { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
    { name: 'Starmie', height: 1.1, types: ['psychic', 'water'] },
  ];

  // Add a new object ot the array and make sure it's object //
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.error('pokemon mubst be an object.');
    }
  }

  // Get the pokemon List //
  function getAll() {
    return pokemonList;
  }

  // show details when click on the button //
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // button listener so when click on the button, it shows the details of pokemon //
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addButtonListener: addButtonListener
  };
})();


// Add a new object to the pokemon list //
pokemonRepository.add({
  name: 'Jigglypuff',
  height: 0.5,
  types: ['normal', 'fairy'],
});

// Go trought all the list and get the names one by one. //
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
