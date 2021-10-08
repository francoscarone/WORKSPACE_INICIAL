carrito = {};
function showCarrito(lista){
    let tabla = ``;
    for(let i = 0; i < lista.articles.length; i++){
        let articulo = lista.articles[i];
        if(articulo.currency=="USD"){
            articulo.currency="UYU";
            articulo.unitCost=articulo.unitCost*40;
        }
        tabla +=`
        <div class="table-responsive-xl">
            <table class="table">
                <thead class="thead-dark">    
                    <tr>
                        <th class"col">${articulo.name}</th>
                        <th class"col">Cantidad</th>
                        <th class"col">Costo Unitario</th>
                        <th class"col">Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="${articulo.src}" class="rounded mx-auto d-block" style="width:30%"></td>
                        <td><input id="cantidad${i}"type="number" min=1 max=10 value=1 onchange="calSubtotal(${i},${articulo.unitCost});"></td>
                        <td>${articulo.currency} ${articulo.unitCost}</td>
                        <td id="subtotal${i}"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
    document.getElementById("articulos-container").innerHTML = tabla;
    }
    
}

function calSubtotal(indice,precio){
    cantidad=document.getElementById("cantidad"+indice).value;
    subtotal = precio * cantidad;
    document.getElementById("subtotal"+indice).innerHTML=subtotal;
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