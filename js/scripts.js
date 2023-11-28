let pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
  { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
  { name: 'Starmie', height: 1.1, types: ['psychic', 'water'] },
];

/* Using forEach() method to replace the for loop to get the same output */

// pokemonList.forEach(function (pokemon) {
//   document.write(pokemon.name + ' ' + '(height:' + pokemon.height + ') <br>');
// });

// Highlighting the biggest pokemon //
pokemonList.forEach(function (pokemon) {
  if (pokemon.height > 1.5) {
    nameHeight = pokemon.name + ' ' + '(height:' + pokemon.height + ')';
    document.write(nameHeight + " -Wow! That's big!" + '<br>');
  } else {
    document.write(
      pokemon.name + ' ' + '(height:' + pokemon.height + ')' + '<br>'
    );
  }
});
