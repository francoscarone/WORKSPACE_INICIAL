
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
   var profile = googleUser.getBasicProfile();
    /*console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    The ID token you need to pass to your backend:
*/
    let usuario={};

    usuario.nombre=profile.getGivenName();
    usuario.imagen=profile.getImageUrl();
    usuario.estado="conectado";
    localStorage.setItem('usuario',JSON.stringify(usuario));
    location.href="inicio.html"

   /* var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    */
}


function comprobar(){
 
    let campoUser = document.getElementById("user");
    let campoPass = document.getElementById("password");
    let usuario = {};

    if (campoUser.value.trim()==='' || campoPass.value.trim()===''){
        alert("Debe completar los campos");
    }else{
        location.href="inicio.html"
        usuario.nombre = campoUser.value;
        usuario.estado ="conectado";
//---------->
        localStorage.setItem('usuario',JSON.stringify(usuario)); //Guardo mi variable de objeto en Local Storage
        sessionStorage.setItem('usuario',JSON.stringify(usuario));
    }

}

function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
    });

    localStorage.clear(); ///Borra toooodo el localStorage
    location.href="index.html"; //De donde esté, no importa dónde, me envía a index.html
}

function onload(){
    gapi.load('auth2',function(){
        gapi.auth2.init();
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', ()=>{
    
});

