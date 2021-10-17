carrito = {};

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
                    <span class="d-block font-weight-bold"><input id="cantidad${i}"type="number" min=0 max=10 value=0 onchange="calSubtotal(${i},${articulo.unitCost});"></span>
                  </div>
                  <div class="ml-2">
                    <span class="font-weight-bold d-block">Precio Unitario</span>
                    <span class="d-block font-weight-bold">${articulo.currency}&nbsp;${articulo.unitCost}</span>
                  </div>
                  <div class="ml-2">
                    <span class="font-weight-bold d-block">Sub total</span>
                    <div class="d-flex justify-content-between information">
                      <span>USD </span><span class="d-block font-weight-bold" id="subtotal${i}">${0}</span>
                    </div>
                   </div>
                
              </div>
            </div>
    `
    document.getElementById("articles-cart").innerHTML = tabla;
    document.getElementById("cant-prod-cart").innerText = "Hay "+lista.articles.length+" articulos en su carrito";
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
  let costoEnvio=0

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

function comprar(){
  Swal.fire({
    position: 'middle',
    html: '<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_4eth4jy9.json"  background="transparent"  speed="1"  style="width: 450px; height: 450px;"    autoplay></lottie-player>',
    title: 'Compra realizada, Gracias!',
    showConfirmButton: false,
    timer: 3000
  })
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
        }
    });
});