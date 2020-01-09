/////////////////////////////////////////////////////// CODE EVAN

function clignotement() {
    setTimeout(allume_pressed, 0);
    setTimeout(allume_unpressed, 2000);

    setTimeout(turnon_big_blue_light, 0);
    setTimeout(turnoff_big_blue_light, 400);
    setTimeout(turnon_big_blue_light, 800);
    setTimeout(turnoff_big_blue_light, 1200);
    setTimeout(turnon_big_blue_light, 1600);
    setTimeout(turnoff_big_blue_light, 2000);

    setTimeout(turnoff_small1, 0);
    setTimeout(turnon_small1, 400);
    setTimeout(turnoff_small1, 800);
    setTimeout(turnon_small1, 1200);
    setTimeout(turnoff_small1, 1600);
    setTimeout(turnon_small1, 2000);

    setTimeout(turnon_small2, 0);
    setTimeout(turnoff_small2, 400);
    setTimeout(turnon_small2, 800);
    setTimeout(turnoff_small2, 1200);
    setTimeout(turnon_small2, 1600);
    setTimeout(turnoff_small2, 2000);

    setTimeout(turnoff_small3, 0);
    setTimeout(turnon_small3, 400);
    setTimeout(turnoff_small3, 800);
    setTimeout(turnon_small3, 1200);
    setTimeout(turnoff_small3, 1600);
    setTimeout(turnon_small3, 2000);
}
var bleu_off = '#00DBFF';
var bleu_on = '#b4f5ff';

function turnon_big_blue_light(){
    document.getElementById('rond_bleu').style.background = bleu_on;
    document.getElementById('rond_bleu').style.transition = 'ease 0.4s';
    document.getElementById('bleu_clair').style.background = 'rgb(254, 255, 255)'; 
    document.getElementById('bleu_clair').style.transition = 'ease 0.4s';
}
function turnoff_big_blue_light(){
    document.getElementById('rond_bleu').style.background = bleu_off;
    document.getElementById('rond_bleu').style.transition = 'ease 0.4s';
    document.getElementById('bleu_clair').style.background = 'rgb(165, 240, 252);'; 
    document.getElementById('bleu_clair').style.transition = 'ease 0.4s';
}

var rouge_off = 'rgb(201, 12, 62)';
var rouge_on = '#FD1452';

function turnon_small1(){
    document.getElementById('rond1').style.background = rouge_on;
    document.getElementById('rond1').style.transition = 'ease 0.4s';
}
function turnoff_small1(){
    document.getElementById('rond1').style.background = rouge_off;
    document.getElementById('rond1').style.transition = 'ease 0.4s';
}

var jaune_off = '#c5bd49';
var jaune_on = '#f9ef5f';

function turnon_small2(){
    document.getElementById('rond2').style.background = jaune_on;
    document.getElementById('rond2').style.transition = 'ease 0.4s';
}
function turnoff_small2(){
    document.getElementById('rond2').style.background = jaune_off;
    document.getElementById('rond2').style.transition = 'ease 0.4s';
}

var vert_off = '#1dca42';
var vert_on = '#2dfc59';

function turnon_small3(){
    document.getElementById('rond3').style.background = vert_on;
    document.getElementById('rond3').style.transition = 'ease 0.4s';
}
function turnoff_small3(){
    document.getElementById('rond3').style.background = vert_off;
    document.getElementById('rond3').style.transition = 'ease 0.4s';
}



function allume_unpressed(){
    document.getElementById('bouton_rouge').style.background = '#fd1a55';
    document.getElementById('bouton_rouge').style.transition = 'ease 0.2s';         
}

function allume_pressed(){
    document.getElementById('bouton_rouge').style.background = '#ca215b';
    document.getElementById('bouton_rouge').style.transition = 'ease 0.2s';         
}



/////////////////////////////////////////////////////// CODE BAPT


const apiData = {
    url: 'https://pokeapi.co/api/v2/',
    type: 'pokemon',
}

const {url, type} = apiData
const apiUrl = `${url}${type}`  //apiUrl stocke l'url de l'api quii liste les pokemon

var saisie = document.getElementById("input");
saisie.addEventListener("keyup",function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("bouton_rouge").click();
    }
});

function acq(){ 
    var pokerech = document.getElementById("input").value;  //On récupère le nom de pokémon recherché par l'utilisateur
    pokerech=pokerech.toLowerCase() //Tous les noms des pokemons sont en minuscules dans l'api. On transforme l'entrée en lettres minuscules pour la correspondance
    return(pokerech);
}

