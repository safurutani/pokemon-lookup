const defaultUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const errorBox = document.getElementById("error-msg");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let pokemonData = {};
//prevents user from clicking search if input is empty
searchInput.addEventListener("keyup", ()=> {
  if (searchInput.value == "" || searchInput.value == null)
    {
      searchButton.disabled = true;
    }
  else {
    if (e.key === "Enter") {
      const pokemon = formatNameForUrl(searchInput.value);
      lookUpPokemon(pokemon);
    }
    searchButton.disabled = false;
  }
});

searchButton.addEventListener("click", () => {
  const pokemon = formatNameForUrl(searchInput.value);
  lookUpPokemon(pokemon);
});

//after clicking search, fetches specific pokemon data and calls on function to display it
const lookUpPokemon = (pokemon) => {
  fetch(defaultUrl + pokemon)
    .then((response) => response.json())
    .then((data) => {
        errorBox.innerHTML = "";
        pokemonData = data;
        displayData(pokemonData);
      })
      
    .catch((err) => {
      console.error("Error fetching data:", err);
      errorBox.innerHTML = "Pokemon data not found";
    }
  );
};

//uses the api data to populate the html
const displayData = (pokemonData) => {
  let numTypes = 1;
  //name, id, height, weight data
  document.getElementById("pokemon-name").innerHTML = `${formatNameForDisplay(pokemonData.name)}`;
  document.getElementById("pokemon-id").innerHTML = `#${pokemonData.id}`;
  document.getElementById("height").innerHTML = `Height: ${pokemonData.height/10}m`;
  document.getElementById("weight").innerHTML = `Weight: ${pokemonData.weight/10}kg`;
  
  
  //sprite image
  const image = document.getElementById("sprite");
  image.src = pokemonData.sprites.front_default;

  //stats data
  const stats = document.getElementById("stats");
    stats.innerHTML = "";
    pokemonData.stats.forEach(stat => {
      const statName = stat.stat.name;
      const baseStat = stat.base_stat;
      stats.innerHTML += `<div id="${statName}">${baseStat}</div>`;
      
    });
  
  //type data
  const types = document.getElementById("types");
  types.innerHTML = "";
  pokemonData.types.forEach(type => {
    const typeName = type.type.name;
    types.innerHTML += `<h3 id="${typeName}-type" class="type">${typeName.toUpperCase()}</h3>`;
    colorTypes(typeName);
    //colors the background of stats container based on the pokemon's first type
    if (numTypes == 1) {
      var root = document.documentElement;
      var statColor = getComputedStyle(root).getPropertyValue(`--${typeName}`);
      document.getElementById("stats-container").style.backgroundColor = statColor;
    }
    numTypes++;
  });
};
  
  
//fix search input so the link will be valid when fetching
const formatNameForUrl = (pokemon) =>
{
  let formattedName = pokemon.toLowerCase().trim();
  formattedName = formattedName.replace(".","");
  formattedName = formattedName.replace(/\s/g,"-");
  return formattedName;
  
};

//replace dashes in pokemon name with spaces
const formatNameForDisplay = (pokemon) => {
  let formattedName = pokemon.toUpperCase();
  formattedName = formattedName.replace("-"," ");
  return formattedName;
}

//give type appropriate coloring
const colorTypes = (type) => {
  let typeBox = document.getElementById(type +"-type");
  let color = "";
  switch (type) {
    case "bug":
      color = "#94BC4A";
      break;
    case "dark":
      color = "#736C75";
      break;
    case "dragon":
      color = "#6A7BAF";
      break;
    case "electric":
      color = "#E5C531";
      break;
    case "fairy":
      color = "#E397D1";
      break;
    case "fighting":
      color = "#CB5F48";
      break;
    case "fire":
      color = "#EA7A3C";
      break;
    case "flying":
      color = "#7DA6DE";
      break;
    case "ghost":
      color = "#846AB6";
      break;
    case "grass":
      color = "#71C558";
      break;
    case "ground":
      color = "#CC9F4F";
      break;
    case "ice":
      color = "#70CBD4";
      break;
    case "normal":
      color = "#AAB09F";
      break;
    case "poison":
      color = "#B468B7";
      break;
    case "psychic":
      color = "#E5709B";
      break;
    case "rock":
      color = "#B2A061";
      break;
    case "steel":
      color = "#89A1B0";
      break;
    case "water":
      color = "#539AE2";
      break;
  }
  typeBox.style.backgroundColor = color;
}

//default card shown
lookUpPokemon("1");