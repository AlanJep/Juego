// Al momento de perder
var Terminado = {
  create: function () {
    // El color del fondo al momento de perder
    juego.stage.backgroundColor = '#1841DB';
    // El texto y sus caracteristicas
    juego.add.text(60, 250, "GAME OVER", {font: "30px Arial", fill: "#F7FF00"});
  }
};