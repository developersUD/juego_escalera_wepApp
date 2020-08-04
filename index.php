

<?php
//************* script conexion mysql ********** //
function Conectarse(){
  $host='localhost';
  $usuariodb='adminGame';
  $passwdb='virtusUD';
  $nombredb='juegoescalera';

  if (!($link=mysql_connect($host,$usuariodb,$passwdb)))  {
  echo "Error conectando a la base de datos.";
    exit();
  }
  if (!mysql_select_db($nombredb,$link)){
    echo "Error seleccionando la base de datos, verifique que el nombre de usuario utilizado este asociado a la base de datos.";
    exit();
  }
return $link;
}

$link=Conectarse();
echo "<div color='white'>Conexión con la base de datos conseguida </div>
";
mysql_close($link); //cierra la conexion
//************* script conexión mysql **********//

?>

<html>
  <head>
    <title>HTML 5</title>
    <!--<script type="text/javascript" src="processing.js"></script>-->
    
    <link rel="stylesheet" href="estilo.css">
  </head>
  <body>
    <h1>Escalera</h1>
    <div> 
      <h2>Algo</h2>
      <canvas id="gameCanvas" width="500" height="500"></canvas>
      <script type="text/javascript" src="CodigoEscalera.js"></script>
    </div>    
  </body>
</html>