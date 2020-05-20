// Crear Variables
var fondo, 
carro, 
cursores, 
enemigos, 
gasolinas, 
timer, 
timerGasolina, 
puntos, 
txtPuntaje;

var Juego = {
  // Para cargar las imagenes
  preload: function () {
    // Carga del archivo imagenes las imagenes
    juego.load.image('fondo', 'imagenes/fondo.png');
    juego.load.image('carro', 'imagenes/carro.png');
    juego.load.image('carroMalo', 'imagenes/carroMalo.png');
    juego.load.image('gas', 'imagenes/gas.png');
  },

  // Para construir el mundo
  create: function () {
    // los puntos del juego
    puntos = 0;
    // El fondo de pantalla y sus caracteristicas
    fondo = juego.add.tileSprite(0,0,290,540,'fondo');
    //Crea al sprite y la pocision del carro
    carro = juego.add.sprite(juego.width/2, 490, 'carro');
    // El ancho de donde puedo pasarme con el carro
    carro.anchor.setTo(0.5);
    carro.enableBody = true;
    // Fisica Arcade del carro
    juego.physics.arcade.enable(carro);

    //Gasolina se añade a un grupo
    gasolinas = juego.add.group();
    // Fisica arcade de la gasolina
    juego.physics.arcade.enable(gasolinas);
    gasolinas.enableBody = true;
    // La cantidad de gasolinas que se crea
    gasolinas.createMultiple(50, 'gas');
    // La pocision de la gasolina
    gasolinas.setAll('anchor.x', 0.5);
    gasolinas.setAll('anchor.y', 0.5);
    gasolinas.setAll('checkWorldBounds', true);
    gasolinas.setAll('outOfBoundsKill', true);

    // Enemigo se añade a un grupo
    enemigos = juego.add.group();
    //Fisica Arcade del enemigo
    juego.physics.arcade.enable(enemigos);
    enemigos.enableBody = true;
    //La cantidad de enemigos que se screa
    enemigos.createMultiple(50, 'carroMalo');
    // LA pocision del enemigo
    enemigos.setAll('anchor.x', 0.5);
    enemigos.setAll('anchor.y', 0.5);
    enemigos.setAll('checkWorldBounds', true);
    enemigos.setAll('outOfBoundsKill', true);

    // El tiempo que se crea el enemigo
    timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
    // El tiempo que se crea la gasolina
    timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);

    // Puntuacion del juego
    txtPuntaje = juego.add.text(60, 20, "0", { font:"69px Arial Bold", fill: "#990000" });

    // Detector de eventos
    cursores = juego.input.keyboard.createCursorKeys();
  },

  update: function () {
    //Velocidad del fondo
    fondo.tilePosition.y += 5;
    
    // Movimiento a la derecha
    if (cursores.right.isDown &&  carro.position.x < 245)
    {
      carro.position.x += 5;
    }

    // Movimiento a la izquierda
    else if (cursores.left.isDown && carro.position.x > 45)
    {
      carro.position.x -= 5;
    }

    // Lo que va caendo una gravedad los objetos
    juego.physics.arcade.overlap(carro, enemigos, this.choque, null, this);
    juego.physics.arcade.overlap(carro, gasolinas, this.cogerGas, null, this);

    // Condiciones de puntaje
    if (puntos > 4 && puntos <= 10) {
      timer.delay = 1250;
    }
    else if ( puntos > 10 )
    {
      timer.delay = 1000;
    }
    else if (puntos > 15) {
      timer.delay = 750
    }
  },

  crearCarroMalo: function () {
    // Variable de su posicion del carro malo en un numero entero
    var pos = Math.floor(Math.random()*3) + 1;
    var enemigo = enemigos.getFirstDead();
    enemigo.physicsBodyType = Phaser.Physics.ARCADE;
    enemigo.reset(pos*73, 0);
    // Velocidad del carro malo
    enemigo.body.velocity.y = 250;
  },
  
  crearGasolina: function () {
    // Vriable de la gasolina en un numero entero
    var pos = Math.floor(Math.random()*3) + 1;
    var gasolina = gasolinas.getFirstDead();
    gasolina.physicsBodyType = Phaser.Physics.ARCADE;
    gasolina.reset(pos*73, 0);
    // Velocidad de la gasolina
    gasolina.body.velocity.y = 150;
  },

  //Funcion del choque
  choque: function () {
    enemigos.forEachAlive(function (e) {
      e.body.velocity.y = 0;
    });

    juego.time.events.remove(timer);
    juego.state.start('Terminado');
  },

  // Funcion de puntuacion al coger el gas
  cogerGas: function (car, gas) {
    gas.kill();
    puntos++;
    txtPuntaje.text = puntos;
  }

};