const offres=[

{
id:1,
titre:"🎓 Bourse Mastercard Foundation",
pays:"Canada",
type:"Bourse",
description:"Programme de financement pour études supérieures.",
date:"30 Juin 2026",
url:"https://mastercardfdn.org/"
},

{
id:2,
titre:"💻 Stage Développement Logiciel",
pays:"Kenya",
type:"Stage",
description:"Programme d'expérience professionnelle.",
date:"15 Juillet 2026",
url:"https://careers.google.com/"
},

{
id:3,
titre:"🚀 Développeur Frontend",
pays:"Rwanda",
type:"Emploi",
description:"Poste junior orienté web.",
date:"Ouvert",
url:"https://www.linkedin.com/jobs/"
},

{
id:4,
titre:"🌍 Bourse Union Africaine",
pays:"Afrique du Sud",
type:"Bourse",
description:"Programme destiné aux étudiants africains.",
date:"Ouvert",
url:"https://au.int/en/bursaries"
}

];

let favoris=
JSON.parse(localStorage.getItem("favoris"))||[];

let historique=
JSON.parse(localStorage.getItem("historique"))||[];

let user=
JSON.parse(localStorage.getItem("user"))||null;

const app=document.getElementById("app");

app.innerHTML=`

<div class="container">

<header style="
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
gap:10px;
">

<div class="logo">🌍 AfriLink</div>

<div class="actions">

${
user
?
`👤 ${user.name}`
:
`<button class="btn" onclick="connexion()">Connexion</button>`
}

<button class="btn" onclick="accueil()">🏠</button>

<button class="btn" onclick="pageFavoris()">
❤️ ${favoris.length}
</button>

<button class="btn" onclick="voirHistorique()">
🔔
</button>

</div>

</header>

<input
id="search"
class="search"
placeholder="Rechercher..."
>

<div id="cards"></div>

</div>

`;

const cards=
document.getElementById(
"cards"
);

function enregistrer(action){

historique.unshift(action);

historique=
historique.slice(0,10);

localStorage.setItem(
"historique",
JSON.stringify(historique)
);

}

function afficher(list){

cards.innerHTML="";

list.forEach(item=>{

cards.innerHTML+=`

<div class="card">

<h2>${item.titre}</h2>

<p>🌍 ${item.pays}</p>

<p>🏷️ ${item.type}</p>

<p>${item.description}</p>

<p>📅 ${item.date}</p>

<div class="actions">

<button
class="btn"
onclick="ouvrir(${item.id})"
>

ℹ️

</button>

<button
class="btn"
onclick="partager(${item.id})"
>

🔗

</button>

<button
class="btn"
onclick="favori(${item.id})"
>

${
favoris.includes(item.id)
?
"❤️"
:
"🤍"
}

</button>

</div>

</div>

`;

});

}

function ouvrir(id){

const item=
offres.find(
x=>x.id===id
);

enregistrer(
`Consulté : ${item.titre}`
);

window.open(
item.url,
"_blank"
);

}

function partager(id){

const item=
offres.find(
x=>x.id===id
);

navigator.clipboard.writeText(
item.url
);

alert("Lien copié");

enregistrer(
`Partagé : ${item.titre}`
);

}

function favori(id){

if(
favoris.includes(id)
){

favoris=
favoris.filter(
x=>x!==id
);

}else{

favoris.push(id);

}

localStorage.setItem(
"favoris",
JSON.stringify(
favoris)
);

afficher(offres);

enregistrer(
"Favoris modifié"
);

}

function pageFavoris(){

afficher(

offres.filter(

x=>

favoris.includes(
x.id
)

)

);

}

function voirHistorique(){

cards.innerHTML=`

<div class="card">

<h2>

🔔 Historique

</h2>

<br>

${
historique.length

?

historique
.map(
x=>`<p>${x}</p>`
)
.join("")

:

"Aucune activité"

}

</div>

`;

}

function accueil(){

afficher(
offres
);

}

function connexion(){

const nom=
prompt(
"Ton nom"
);

if(!nom)
return;

localStorage.setItem(
"user",
JSON.stringify({
name:nom
})
);

location.reload();

}

document
.getElementById(
"search"
)

.addEventListener(

"input",

e=>{

const t=
e.target.value
.toLowerCase();

afficher(

offres.filter(

x=>

x.titre
.toLowerCase()
.includes(t)

||

x.pays
.toLowerCase()
.includes(t)

)

);

}

);

window.accueil=
accueil;

window.pageFavoris=
pageFavoris;

window.ouvrir=
ouvrir;

window.partager=
partager;

window.favori=
favori;

window.voirHistorique=
voirHistorique;

window.connexion=
connexion;

afficher(
offres
);