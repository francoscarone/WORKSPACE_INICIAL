//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', ()=>{
    
    let usuario = JSON.parse( localStorage.getItem("usuario"));
if (usuario == null){
      location.href="index.html";
}
    document.getElementById('userLog').innerHTML = `<img src=${usuario.imagen} height=30px style="border-radius: 100px;"> ${usuario.username}`
});