//recherche a pour but de récupérer les données d'un pokémon, et comparer son nom avec une entrée saisie par un utilisateur
//On met i en paramètre de recherche pour pouvoir parcourir les bases de données de chaque pokemon, qui contient leur nom
function recherche(i){
    var pokerech=acq()  //Acquisition de la donnée entrée par l'utilisateur
    let pokemon = apiUrl + "/" + i + "/";   //pokemon stocke l'url de la base de donnée du pokemon numéro i
    fetch(pokemon)  //On récupère les données du pokémon numéro i
            .then((data) => data.json() ) 
            .then((poke) => generateHTML(poke,pokerech))    //ces données sont envoyées à la fonction generateHTML
}

const generateHTML = (poke,input) => {  //generateHTML prend deux arguments, les données d'un pokemon, et une entrée saisie par l'utilisateur
    var nom = poke.name
    var imgInfosDiv = document.querySelector('.image-infos')   //On récupère la carte pour changer le fond
    var infosBasDroiteDiv = document.querySelector('.infos-droite')
    var infosBasGaucheDiv = document.querySelector('.infos-gauche')
    var childimginfo = imgInfosDiv.lastElementChild
    while(childimginfo){
        imgInfosDiv.removeChild(childimginfo)
        childimginfo = imgInfosDiv.lastElementChild
    }
    var childdroite = infosBasDroiteDiv.lastElementChild
    while(childdroite){
        infosBasDroiteDiv.removeChild(childdroite)
        childdroite = infosBasDroiteDiv.lastElementChild
    }
    var childgauche = infosBasGaucheDiv.lastElementChild
    while(childgauche){
        infosBasGaucheDiv.removeChild(childgauche)
        childgauche = infosBasGaucheDiv.lastElementChild
    }
    if(nom===input){    //on compare l'entrée saisie par l'utilisateur et le nom récupéré dans la base de donnée du pokemon i
//Si l'utilisateur a saisi le nom du pokemon i
        var k=0
        if(poke.types.length===2){
            k=1
        }
        changement_fond(poke,imgInfosDiv,infosBasGaucheDiv,infosBasDroiteDiv,k)   //on met des fonds adéquat
    //et on rajoute des lignes de HTML pour donner les informations du pokemon
        var img_infos_1 = `
            <img src=${poke.sprites.front_default}>
            <div class="nom-infos marge-gauche">   
                <div class="id-name">
                    <span>#${poke.id}</span>
                    <span class="nom_du_pokemon">${poke.name}</span>
                </div> 
                <div class="type">
            `  
        if(k===0) {
            var img_infos_2 = `
                    <span>${poke.types[0].type.name}</span>
            `
        }
        else if(k===1){
            var img_infos_2 = `
                    <span>${poke.types[1].type.name}</span>
                    <span>${poke.types[0].type.name}</span>
            `
        }

        var img_infos_3 = `
                    <span class="no-border">HP: ${poke.stats[5].base_stat}</span>
                </div>
                <div class="poids-taille"> 
                    <span>Weight: ${poke.weight}</span>   
                    <span>Height: ${poke.height}</span>
                </div>
            </div>         
            `
        var nbab=poke.abilities.length
        const  infos_bas_gauche =`
                <div class="colonne-gauche">
                    <p>Statistiques :</p>
                    <span>HP: ${poke.stats[5].base_stat}</span> 
                    <span>Defense: ${poke.stats[3].base_stat}</span> 
                    <span>Special defense: ${poke.stats[1].base_stat}</span> 
                 </div>
                <div class="colonne-droite">
                    <span>Attack: ${poke.stats[4].base_stat}</span>  
                    <span>Special attack: ${poke.stats[2].base_stat}</span>
                    <span>Speed: ${poke.stats[0].base_stat}</span>
                </div>
            `
        const infos_bas_droite_1 =`    
                <p>Abilities</p>
            `
        if(nbab===1) {
            infos_bas_droite_2=`
                <span>${poke.abilities[0].ability.name}</span>
            `
        }
        if(nbab===2) {
            infos_bas_droite_2=`
                <span>${poke.abilities[1].ability.name}</span>
            `
        }
        if(nbab===3) {
            infos_bas_droite_2=`
                <span>${poke.abilities[1].ability.name}</span> 
                <span>${poke.abilities[2].ability.name}</span>
            `
        }
        const img_infos = img_infos_1 + img_infos_2 + img_infos_3
        const infos_bas_droite = infos_bas_droite_1 + infos_bas_droite_2
        imgInfosDiv.innerHTML = img_infos
        infosBasGaucheDiv.innerHTML = infos_bas_gauche
        infosBasDroiteDiv.innerHTML = infos_bas_droite      //A l'aide de innerHTML on insère ces lignes dans le site
    }
    else{
//Sinon, deux cas de figure
        if(poke.id<152) {
        //Si on a pas encore parcourut les 151 premiers pokemons, on recommence la recherche avec le pokemon suivant
            return(recherche((poke.id+1)))
        }
        else { 
        //Si on a parcourut tous les pokemons, l'entrée saisie ne correspond à aucun pokemon, on affiche un message d'erreur
            document.getElementById("body").style.background = 'url(style/img/default_fond.png) repeat 0 0';  //On met un fond par défault
            const html = `
            <div class="message-erreur">
                <img src="style/img/point-interrogation.png">
                <span>Désolé, aucun pokémon ne s'appelle ${input}</span>
            </div>
        `
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, grey)';
            imgInfosDiv.innerHTML = html
            infosBasDroiteDiv.style.background = 'rgb(255,255,255,0)'
            infosBasGaucheDiv.style.background = 'rgb(255,255,255,0)'
        }
    }
}

