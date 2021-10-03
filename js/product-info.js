let productInfo = [];
let comentarios = [];
let relacionados = [];

// muestra la informacion de un producto
function showProductInfo(lista){
        let productos = `
    <hr>
    <div class="container-fluid" bis_skin_checked="1">
	    <div class="row" bis_skin_checked="1">
		    <div class="col-md-5" bis_skin_checked="1">
			    <img class="img-thumbnail" alt="${lista.description}" src="${lista.images[0]}">
		    </div>
		    <div class="col-md-7" bis_skin_checked="1">
                <div class="text-center">
                    <h3 class="mb-1">${lista.name}</h3>
                </div>
			    <div class="col">                  
                    <p class="mb-1 text-left h5">${lista.description}</p>
                    <br>
                    <br>
                </div>
                <div>
                    <p style="float:right;""class="mb-1">Precio: ${lista.currency} ${lista.cost} </p>
                </div> 
            </div>
		</div>
    <hr>
        <h2>Mas Imagenes</h2>  
        <div id="carouselIndicators" class="carousel slide carousel-fade" data-ride="carousel" data-interval="3000">

                <ol class="carousel-indicators">
                    <li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselIndicators" data-slide-to="3"></li>
                </ol>

            <div class="carousel-inner">

                <div class="carousel-item active">
                    <img class="d-block w-100" src="${lista.images[1]}" alt="First slide">
                    <div style="background-color:rgba(0, 0, 0, 0.5)" class="carousel-caption d-none d-md-block">
                        <h4>Elegante</h4>
                        <p>Sus lineas y formas lo hacen un auto de lujo.</p>
                    </div>
                </div>

                <div class="carousel-item">
                    <img class="d-block w-100" src="${lista.images[2]}" alt="Second slide">
                    <div style="background-color:rgba(0, 0, 0, 0.5)" class="carousel-caption d-none d-md-block">
                        <h4>Amplio maletero</h4>
                        <p>Cuenta con un espacioso maletero, ideal para viajes largos.</p>
                    </div>
                </div>

                <div class="carousel-item">
                    <img class="d-block w-100" src="${lista.images[3]}" alt="Third slide">
                    <div style="background-color:rgba(0, 0, 0, 0.5)" class="carousel-caption d-none d-md-block">
                        <h4>Iluminación trasera</h4>
                        <p>Cuenta con luces de ultima tecnología para una mayor visibilidad trasera.</p>
                    </div>
                </div>

                <div class="carousel-item">
                    <img class="d-block w-100" src="${lista.images[4]}" alt="Fourt slide">
                    <div style="background-color:rgba(0, 0, 0, 0.5)" class="carousel-caption d-none d-md-block">
                        <h4>Iluminación delantera</h4>
                        <p>Para brindar la mayor seguridad y un viaje mas iluminado.</p>
                    </div>
                </div>
            </div>

            <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                <span style="background-color:rgba(0, 0, 0, 0.5);border-radius:30%/50%;" class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                <span style="background-color:rgba(0, 0, 0, 0.5);border-radius:30%/50%;" class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            
        </div>
    </div>
    <hr>    
     `
    
        document.getElementById("info-container").innerHTML = productos;

        hideSpinner();
    }   


    // Muestra los comentarios
    function showComentarios(array){

        let comentarios = `<h2>Comentarios:</h2><br>`;
        for(let i = 0; i < array.length; i++){
            let comentario = array[i];
            
            comentarios += `
            <hr>
            <div class="list-group-item">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h2 class="mb-1">${comentario.user}</h2>
                            <h4>${autosPoints(comentario.score)}</h4>
                        </div>
                        <p class="mb-1 text-left h4">${comentario.description}</p>
                        <br>
                        <br>
                        <div><p style="float:right;""class="mb-1">${comentario.dateTime}</p></div> 
    
                    </div>
                </div>
            </div>
            
            `
    
            document.getElementById("comentarios").innerHTML = comentarios;
    
            hideSpinner();
        }   

    } 

    // Funcion para mostrar productos relacionados
    function showRelatedProducts(array){
        relacionados=``;
        productInfo.relatedProducts.forEach((relacionado)=>{
            relacionados+=`
            <div class="col-md-4">
              <a href="products.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src=${array[relacionado].imgSrc} alt=${relacionado.description}">
                <h3 class="m-3">${array[relacionado].name}</h3>
                <div class="card-body">
                  <p class="card-text">${array[relacionado].description}</p>
                </div>
              </a>
            </div>
            `
        })
        document.getElementById("related").innerHTML = relacionados;
    }
    

    // tranforma puntuacion en autitos
    function autosPoints(num){
        let puntos= "";
        for(i=1; i<=5; i++){
            if(i<=num){
                puntos+=`<a><i style="color:#ffa500" class="fas fa-car"></i></a>`
            }else{
                puntos+=`<a><i class="fas fa-car-crash"></i></a>`
                
            }
        }
        return puntos;
    }


    // recolecta los datos de la caja de comentarios y los agrega un comentario nuevo a los comentarios ya existentes
    function comentar(){

        // guardamos el nombre del usuario, su comentario y su puntuacion en variables
        let usuario = JSON.parse( localStorage.getItem("usuario"));
        let nombre = usuario.nombre
        let comentario = document.getElementById("comentario").value;
        let puntos=1;
        for(i=1; i<=5; i++){
            if(document.getElementById(`radio${i}`).checked){
                puntos = document.getElementById(`radio${i}`).value;
            }    
        }
        // Conseguimos dias y hora actuales 
       let dia = new Date();
       let fecha = dia.getDate() + '-' + ( dia.getMonth() + 1 ) + '-' + dia.getFullYear();
       let hora = dia.getHours() + ':' + dia.getMinutes() + ':' + dia.getSeconds();
       let fechaYHora =fecha + ' ' + hora;
  
       // animacion al momento de comentar
       Swal.fire({
        position: 'middle',
        html: '<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_4eth4jy9.json"  background="transparent"  speed="1"  style="width: 450px; height: 450px;"    autoplay></lottie-player>',
        title: 'Comentario enviado, Gracias!',
        showConfirmButton: false,
        timer: 2500
      })

       // agregamos un nuevo comentario al array ya definido
        comentarios.push({ score:parseInt(puntos), description:comentario, user:nombre, dateTime:fechaYHora})
        document.getElementById("comentario").value="";
        showComentarios(comentarios);
        // llamo la funcion unselect para resetear las estrellas/autos
        unselect();
    }
    // deselecciona todos los radio(estrellas/autos)
    function unselect(){
        for(i=1 ;i<=5;i++){
        document.getElementById('radio'+i).checked=false;
      }}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

   

    showSpinner();
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data;
            //Muestro las categorías ordenadas
            showProductInfo(productInfo);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            relacionados = resultObj.data;
            //Muestro los comentarios
            showRelatedProducts(relacionados);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentarios = resultObj.data;
            //Muestro los comentarios
            showComentarios(comentarios);
        }
    });
    
});