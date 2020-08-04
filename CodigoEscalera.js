
// FIXME: error al darla aceptar reintenta 


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


//----------
var turno;

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

let dato = document.createElement('p');
edad = prompt("Ingrese Edad: ");
dato.textContent = edad;
  document.getElementById('edad').appendChild(dato); 
  //-------------------------
  turno = 1;
  console.log(edad);

  //FIXME: pedir usuario

}

function draw() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  canvas.addEventListener("click", onClick, false);
  ctx.fillStyle = "blue";
  ctx.fillRect(width - 475, coordenaday, boxSize * 9, boxSize);
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
  }
  return rango;
}
function pintarcubo(equipo, casilla) {
  ctx.strokeStyle = '#c8c8c8';
  if (equipo == 1) {
    ctx.fillStyle = "#960000";
  } else if (equipo == 2) {
    ctx.fillStyle = "#000096";

  } else if (equipo == 3) {
    ctx.fillStyle = "#ffffff";
  }
  ctx.strokeRect((width / 10 * casilla) - 25, coordenaday, boxSize, boxSize);
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

  let movimientos = document.createElement('ol');
  movimientos.textContent = valores; 
  document.getElementById('tabla-movimientos').appendChild(movimientos);

}


//-------------------------------------------------------------------------
function imprimirTabla() {
  var valores = null;
  // FIXME: Tomar variable turno de aqui  
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
      reiniciarJuego();
    } else if (bloqueSaltado > 4 && numeroBloque > 4) {
      intento++;
      confirm("Intenta de Nuevo");
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
    turno++;
    //-------------------------------
    reglaUno();
    reglaDos(posicionLevantar, posicionDejar, bloqueLevantado);
  }


}


