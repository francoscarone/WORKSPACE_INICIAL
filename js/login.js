
function comprobar(){
 
    let campoUser = document.getElementById("user");
    let campoPass = document.getElementById("password");
    let usuario = {};

    if (campoUser.value.trim()==='' || campoPass.value.trim()===''){
        alert("Debe completar los campos");
    }else{
        location.href="inicio.html"
        usuario.nombre = campoUser.value;
        usuario.imagen = "img/userIcon.png"
        usuario.estado ="conectado";
//---------->
        localStorage.setItem('usuario',JSON.stringify(usuario)); //Guardo mi variable de objeto en Local Storage
        sessionStorage.setItem('usuario',JSON.stringify(usuario));
    }

}
  
function desconectar(){ 

    signOut(); //llamamos a la funcion signOut para cerrar sesion de google

    localStorage.clear(); ///Borra toooodo el localStorage
    location.href="index.html"; //De donde esté, no importa dónde, me envía a index.html
    
}





