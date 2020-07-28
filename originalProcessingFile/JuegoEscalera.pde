import javax.swing.JOptionPane; 
float distancia, x1, x2, coordenaday;
int boxSize, espacio, posicion, e, bloqueLevantado, numeroBloque;
int posicionIntermedia, bloqueSaltado, posicionLevantar, posicionDejar;
int movimientosJugador, valoresIguales, intento;
String edad;
boolean bloqueadoP = true;
boolean ingreso = true;
int[] estadoActual = {1,2,3,4,0,5,6,7,8};
int[][] trayectoriaSujeto= new int[100][9];

void setup() {
  size(500,500);
  espacio = width/10;
  movimientosJugador=0;
  intento = 1;
  valoresIguales=0;
  coordenaday = height/2.0;
  boxSize = width/10;
  rectMode(CENTER);
  edad=JOptionPane.showInputDialog("Ingrese Edad: ");
}

void draw() {
  background(238,152,0);
  fill(250);
  rect(width/2, coordenaday, boxSize*9, boxSize);
  pintarBloques();
}

int posicionMouse(int x1,int y1){
  for (int i = 1; i < 10; i++) {
    distancia=sqrt((espacio*i-x1)*(espacio*i-x1)+(coordenaday-y1)*(coordenaday-y1));
    if (distancia < 20)
    {
      posicion=i;
    }
  }
    return posicion;
}
void pintarcubo(int equipo, int casilla){
  stroke(200);
  if (equipo==1){
     fill(150,0,0);
  } else if (equipo==2){
    fill(0,0,150);
  } else if (equipo==3){
    fill(255,255,255);
  }
  rect(width/10*casilla, coordenaday, boxSize, boxSize);
}
int levantar(int posicion){
     bloqueLevantado=estadoActual[posicion-1];
     estadoActual[posicion-1]=0;
     posicionLevantar=posicion;
     return posicionLevantar;
}
int dejar(int posicion, int numeroBloque){
     estadoActual[posicion-1]=numeroBloque;
     posicionDejar=posicion;
     return posicionDejar;
}

void pintarBloques(){
  for (int i = 0; i < 9; i++) {
      if (estadoActual[i]>0 && estadoActual[i]<5){
        e=1;
      } else if (estadoActual[i]>4){
        e=2;
      } else if (estadoActual[i]==0){
        e=3;
      }
      pintarcubo(e,i+1);
  }
}
void imprimirEstadoActual(){
  print("EstadoActual: "); 
  for (int i = 0; i < 9; i++) {
     print(estadoActual[i]);
   }
   println("");
}
void trajectoriaSujeto(){
  for (int i = 0; i < 9; i++) {
  trayectoriaSujeto[movimientosJugador][i] = estadoActual[i];
  }
}
void imprimirTrayectoriaSujeto(){
  println("TrayectoriaSujeto: ");
  for (int i = 0; i < movimientosJugador+1; i++) {
    for (int j = 0; j < 9; j++) {
     print(trayectoriaSujeto[i][j]);
    }
    println("");
  }
}
void reglaUno(){ // No Devolverse
  if (movimientosJugador>2){
    for (int i = 0; i < 9; i++) {
      if(trayectoriaSujeto[movimientosJugador-2][i] == estadoActual[i])
      valoresIguales++;
    }
    if (valoresIguales>8){
      valoresIguales=0;
      intento++;
      JOptionPane.showMessageDialog(frame, "Intenta de Nuevo");
      reiniciarJuego();
    } else {
      valoresIguales=0;
    }
  }
}
void reglaDos(int posicionLevantar, int posicionDejar, int numeroBloque){ // No Saltar sobre mismo equipo
    if (abs(posicionLevantar-posicionDejar) == 2) {
        if (posicionLevantar > posicionDejar){
          posicionIntermedia = posicionLevantar-2;
        } else if (posicionLevantar < posicionDejar){
          posicionIntermedia = posicionLevantar;
        }
        bloqueSaltado=estadoActual[posicionIntermedia];
        if(bloqueSaltado<5 && numeroBloque<5){
            intento++;
            JOptionPane.showMessageDialog(frame, "Intenta de Nuevo");
            reiniciarJuego();
        } else if (bloqueSaltado>4 && numeroBloque>4){
            intento++;
            JOptionPane.showMessageDialog(frame, "Intenta de Nuevo");
            reiniciarJuego();
        }
    }
}
void reiniciarJuego(){
      estadoActual[0]=1;
      estadoActual[1]=2;
      estadoActual[2]=3;
      estadoActual[3]=4;
      estadoActual[4]=0;
      estadoActual[5]=5;
      estadoActual[6]=6;
      estadoActual[7]=7;
      estadoActual[8]=8;
}
void mousePressed() {
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
      reglaUno();
      reglaDos(posicionLevantar, posicionDejar, bloqueLevantado);
    }
}
void mouseDragged() {

}
void mouseReleased() {
}
