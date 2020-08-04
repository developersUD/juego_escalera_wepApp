
var distancia, x1, x2, coordenaday;
var boxSize, espacio, posicion, e, bloqueLevantado, numeroBloque;
var posicionIntermedia, bloqueSaltado, posicionLevantar, posicionDejar;
var movimientosJugador, valoresIguales, intento;
var edad;
var bloqueadoP = true;
var ingreso = true;
var estadoActual = [1, 2, 3, 4, 0, 5, 6, 7, 8];
var trayectoriaSujeto = [];


var width = 500;
var height = 500;
var canvas;
var ctx;
alert("Bienvenidos a escalerita");
setup();
draw();
/*
var arrayData = new Array();
var archivoTxt= new XMLHttpRequest();
var fileRuta = 'Datos.txt';
archivoTxt.open("Get",fileRuta,false);
archivoTxt.send(null);
var txt = archivoTxt.responseText;
for(var i = 0; i < txt.length;i++){
  arrayData.push(txt[i]);
}
arrayData.forEach(function(){
  console.log(data);
  dataSum+=parseInt(data);
});
if(dataSum==0){
  console.log('Inserte Data en index.txt');
}else{
  console.log('LA SUMA DE LOS DATOS DEL TXT ES: '+dataSum);
}*/



//----------
var turno;
//PrintWriter output;//variable que maneja el txt
//Table table;//variable que maneja el excel
//JSONArray jarreglo;//variable que maneja el Json
//-----

function setup() {
  for (var i = 0; i < 100; i++) {
    trayectoriaSujeto[i] = new Array(9);
  }
  espacio = width / 10;
  movimientosJugador = 0;
  intento = 1;
  valoresIguales = 0;
  coordenaday = height / 2.0;
  boxSize = width / 10;
  //rectMode(CENTER);
  edad = prompt("Ingrese Edad: ");
  //-------------------------
  turno = 1;
  console.log(edad);
  //output= createWriter("datos/texto.txt");
  //table = new Table();
  //table.addColumn("Jugador");
  //table.addColumn("Turno");
  //table.addColumn("Accion");
  //jarreglo = new JSONArray();
  //-------------------------
}

function draw() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  canvas.addEventListener("click", onClick, false);
  //background(238,152,0);
  //canvas.fill(250);
  //fill(250);
  ctx.fillStyle = "blue";
  ctx.fillRect(width - 475, coordenaday, boxSize * 9, boxSize);

  //rect(width/2, coordenaday, boxSize*9, boxSize)
  setInterval(pintarBloques, 15);

}

function posicionMouse(x1, y1) {
  var rango = false;
  for (var i = 0; i < 9; i++) {
    if (y1 < coordenaday + 50 && y1 > coordenaday) {
      if (x1 > (25 + (i * 50)) && x1 < (25 + (i * 50) + 50)) {
        posicion = i + 1;
        rango = true;
      }
    }
    //distancia=Math.sqrt((espacio*i-x1)*(espacio*i-x1)+(coordenaday-y1)*(coordenaday-y1));
    /*if (distancia < 20)
    {
      posicion=i;
    }*/
  }
  return rango;
}
function pintarcubo(equipo, casilla) {
  ctx.strokeStyle = '#c8c8c8';
  //stroke(200);
  if (equipo == 1) {
    ctx.fillStyle = "#960000";
    //fill(150,0,0);
  } else if (equipo == 2) {
    ctx.fillStyle = "#000096";
    //fill(0,0,150);
  } else if (equipo == 3) {
    ctx.fillStyle = "#ffffff";
    //fill(255,255,255);
  }
  ctx.strokeRect((width / 10 * casilla) - 25, coordenaday, boxSize, boxSize);
  //rect(width/10*casilla, coordenaday, boxSize, boxSize);
  ctx.fillRect((width / 10 * casilla) - 25, coordenaday, boxSize, boxSize);
}

function levantar(posicion) {
  bloqueLevantado = estadoActual[posicion - 1];
  estadoActual[posicion - 1] = 0;
  posicionLevantar = posicion;
  return posicionLevantar;
}
function dejar(posicion, numeroBloque) {
  estadoActual[posicion - 1] = numeroBloque;
  posicionDejar = posicion;
  return posicionDejar;
}

function pintarBloques() {
  for (var i = 0; i < 9; i++) {
    if (estadoActual[i] > 0 && estadoActual[i] < 5) {
      e = 1;
    } else if (estadoActual[i] > 4) {
      e = 2;
    } else if (estadoActual[i] == 0) {
      e = 3;
    }
    pintarcubo(e, i + 1);
  }
}
function imprimirEstadoActual() {
  print("EstadoActual: ");
  for (var i = 0; i < 9; i++) {
    print(estadoActual[i]);
  }
  println("");
}
function trajectoriaSujeto() {
  for (var i = 0; i < 9; i++) {
    trayectoriaSujeto[movimientosJugador][i] = estadoActual[i];
  }
}
function imprimirTrayectoriaSujeto() {
  var valores = null;
  var numero = 0;
  console.log("TrayectoriaSujeto: ");
  for (var i = turno; i < movimientosJugador + 1; i++) {
    for (var j = 0; j < 9; j++) {
      numero = trayectoriaSujeto[i][j];
      if (valores == null) {

        valores = "" + numero;

      } else {
        valores = valores + numero;
      }
    }
  }
  console.log("valores : " + valores);
}
//-------------------------------------------------------------------------
function imprimirTxt() {
  var valores = null;
  console.log("Turno " + turno + ": ");
  for (var i = turno; i < movimientosJugador + 1; i++) {
    for (var j = 0; j < 9; j++) {
      if (valores == null) {
        valores = trayectoriaSujeto[i][j].toString();
      } else {
        valores = valores + trayectoriaSujeto[i][j].toString();
      }

    }
    console.log(trayectoriaSujeto[i][j]);
  }
}
function imprimirTabla() {
  var valores = null;
  for (var i = turno; i < movimientosJugador + 1; i++) {
    for (var j = 0; j < 9; j++) {
      if (valores == null) {
        valores = "" + trayectoriaSujeto[i][j];
      } else {
        valores = valores + trayectoriaSujeto[i][j];
      }
    }
    //TableRow newRow = table.addRow();
    newRow.setInt("Jugador", 0);
    newRow.setInt("Turno", turno);
    newRow.setString("Accion", valores);
    saveTable(table, "datos/tabla.csv");
    output.println("");
  }
}

