import { Calculo } from "./calculo.js";
window.onload= function()
{
    console.log("Script cargado.");

    let resultado = document.getElementById("result");
    let txtResultado = "0";

    let numeros= [];
    numeros =  document.getElementsByClassName("numerico");

    let signos= [];
    signos =  document.getElementsByClassName("signo");

    let calculos=  [];

    let total=0;


    // Calcular resultado

    let igual = document.getElementById("btnIgual");

    igual.addEventListener("click",function onClick()
    {
        calculos.push(new Calculo(orden,signoAux,bckUp));
       total = calcular(calculos);

       resultado.setAttribute("value",total);
       txtResultado = total;
       signoAux="vacio";
       bckUp=resultado.getAttribute("value");
       calculos = [];
    })

    // Borrar 
    let ponerCero = document.getElementById("ponerCero");

    let borrar = document.getElementById("btnBorrar");

    let bandera = true;

    ponerCero.addEventListener("click",function onClick() // borra todo
    {
        txtResultado = "0";
        resultado.setAttribute("value",0);
        signoAux="vacio";
        bckUp=resultado.getAttribute("value");
        calculos = [];
    })

    borrar.addEventListener("click",function onClick() // borra ultimo digito
    {
        if(txtResultado != 0 )
        {
            if(bandera == true) // si el ultimo digito es numero
            {
                txtResultado = resultado.getAttribute("value").slice(0,-1);
                bckUp = bckUp.slice(0,-1);
                resultado.setAttribute("value",txtResultado);
                //
            }
            if(bandera== false){ // si el ultimo digito es signo
                txtResultado = resultado.getAttribute("value").slice(0,-1);
                resultado.setAttribute("value",txtResultado);
                signoAux ="vacio";
               let popNumero = calculos.pop();
                bckUp = popNumero.numero;

                
                bandera=true;
                console.log("pop: "+popNumero.numero);
            }
            
        }
    })
    //  numeros
    
    let bckUp = "";
    for(let element of numeros)
    {
        element.addEventListener("click",function onClick()
        { 
            bandera = true;
            if(txtResultado == "0"){
                txtResultado = element.getAttribute("value");
                bckUp += element.getAttribute("value");       
            }
            else
            {
                txtResultado += element.getAttribute("value");
                bckUp += element.getAttribute("value");
            }
            resultado.setAttribute("value",txtResultado);

            console.log("bck desp de numero: "+bckUp);
        })
    }

    // signos

    let orden=0;
    let signoAux="vacio";
    for(let element of signos)
    {
        element.addEventListener("click",function onClick()
        { 
            bandera = false;
            orden ++;
            if(signoAux=="vacio")
            {
                calculos.push(new Calculo(orden,"+",bckUp));
                signoAux = element.getAttribute("value");
            }
            else
            {
                calculos.push(new Calculo(orden,signoAux,bckUp)); // cuando se ingresa un signo, guardo el numero previo 
                signoAux = element.getAttribute("value");           // y preparo el signo ingresado para el siguiente numero.
                
            }
            console.log("bck desp de signo: "+bckUp);
            bckUp="";
            txtResultado += element.getAttribute("value");
            
            resultado.setAttribute("value",txtResultado);
        })
    }


}


function calcular(object)
{
    console.log("empieza la cuenta...");
    let total = 0;
    let c=0;
    object.forEach(element => {
        if(element.numero!="")
        {
            console.log("signo: "+element.signo+" valor: "+element.numero);
            c++;
            switch(element.signo)
            {
                case "+":
                    total += parseFloat(element.numero);
                   
                    break;
                case "-":
                    total -= parseFloat(element.numero);
                    
                    break;
                case "/":
                    total = total / parseFloat(element.numero);
                   
                    break;
                case "x":
                    total = total * parseFloat(element.numero);
                    
                    break;
                default:
                    total += element.numero;
                    break;
            }
        }
    });
    // console.log(element.signo);
    return total;
}