function changement_fond(poke,imgInfosDiv,infosBasGaucheDiv,infosBasDroiteDiv,k){     //On veut mettre un fond en fonction du type du pokemon donné en argument
    //Certains pokemon ont deux types, et lorsque c'est le cas, leur type principal est en second dans la liste des types
    //On initialise donc un k qui est égal à 0 si le pokemon a un type et 1 si le pokemon en a deux
    var type_pokemon=poke.types[k].type.name    //On récupère alors le type du pokemon entré en argument
    console.log(infosBasGaucheDiv)
    console.log(infosBasDroiteDiv)
    console.log(imgInfosDiv)
    switch(type_pokemon) { //Puis on vérifie lequel c'est, pour mettre le fond correspondant
        case 'fire':
            document.getElementById("body").style.background = 'url(style/img/fond1.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(230,116,64))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(230,116,64, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(230,116,64, 0.2)';
            break;
        case 'water':
            document.getElementById("body").style.background = 'url(style/img/fond2.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(40,149,221))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(40,149,221, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(40,149,221, 0.2)';
            break;
        case 'electric':
            document.getElementById("body").style.background = 'url(style/img/fond1.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(235,214,96))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(235,214,96, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(235,214,96, 0.2)';
            break;
        case 'grass':
            document.getElementById("body").style.background = 'url(style/img/fond6.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(55,156,55))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(55,156,55, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(55,156,55, 0.2)';
            break;
        case 'ice':
            document.getElementById("body").style.background = 'url(style/img/fond2.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(85,198,233))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(85,198,233, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(85,198,233, 0.2)';
            break;
        case 'fighting':
            document.getElementById("body").style.background = 'url(style/img/fond3.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(189,96,84))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(189,96,84, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(189,96,84, 0.2)';
            break;
        case 'poison':
            document.getElementById("body").style.background = 'url(style/img/fond4.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(145,86,194))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(145,86,194, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(145,86,194, 0.2)';
            break;
        case 'ground':
            document.getElementById("body").style.background = 'url(style/img/fond5.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(182,126,74))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(182,126,74, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(182,126,74, 0.2)';
            break;
        case 'flying':
            document.getElementById("body").style.background = 'url(style/img/fond7.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(132,174,175))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(132,174,175, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(132,174,175, 0.2)';
            break;
        case 'psychic':
            document.getElementById("body").style.background = 'url(style/img/fond4.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(209,90,203))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(209,90,203, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(209,90,203, 0.2)';
            break;
        case 'bug':
            document.getElementById("body").style.background = 'url(style/img/fond6.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(90,223,90))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(90,223,90, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(90,223,90, 0.2)';
            break;
        case 'rock':
            document.getElementById("body").style.background = 'url(style/img/fond5.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(175,92,60))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(175,92,60, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(175,92,60, 0.2)';
            break;
        case 'ghost':
            document.getElementById("body").style.background = 'url(style/img/fond8.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(69,50,82))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(69,50,82, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(69,50,82, 0.2)';
            break;
        case 'dragon':
            document.getElementById("body").style.background = 'url(style/img/fond7.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(157,107,223))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(157,107,223, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(157,107,223, 0.2)';
            break;
        case 'fairy':
            document.getElementById("body").style.background = 'url(style/img/fond8.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(243,114,185))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(243,114,185, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(243,114,185, 0.2)';
            break;
        default :
            document.getElementById("body").style.background = 'url(style/img/fond3.png) repeat 0 0';
            imgInfosDiv.style.background = 'linear-gradient(to right, transparent 15%, rgb(156,146,146))';   //On change la couleur de la carte sur laquelle le pokémon est affiché
            infosBasGaucheDiv.style.background = 'rgb(156,146,146, 0.2)';
            infosBasDroiteDiv.style.background = 'rgb(156,146,146, 0.2)';
    }
}

