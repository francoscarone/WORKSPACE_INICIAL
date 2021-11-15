carrito = {};
camposDePago=[];
function showCarrito(lista){
    let tabla = ``;
    for(let i = 0; i < lista.articles.length; i++){
        let articulo = lista.articles[i];

        // convierto el precio a dolares
        if(articulo.currency=="UYU"){
            articulo.currency="USD";
            articulo.unitCost=articulo.unitCost/40;
        }
        tabla +=`

        <div
              class="
                d-flex
                justify-content-between
                align-items-center
                mt-3
                p-2
                items
                rounded
              "
            >
              <div class="d-flex flex-row">
                <img
                  class="rounded"
                  src="${articulo.src}"
                  width="120"
                  height="105"
                />
                <div class="d-flex flex-row align-items-center">
                <div class="ml-2">
                  <span class="font-weight-bold d-block">${articulo.name}</span>
                </div>
            </div>
              </div>
              <div class="d-flex justify-content-between information">
              
                <div class="ml-2">
                    <span class="font-weight-bold d-block">Cantidad</span>
                    <span class="d-block font-weight-bold"><input id="cantidad${i}" type="number" min=0 max=10 value=${articulo.count} onchange="calSubtotal(${i},${articulo.unitCost});"></span>
                  </div>
                  <div class="ml-2">
                    <span class="font-weight-bold d-block">Precio Unitario</span>
                    <span class="d-block font-weight-bold">${articulo.currency}&nbsp;${articulo.unitCost}</span>
                  </div>
                  <div class="ml-2">
                    <span class="font-weight-bold d-block">Sub total</span>
                    <div class="d-flex justify-content-between information">
                      <span>USD </span><span class="d-block font-weight-bold" id="subtotal${i}">${articulo.count * articulo.unitCost}</span><i onclick="eliminar(${i});" class="fas fa-trash-alt delete"></i>
                    </div>
                   </div>
                
              </div>
            </div>
    `
    document.getElementById("articles-cart").innerHTML = tabla;
    document.getElementById("cant-prod-cart").innerText = "Hay "+lista.articles.length+" articulos en su carrito";
    }
    
}
function eliminar(i){

carrito.articles.splice(i, 1);
if (carrito.articles.length>=1){
  showCarrito(carrito);
  calcCostoEnvio()
}else{
  document.getElementById("articles-cart").innerHTML = `<h3>No hay articulos en su carrito</h3>`
  document.getElementById("cant-prod-cart").innerText = "Hay 0 articulos en su carrito";
  calcCostoEnvio()
}
}


function calSubtotal(indice,precio){   

  // CAMBIAR EL VALOR DEL SUBTOTAL AL SUMAR O RESTAR UNIDADES
    cantidad=document.getElementById("cantidad"+indice).value;
    
    subtotal = precio * cantidad;
    document.getElementById("subtotal"+indice).innerHTML= subtotal;

    calcCostoEnvio()
   
}

function calcCostoEnvio(){

  // declaro variables para totales y costo de envio
  let total_Final=0;
  let subTotal_Final=0;
  let costoEnvio=0;

  // recorro el array de articulos y extraigo su subtotal con respecto a la cantidad
  for (let index = 0; index < carrito.articles.length; index++) {
    subTotal_Final += parseFloat(document.getElementById("subtotal"+index).innerHTML)  
  }

  // calculo el subtotal final y lo agrego a la pagina
  document.getElementById("subTotal-final").innerText ="USD "+ subTotal_Final.toFixed(2)

  // almaceno los tipos de envio en un array
  let envio = document.getElementsByName("card");

  // analizo el estado de los radio, si estan checkeados aplico el importe seleccionado
    if(envio[0].checked){
      costoEnvio=(subTotal_Final*0.15).toFixed(2)
      document.getElementById("costo-envio").innerText="USD "+ costoEnvio
    }
    if(envio[1].checked){
      costoEnvio = (subTotal_Final*0.07).toFixed(2)
      document.getElementById("costo-envio").innerText="USD "+ costoEnvio
    }if(envio[2].checked){
      costoEnvio = (subTotal_Final*0.05).toFixed(2)
      document.getElementById("costo-envio").innerText="USD "+ costoEnvio
    }

    // calculo el total final tomando el subtotal + el costo de envio
    total_Final = (parseFloat(subTotal_Final)+parseFloat(costoEnvio)).toFixed(2);
    document.getElementById("total-cost").innerText="USD "+ total_Final;
}

