//ya se cargaria phaser
var juego = new Phaser.Game(290, 540, Phaser.AUTO, 'carrera');

// Se añade el estado del juego
juego.state.add('Juego', Juego);

// Se añade el estado de terminado
juego.state.add('Terminado', Terminado);

// Se inicia el estado juego
juego.state.start('Juego');