//////////////////////////////////////////////////////////////////////////////CHANGER TOUS LES CODES COULEURS

function previsualisation(){
    const pokeballDiv = document.getElementById("pokeball")
    var child = pokeballDiv.lastElementChild
    while(child){
        pokeballDiv.removeChild(child)
        child = pokeballDiv.lastElementChild
    }
    html_ball=createur_pokeball()
    pokeballDiv.innerHTML= html_ball;
}

function createur_pokeball(){   
    var formulaire=document.getElementById("create-pokeball")  
    var color=change_color(formulaire)    
    var html_ball=change_ball(formulaire,color)
    return(html_ball)
}

function change_ball(formulaire,color){
    var i=formulaire.type.selectedIndex     //On récupère l'index de la nall sélectionnée par l'utilisateur
    var html    //Dans une variable html on stocke les ajouts nécessaires à la modification graphique de la ball
    if(i===0){  //La pokeball
        html=`
            <div style="background : ${color}; height:50px;" class="haut_pb">
                <div id="hautpb_1"></div>
            </div>
            <div id="baspb"></div>
            <div id="cerclepb"></div>
            <div id="barrepb"></div>
            <div id="centrepb"></div>
        `
    }
    else if(i===1){     //La superball
        console.log(color)
        html=`
            <div style="background : ${color}; height:50px;" class="haut_pb">
                <div id="hautpb_4a"></div>
                <div id="hautpb_4b"></div>
            </div>
            <div id="baspb"></div>
            <div id="cerclepb"></div>
            <div id="barrepb"></div>
            <div id="centrepb"></div>
        `
    }
    else if (i===2){    //L'hyperball
        html=`
            <div style="background : ${color}; height:50px;" class="haut_pb">
                <div id="hautpb_2"></div>
            </div>
            <div id="baspb"></div>
            <div id="cerclepb"></div>
            <div id="barrepb"></div>
            <div id="centrepb"></div>
        `
    }
    else{       //La master ball
        html=`
            <div style="background : ${color}; height:50px;" class="haut_pb">
                <div id="hautpb_3a"></div>
                <div id="hautpb_3b"></div>
            </div>
            <div id="baspb"></div>
            <div id="cerclepb"></div>
            <div id="barrepb"></div>
            <div id="centrepb"></div>
        `
    }
    return(html)    //On retourne le code HTML qui correspond à la ball choisie
}

function change_color(formulaire){
    var i=formulaire.color.selectedIndex    //On récupère l'index de la couleur sélectionnée par l'utilisateur
    var color=formulaire.color[i].value     //On récupère les données en value de l'option sélectionnée dans le html : une couleur
    return(color);     //On applique cette couleur à la pokeball créée
}

var pokeballs=[] 

function sauver_pokeball(){
    var html_def_ball=createur_pokeball()
    pokeballs.push(html_def_ball) 
    var i=pokeballs.length
    if(i<=6){  
        var troupourpokeball = document.getElementById(`pb_${i}`)
        troupourpokeball.style.display = 'none';
        const pokeballDefinitiveDiv = document.getElementById(`def_${i}`)
        pokeballDefinitiveDiv.innerHTML = html_def_ball;
    }
    else{
        var erreur = `
            <div class="error_pokeball">
                <span>Il n'y a plus de place !</span>
            </div>
        `
        var errorDiv=document.querySelector('.trop_de_balls') //RAJOUTER CLASSE "nav" A LA BALISE NAV
        errorDiv.innerHTML=erreur
    }
}

function effacer_pokeballs(){
    for(i=1;i<7;i++){
        var trou = `
            <div id="pb_${i}" class="ombre_emplacement_pokeball"></div>
        `
        var place=document.getElementById(`def_${i}`)
        var child = place.lastElementChild
        while(child){
            place.removeChild(child)
            child = place.lastElementChild
        }
        place.innerHTML = trou
    }
    pokeballs=[]
}