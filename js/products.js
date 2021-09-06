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
                        <small class="text-muted">${producto.soldCount} artículos</small>
                    </div>
                    <p class="mb-1 text-left">${producto.description}</p>
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


function ordenarPrecio (){

    productosArray.sort((a,b)=>{ 
        return a.cost - b.cost
    });
    showProductList(productosArray);
}


function ordenarInverso (){
    productosArray.sort();
    productosArray.reverse();
    showProductList(productosArray);
};

function ordenarRelevancia (){

        productosArray.sort((a,b)=>{ 
            return b.soldCount - a.soldCount
    });
    showProductList(productosArray);
}


function filtrar(){    
    let min = parseInt(document.getElementById("valMin").value);
    let max = parseInt(document.getElementById("valMax").value);
    let rangoArray=[];
    for (let producto of productosArray) {
        if( producto.cost>= min && producto.cost <= max){
            rangoArray.push(producto);
        }else{
            document.getElementById("product-list-contain").innerHTML=`<blockquote class="blockquote text-center">
            <p class="mb-0">No hay productos en el rango de precios asignado.</p>
            <footer class="blockquote-footer">Intente con rangos entre 12000 y 16000</footer>
          </blockquote>`
        }
    }
    showProductList(rangoArray);
}

function buscar(){
    let peticion = document.getElementById("buscar").value;
    let buscados = productosArray.filter( producto => {
        return producto.name.toLowerCase().indexOf(peticion.toLowerCase())>-1;
    })
        
    showProductList(buscados);
}

 document.getElementById("buscar").addEventListener('keyup',()=>{
    buscar();
});
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
