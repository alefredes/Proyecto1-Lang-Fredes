/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//variable que almacena los datos obtenidos del json
var comidasDisp;
//arreglo que almacena lo que esta en el plato actualmente
var comidasAct=new Array();
plato={};
partesPlato={'parte1':'libre','parte2':'libre','parte3':'libre'};

//jQuery
$(document).ready(function(){
       
        var ajax = new AJAXInteraction("./json/platos.json", function(data){  
        comidasDisp=data;
        $('.panel-button').on('click',function(){
            var categoria= $(this).attr('data-panelcat');
            var elemento = $(this).attr('data-panelid');
            clickFood(categoria,elemento);
            });
        $('.picker').on('click', function(){
            var valor= $(this).attr('value');
            cambiarEstilo(valor);
        });
        $(document).ready(iniciarEstilo());
        });
        
       
        ajax.doGet();
	 
       
//el panelId recibido va a  ser un valor obtenido a partir de la clave data-panelid que denota el nombre del archivo png	
   // jQuery methods go here...

}); 

function exportToForm(sug) {
   
      partesPlato['parte1']="libre";
      partesPlato['parte2']="libre";
      partesPlato['parte3']="libre";
      
      $('.'+'parte1'+'-food').removeAttr('src');
      $('.'+'parte1'+'-food').attr('src',"Imagenes/transparente.png");
      $('.'+'parte2'+'-food').removeAttr('src');
      $('.'+'parte2'+'-food').attr('src',"Imagenes/transparente.png");
      $('.'+'parte3'+'-food').removeAttr('src');
      $('.'+'parte3'+'-food').attr('src',"Imagenes/transparente.png");
      plato={};
    $('.'+'imgPpal').attr('src',"Imagenes/plato"+sug+".png");

}

function cambiarEstilo(valor){
     
     document.getElementById("estilos").setAttribute("href", "./css/"+ valor+".css");
     var valorAnt= localStorage.eleccion;
     document.getElementById(valorAnt).removeAttribute("selected");
     localStorage.setItem("eleccion", valor);
}

function iniciarEstilo(){
    var elemento=document.getElementById("estilos");
     var valor = localStorage.getItem("eleccion");
    if (valor!==null){
     document.getElementById(valor).setAttribute("selected","selected");
     elemento.setAttribute("href", "./css/"+ valor+".css");
    }
    else{
        elemento.setAttribute("href", "./css/estilo1.css");
        document.getElementById("estilo1").setAttribute("selected","selected");
        localStorage.setItem("eleccion", "estilo1");    
    }
}


function clickFood(categoria, elemento){
    
    if (!haySugerencias()){
        if(plato.hasOwnProperty(elemento)){
            delete plato[elemento];
            var parte= buscarElem(elemento);
            partesPlato[parte]="libre";
            $('.'+parte+'-food').removeAttr('src');
            $('.'+parte+'-food').attr('src',"Imagenes/transparente.png");
         }
        else
          addFood(categoria, elemento);
        }
        else{
            $('.'+'imgPpal').attr('src',"Imagenes/plato.png");
             addFood(categoria, elemento);
        }
}

function haySugerencias(){
    var ruta= document.getElementById("PlatoPrincipal").getAttribute("src");
    if(ruta==="Imagenes/plato.png")
       return false;
    else
       return true;
}

//Aca van las funciones que seran llamadas desde jQuery
function addFood(categoria, elemento) {
    var index1= Object.keys(plato).length;
   if (index1<3){
       var posElem= searchFood(categoria, elemento);
       var objElemento= comidasDisp[posElem[0]];
       var nombre=Object.keys(comidasDisp[posElem[0]]);
       plato[elemento]= objElemento[nombre][posElem[1]];
       var pos= buscarElem('libre');
       partesPlato[pos]=elemento;
      $('.'+pos+'-food').attr('src',"Imagenes/"+ elemento+".png");
   }else
       alert("Solo se permiten 3 comidas");
}


function searchFood(categoria, elemento){
    var index1=0, index2=0;
    var posElem=[-1,-1];
       while(categoria.localeCompare(Object.keys(comidasDisp[index1]))!==0){
           index1++;
       }       
       var nombre=Object.keys(comidasDisp[index1]);  
       var elemCat= comidasDisp[index1];
       while(elemento.localeCompare(elemCat[nombre][index2].Nombre)!==0){
           index2++;
       }
    posElem=[index1,index2];        
   return posElem;
}

function buscarElem(elemento){
 var parte;
if(partesPlato['parte1']===elemento)
     parte='parte1';
 else
    if(partesPlato['parte2']===elemento) 
        parte='parte2';
else
    parte='parte3';
return parte;
}

function AJAXInteraction(url, callback) {
    this.doGet = function() {
		$.ajax({
		    url: url,
		    context: document.body,
		    success: function (data) {
		        callback(data);
		    }
		});
    };

}
