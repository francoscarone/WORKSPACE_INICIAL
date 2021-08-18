var productosArray = [];

function showProductList(array){


    let productos = "";
    for(let i = 0; i < array.length; i++){
        let producto = array[i];
        
        productos += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.imgSrc}" alt=" ${producto.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${producto.name}</h4>
                        <small class="text-muted"> ${producto.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${producto.description}</p>
                    <br>
                    <br>
                    <div><p style="float:right;""class="mb-1">Precio: ${producto.currency} ${producto.cost} </p></div> 

                </div>
            </div>
        </div>
        `

        document.getElementById("product-list-contain").innerHTML = productos;

        hideSpinner();
    }   
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productosArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductList(productosArray);
        }
    });
});
