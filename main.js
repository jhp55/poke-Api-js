//variables
const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn");
let query ="";

//funcion que consulta la api 
async function fetchPokemonData(pokemonId) {
    let endpoint=`https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response =await fetch(endpoint);
    const pokemon = await response.json();
    return pokemon
}

//funcion que muestra la info del pokemon 
function displayPokemon(pokemon){
    console.log(pokemon)

    const pokemonCard = document.createElement("div");//creando elemento
    pokemonCard.classList.add("pokemonCard");//agregando una clase 
    //bloque de codigo que me busca los tipos
    let pokemonTypes = ""
    for(let i=0;i<pokemon.types.length;i++){
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name+" "
    }

    let pokemonAbilities = ""
    for(let i=0;i<pokemon.abilities.length;i++){
        pokemonAbilities = pokemonAbilities + pokemon.abilities[i].ability.name+" "
    }

    //creamos el contenido de la tarjeta 
    pokemonCard.innerHTML=`
    <h2 class="name">${pokemon.name}</h2>
    <h3 class="idNumber">${pokemon.id}</h3>
    <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
    <h5 class="experience">${pokemon.base_experience}</h5>
    <!--<h3 class="subTitle" >Tipos de pokemon</h3>
    <p class="tipoPokemon">${pokemonTypes}</p>
    <h3 class="subTitle">Habilidades de pokemon</h3>
    <p class="habilidadesPokemon">${pokemonAbilities}</p>-->
    `

    pokemonCard.addEventListener("click",()=>{
        console.log("click");
        showPokemonDetail(pokemon)
    });

    pokemonList.appendChild(pokemonCard)
}

function showPokemonDetail(pokemon){
    pokemonList.style.display="none";
    console.log(pokemonDetail)
    pokemonDetail.style.display="block";
    
    let pokemonTypes = ""
    for(let i=0;i<pokemon.types.length;i++){
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name+" "
    }
    let pokemonAbilities = ""
    for(let i=0;i<pokemon.abilities.length;i++){
        pokemonAbilities = pokemonAbilities + pokemon.abilities[i].ability.name+" "
    }

    pokemonInfo.innerHTML=`
    <h2 class="name">${pokemon.name}</h2>
    <h3 class="idNumber">${pokemon.id}</h3>
    <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
    <h5 class="experience">${pokemon.base_experience}</h5>
    <h3 class="subTitle" >Tipos de pokemon</h3>
    <p class="tipoPokemon">${pokemonTypes}</p>
    <h3 class="subTitle">Habilidades de pokemon</h3>
    <p class="habilidadesPokemon">${pokemonAbilities}</p>
    `
}


backBtn.addEventListener("click",()=>{
    pokemonDetail.style.display="none";
    pokemonList.style.display="block";
})

searchInput.addEventListener("input",(e)=>{
    query = e.target.value;
    //console.log(n)
});

async function searchPokemon() {
    try {
        const pokomon = await fetchPokemonData(query);
        showPokemonDetail(pokomon)
    } catch (error) {
        alert("Pokemon no encontrado, intentalo de nuevo con otro nombre o id")
    }
}

searchBtn.addEventListener("click",()=>searchPokemon())

async function loadPokedex() {
    for(let i = 1; i<=5;i++){
    const pokemon = await fetchPokemonData(i)
    displayPokemon(pokemon)
    }
}
loadPokedex()