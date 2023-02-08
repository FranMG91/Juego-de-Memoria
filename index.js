//INICIAIZACION DE VARIABLES
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let tiempoRegresivoId = null;
let timerInicial = 40;

//APUNTANDO A DOCUMENTO HTML
let mostrarMovimientos= document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');



//GENERACION NUMEROS ALEATORIOS
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);


//FUNCIONES
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
    timer--;
    mostrarTiempo.innerHTML = `TIEMPO: ${timer} SEGUNDOS`;
    if(timer == 0){
        clearInterval(tiempoRegresivoId);
        bloquearTarjetas();
    }
},1000);
}

function bloquearTarjetas(){
   for (let i = 0; i<=15; i++){
       let tarjetaBloqueada = document.getElementById(i);
       tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.jpg" alt="">`;
       tarjetaBloqueada.disabled = true;
   }
}


//FUNCION PRINCIPAL
function destapar(id){

    if (temporizador == false){
        contarTiempo(),
        temporizador = true;
    }




    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1){
        //MOSTRAR PRIMER NUMERO
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.jpg" alt="">`;

        //DESHABILITAR PRIMER BOTON
        tarjeta1.disabled = true;
    }else if (tarjetasDestapadas ==2){
        //MOSTRAR SEGUNDO NUMERO
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.jpg" alt="">`; 

        //DESABILITAR SEGUNDO BOTON
        tarjeta2.disabled = true;

        //INCREMENTAR MOVIMIENTOS
        movimientos++;
        mostrarMovimientos.innerHTML = `MOVIMIENTOS: ${movimientos}`;


        if(primerResultado == segundoResultado){
            // ENCERAR CONTADOR TARJETAS DESTAPADAS
            tarjetasDestapadas = 0;

            // AUMENTAR ACIERTOS
            aciertos++;
            mostrarAciertos.innerHTML = `ACIERTOS: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `ACIERTOS: ${aciertos} FUA`;
                mostrarTiempo.innerHTML = `BUENISIMO! DEMORASTE ${timerInicial - timer} SEGUNDOS`;
                mostrarMovimientos.innerHTML= `MOVIMIENTOS: ${movimientos} ALTO CRACK PERRO`;
            }


        }else{
            //MOSTRAR MOMENTANEAMENTE VALORES Y VOLVER A TAPAR
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
        
    }

    

}