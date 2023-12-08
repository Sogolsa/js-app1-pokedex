// IIFE //
// Pokemon Array of Objects //
let pokemonRepository = (function () {
  let pokemonList = [];
  // Pushing pokemon list from the API //
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        return item;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // show details when click on the button //
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    // Empty title and body so every time you open a model a new model opens up //
    modalTitle.empty();
    modalBody.empty();

    // create a name for pokemon//
    let titleElement = $('<h1>' + pokemon.name + '<h1>');
    let imageElementFront = $('<img class="modal-image" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</P>');
    let types = pokemon.types.map((typeName) => typeName.type.name).join(', ');
    let typesElement = $('<p>' + 'Types: ' + types + '</p>');


    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(imageElementFront);
    modalBody.append(typesElement);

    $('#exampleModal').modal('show');
  }

  // Added hideModal function to close the modal with the x button //
  function hideModal() {
    $('#exampleModal').modal('hide');
  }

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
    $(button).on('click', function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    //Calling the list group class from ul//
    let pokemonListElement = $('.list-group');
    // creating an div child element for the list with class = row //
    let rowElement = $('<div class="row justify-content-center"></div>');
    let pokemonItem = $('<li class="list-group-item"></li>');
    let button = $('<button class="btn btn-primary"></button>');
    button.text(pokemon.name);

    addButtonListener(button, pokemon);

    pokemonItem.append(button);
    pokemonListElement.append(rowElement);
    rowElement.append(pokemonItem);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addButtonListener: addButtonListener,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

// Go through all the list and get the names one by one. //
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