function imprimirJson() {
  var valores = null;
  for (var i = turno; i < movimientosJugador + 1; i++) {
    //JSONObject accion = new JSONObject();
    for (var j = 0; j < 9; j++) {
      if (valores == null) {
        valores = "" + trayectoriaSujeto[i][j];
      } else {
        valores = valores + trayectoriaSujeto[i][j];
      }
    }
    accion.setInt("id", turno - 1);
    accion.setInt("Jugador", 0);
    accion.setString("accion", valores);
    jarreglo.setJSONObject(turno - 1, accion);
  }
  saveJSONArray(jarreglo, "datos/datos.json");
}
//--------------------------------------------------------------------------
function reglaUno() { // No Devolverse
  if (movimientosJugador > 2) {
    for (var i = 0; i < 9; i++) {
      if (trayectoriaSujeto[movimientosJugador - 2][i] == estadoActual[i])
        valoresIguales++;
    }
    if (valoresIguales > 8) {
      valoresIguales = 0;
      intento++;
      confirm("Intenta de Nuevo");
      //output.flush();
      //output.close();
      reiniciarJuego();
    } else {
      valoresIguales = 0;
    }
  }
}
function reglaDos(posicionLevantar, posicionDejar, numeroBloque) { // No Saltar sobre mismo equipo
  if (Math.abs(posicionLevantar - posicionDejar) == 2) {
    if (posicionLevantar > posicionDejar) {
      posicionIntermedia = posicionLevantar - 2;
    } else if (posicionLevantar < posicionDejar) {
      posicionIntermedia = posicionLevantar;
    }
    bloqueSaltado = estadoActual[posicionIntermedia];
    if (bloqueSaltado < 5 && numeroBloque < 5) {
      intento++;
      confirm("Intenta de Nuevo");
      //output.flush();
      //output.close();
      reiniciarJuego();
    } else if (bloqueSaltado > 4 && numeroBloque > 4) {
      intento++;
      confirm("Intenta de Nuevo");
      //output.flush();
      //output.close();
      reiniciarJuego();
    }
  }
}
function reiniciarJuego() {
  estadoActual[0] = 1;
  estadoActual[1] = 2;
  estadoActual[2] = 3;
  estadoActual[3] = 4;
  estadoActual[4] = 0;
  estadoActual[5] = 5;
  estadoActual[6] = 6;
  estadoActual[7] = 7;
  estadoActual[8] = 8;
}
function onClick(e) {
  var element = canvas;
  var offsetX = 0, offsetY = 0
  var enElRango = false;
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  enElRango = posicionMouse(mouseX, mouseY);

  if (bloqueadoP && enElRango) {
    posicionMouse(mouseX, mouseY);
    levantar(posicion);
    bloqueadoP = false;
    movimientosJugador++;
  } else if (!bloqueadoP && enElRango) {
    posicionMouse(mouseX, mouseY);
    dejar(posicion, bloqueLevantado);
    bloqueadoP = true;
    trajectoriaSujeto();
    imprimirTrayectoriaSujeto();
    //-------------------------------
    //imprimirTabla();
    //imprimirJson();
    turno++;
    //-------------------------------
    reglaUno();
    reglaDos(posicionLevantar, posicionDejar, bloqueLevantado);
  }

  if (element.offsetParent) {

  }
}
/*
function mousePressed() {
    if(bloqueadoP) {
      posicionMouse(mouseX,mouseY);
      levantar(posicion);
      bloqueadoP=false;
      movimientosJugador++;
    } else if (!bloqueadoP){
      posicionMouse(mouseX,mouseY);
      dejar(posicion, bloqueLevantado);
      bloqueadoP=true;    
      trajectoriaSujeto();
      imprimirTrayectoriaSujeto();
      //-------------------------------
      //imprimirTabla();
      //imprimirJson();
      //turno++;
      //-------------------------------
      reglaUno();
      reglaDos(posicionLevantar, posicionDejar, bloqueLevantado);
    }
}*/
function mouseDragged() {

}
function mouseReleased() {
}

const export_csv = (arrayHeader, arrayData, delimiter, fileName) => {
  let header = arrayHeader.join(delimiter) + '\n';
  let csv = header;
  arrayData.forEach(array => {
    csv += array.join(delimiter) + "\n";
  });

  let csvData = new Blob([csv], { type: 'text/csv' });
  let csvUrl = URL.createObjectURL(csvData);

  let hiddenElement = document.createElement('a');
  hiddenElement.href = csvUrl;
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName + '.csv';
  hiddenElement.click();
}