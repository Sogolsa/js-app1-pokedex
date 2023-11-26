let pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
  { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
  { name: 'Starmie', height: 1.1, types: ['psychic', 'water'] }
];

/* for loop to list the names of all pokemons in the array with their height,
 and if height > 1.5, it get's the label of 'Wow, that's big!' */

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.5) {
    nameHeight =
      pokemonList[i].name + ' ' + '(height:' + pokemonList[i].height + ')';
    document.write(nameHeight + ' ' + "- Wow, that's big!" + '<br>');
  } else {
    document.write(
      pokemonList[i].name +
        ' ' +
        '(height:' +
        pokemonList[i].height +
        ')' +
        '<br>'
    );
  }
}
