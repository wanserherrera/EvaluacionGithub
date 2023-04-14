//que es una API? -- (Aplication progtamming interface)
// data--  json
//api no devuelve iformacion

//en js esiste una funciona la cual se ecmarga de poder hacer la peticion a una url
//FECTH()
//es una funcion  nativa
// existen vario tipos de peticiones
// GET = SIRVE PARA OBTENER INFO
//POST = SIRVE PARA CREAR DATOS
//PUT = SIRVE PARA ACTUALIZAR DATOS
//DELETE= SIRVE PARA ELIMIANR DATOS

//  funciotn async
//las funciones async fueron creadas para poder ejecutar algo-- ye en caso de la ejecucion de esto
//demore .. mas de lo normal se espera para luego respodner la peticion --

//https://api.github.com/users/guillermosifu
//hay un tiempo de espera , no sabemos cuanto dmorara - entonces usamo el async await..

//la estructura de una funciones fecth()

//priemro atrapamos todos los elemtnos que usaremos con el id 

const imageProfile = document.querySelector("#img-profile")
const githubName = document.querySelector("#github-name")
const githubUsername = document.querySelector("#github-username")
const githubJoined = document.querySelector("#github-joined")
const githubRepos = document.querySelector("#github-repos")
const githubFollowers = document.querySelector("#github-followers")
const githubFollowing = document.querySelector("#github-following")
const githubCompany = document.querySelector("#github-company")
const githubBlog = document.querySelector("#github-blog")
const githubBio = document.querySelector("#github-bio")
//action

const githubActionSearch = document.querySelector("#github-action-search")
const githubInputSearch = document.querySelector("#github-search")


//evento onclick del bton

githubActionSearch.onclick=()=>{
    const username = githubInputSearch.value;

    githubInputSearch.value="";
    if(username === ""){
        Swal.fire({
            title:"Error",
            text:"Debes llenar el usuario",
            icon:"error"
        });
        return;
    }
      obtenerDatosGithub(username)

}




//vamos detectar el evento de enter cuano este en el input(este es otro evento - keyup)

githubInputSearch.addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        obtenerDatosGithub(event.target.value)
    }

});


//es la funcion fecth que consume el Api


const obtenerDatosGithub = async (username="wanserherrera") => {
  // ene ste ejemplio await esta haciendo lo sgte
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  if(data.message==='Not Found' ){
    Swal.fire({
        title: "Error de ejecusion",
        text: "El usuario ingresado no existe",
        icon: "error"
    });

    return;
  }else{
    if(username!="wanserherrera"){
      Swal.fire({
        title: "Operacion exitosa",
        text: "Usuario existe",
        icon: "success"
    })
    }
    

  }

  

  setDataUser(data)
};







const formatoFecha=(date)=>{
    const aux= date.split('T')[0];
    const [year, month, day]= aux.split('-');
    return ` se unio ${day}/${month}/${year}`
  
  }




//es una funcion que alamacena los datos a cambiar 

const setDataUser =(data)=>{
    imageProfile.src= data.avatar_url;
    githubName.innerHTML =data.name;
    githubUsername.innerHTML=`@${data.login}`;
    githubFollowers.innerHTML =data.followers;
    githubFollowing.innerHTML =data.following;
    githubJoined.innerHTML =formatoFecha(data.created_at);
    githubCompany.innerHTML =data.company;
    githubBlog.innerHTML =data.blog;
    githubBio.innerHTML =data.bio;
}




obtenerDatosGithub();