// comprobamos que todos los campos esten completos
// si estan completos, mostramos una animacion
function comprar(){
  let radios = document.getElementsByName("formaPago")
  let campos = document.querySelectorAll('input[type=text]');
  let contador = 0;
  guardarFormaPago()

  if(radios[0].checked==false && radios[1].checked==false){
    alert("Seleccione una forma de pago")
    contador+=1;
  }
  if(contador>0){
  alert("Complete los campos de forma de pago")
  }
  for (let campo of campos) {
    
    if(campo.value.trim()===''){
      contador+=1;
      campo.className="form-control is-invalid";
      campo.placeholder="Debe completar este campo";
    }else{
      campo.className="form-control is-valid"
    }
  }
  if (contador===0){
    Swal.fire({
      position: 'middle',
      html: '<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_4eth4jy9.json"  background="transparent"  speed="1"  style="width: 450px; height: 450px;"    autoplay></lottie-player>',
      title: 'Compra realizada, Gracias!',
      showConfirmButton: false,
      timer: 3000
    })
  }
    
} 

// generamos la ventana modal para cada fomra de pago
function formaPago(){
// habilito y deshabilito campos en funcion del pago seleccionado
  let radios = document.getElementsByName("formaPago")
  if(radios[0].checked){
    document.getElementById("numCuenta").disabled=true
    document.getElementById("nombApell2").disabled=true
    document.getElementById("numTarjeta").value=""
    document.getElementById("nombApell").value=""
    document.getElementById("fechaExp").value=""
    document.getElementById("cedula").value=""
    document.getElementById("codSeg").value=""
    document.getElementById("numTarjeta").disabled=false
    document.getElementById("nombApell").disabled=false
    document.getElementById("fechaExp").disabled=false
    document.getElementById("cedula").disabled=false
    document.getElementById("codSeg").disabled=false
    document.getElementById("numCuenta").value="deshabilitado"
    document.getElementById("nombApell2").value="deshabilitado"
   
  }
  if(radios[1].checked){
    document.getElementById("numCuenta").value=""
    document.getElementById("nombApell2").value=""
    document.getElementById("numTarjeta").disabled=true
    document.getElementById("nombApell").disabled=true
    document.getElementById("fechaExp").disabled=true
    document.getElementById("codSeg").disabled=true
    document.getElementById("cedula").disabled=true
    document.getElementById("numTarjeta").value="deshabilitado"
    document.getElementById("nombApell").value="deshabilitado"
    document.getElementById("fechaExp").value='0001-01-01'
    document.getElementById("codSeg").value="deshabilitado"
    document.getElementById("cedula").value="deshabilitado"
    document.getElementById("numCuenta").disabled=false
    document.getElementById("nombApell2").disabled=false
  }
}

// validamos la forma de pago

function guardarFormaPago(){
 

  // comprobamos si hay campos vacios, si los hay, 
  // aumentamos el contador y resaltamos los campos que deban rellenarse
  camposDePago = document.getElementsByName("camposPago");
  let contador=0;
  for(i=0 ; i < camposDePago.length ; i++){
  if(camposDePago[i].value.trim()===''){
    camposDePago[i].className="form-control is-invalid";
    camposDePago[i].placeholder="Debe completar este campo";
    contador+=1;
  }else{
    camposDePago[i].className="form-control is-valid"
  }
  }  

  // condicion para cerrar el modal o lanzar alerta de que hay campos vacios
  if(contador===0){
    $('#formaPagoModal').modal("hide");
  }else{
    alert("Debe rellenar los campos de forma de pago")
  }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_JAP_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carrito = resultObj.data;
            //Muestro los comentarios
            showCarrito(carrito);
            calcCostoEnvio();
        }
    });
});