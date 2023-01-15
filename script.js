/* variables */
var lienzo = document.getElementById("miLienzo");
var ctx = lienzo.getContext("2d");
var radioPelota = 10;
var x = lienzo.width / 2;
var y = lienzo.height - 30;
var dx = 2;
var dy = -2;
var altoPaleta = 10;
var anchoPaleta = 75;
var paletaX = (lienzo.width - anchoPaleta) / 2;
var derecha = false;
var izquierda = false;
var numeroFilasLadrillos = 3;
var numeroColumnasLadrillos = 5;
var anchoLadrillo = 75;
var altoLadrillo = 20;
var espacioEntreLadrillos = 10;
var margenSupLadrillo = 30;
var margenIzquLadrillo = 30;
var puntos = 0;
var vidas = 3;

var ladrillos = [];
for (c = 0; c < numeroColumnasLadrillos; c++) {
  ladrillos[c] = [];
  for (r = 0; r < numeroFilasLadrillos; r++) {
    ladrillos[c][r] = { x: 0, y: 0, status: 1 };

  }
}



/* eventos */
document.addEventListener("keydown", presionar, false);
document.addEventListener("keyup", soltar, false);
document.addEventListener("mousemove", movimientoRaton, false);

/* funciones */
function presionar(e) {
  if (e.keyCode == 39) {
    derecha = true;
  } else if (e.keyCode == 37) {
    izquierda = true;
  }
}

function soltar(e) {
  if (e.keyCode == 39) {
    derecha = false;
  }
  else if (e.keyCode == 37) {
    izquierda = false;
  }
}

function movimientoRaton(e) {
  var relativeX = e.clientX - lienzo.offsetLeft;
  if (relativeX > 0 && relativeX < lienzo.width) {
    paletaX = relativeX - anchoPaleta / 2;

  }
}
function dibujarPelota() {
  ctx.beginPath();
  ctx.arc(x, y, radioPelota, 0, Math.PI * 2);
  ctx.fillStyle = "#fdbb2d";
  ctx.fill();
  ctx.closePath();
}

function dibujarPaleta() {
  ctx.beginPath();
  ctx.rect(paletaX, lienzo.height - altoPaleta, anchoPaleta, altoPaleta);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function dibujarLadrillos() {
  for (c = 0; c < numeroColumnasLadrillos; c++) {
    for (r = 0; r < numeroFilasLadrillos; r++) {
      if (ladrillos[c][r].status == 1) {
        var ladrilloX = (c * (anchoLadrillo + espacioEntreLadrillos)) + margenIzquLadrillo;
        var ladrilloY = (r * (altoLadrillo + espacioEntreLadrillos)) + margenSupLadrillo;
        ladrillos[c][r].x = ladrilloX;
        ladrillos[c][r].y = ladrilloY;
        ctx.beginPath();
        ctx.rect(ladrilloX, ladrilloY, anchoLadrillo, altoLadrillo);
        ctx.fillStyle = "#fc466b";
        ctx.fill();
        ctx.closePath();
      }

    }
  }
}

function detectarColision() {
  for (c = 0; c < numeroColumnasLadrillos; c++) {
    for (r = 0; r < numeroFilasLadrillos; r++) {
      var b = ladrillos[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + anchoLadrillo && y > b.y && y < b.y + altoLadrillo) {
          dy = -dy;
          b.status = 0;
          puntos++;
          if (puntos == numeroFilasLadrillos * numeroColumnasLadrillos) {
            alert('¡Has ganado! Presiona "Aceptar" para jugar otravez')
            document.location.reload();


          }
        }
      }

    }
  }
}

function dibujarPuntos() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#110fa1";
  ctx.fillText("Puntos: " + puntos, 8, 20);
}

function dibujarVidas() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#110fa1";
  ctx.fillText("Vidas: " + vidas, lienzo.width - 65, 20);

}

function dibujar() {
  ctx.clearRect(0, 0, lienzo.width, lienzo.height);
  dibujarLadrillos();
  dibujarPelota();
  dibujarPaleta();
  dibujarPuntos();
  dibujarVidas();
  detectarColision();

  if (x + dx > lienzo.width - radioPelota || x + dx < radioPelota) {
    dx = -dx;
  }
  if (y + dy < radioPelota) {
    dy = -dy;
  }
  else if (y + dy > lienzo.height - radioPelota) {
    if (x > paletaX && x < paletaX + anchoPaleta) {
      dy = -dy;
    } else {

      vidas--;
      if (!vidas) {
        alert("¡Has perdido! Presiona 'Aceptar' para jugar otravez");
        document.location.reload();
      } else {
        x = lienzo.width / 2;
        y = lienzo.height - 30;
        dx = 2;
        dy = -2;
        paletaX = (lienzo.width - anchoPaleta) / 2;
      }

    }
  }

  if (derecha && paletaX < lienzo.width - anchoPaleta) {
    paletaX += 7;
  } else if (izquierda && paletaX > 0) {
    paletaX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(dibujar);
}
dibujar();
