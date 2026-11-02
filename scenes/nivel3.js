//Codigo bloquea el juego si no se agrega user y pass correcto
let nombreUsuario = "";
$(document).ready(function () {
    $("#btn-ingresar").click(function (e) {
        e.preventDefault(); // El boton submit no mande los valores y evitar error- sino la pag recarga
        let usuario = $("#usuario").val();
        let pass = $("#pass").val();

        apiPlayer.fetchPlayer(usuario, pass)
            .then(response => {

                console.log("respuesta:" + response);
                if (response != "") {
                    for (let uss of response) {
                        $("#row-juego").show();
                        window.location.href = "http://localhost/circus/client/index.html?#row-juego";
                        nombreUsuario = uss.usuario;
                        $("#alerta").hide();
                    }
                } else {
                    $("#alerta").show();
                }
            });
    });
});


export class Nivel3 extends Phaser.Scene {
    constructor() {
        super({ key: 'nivel3' });
        this.jumpCount = 0;
        this.modeLeon = true;
        this.modeCanon = false;
        this.modeMono = false;
        this.player = null;
        this.animacion = null;
    }
    init() {
        this.jumpCount = 0;
        this.modeLeon = true;
        this.modeCanon = false;
        this.modeMono = false;
        this.player = null;
        this.animacion = null;
        this.pausa = false;
    }



    preload() {
        this.load.audio('soundNivel3', '/circus/client/assets/sounds/lvl1.mp3');

        //obstaculo pelotaVerde
        this.load.image('pelotaVerde', '/circus/client/assets/game/sprite modo 2/pelotaverde.png');
        this.load.image('clavas', '/circus/client/assets/game/sprite modo 2/clava.png');
        this.load.image('trapesista', '/circus/client/assets/game/sprite modo 2/trapesista.png');
        this.load.image('cintalarga', '/circus/client/assets/game/sprite modo 2/cintalarga.png');
    }

    create() {

        api2.fetchObstaclesc(3)
            .then(response => {

                this.musicNivel3 = this.sound.add('soundNivel3');
                this.musicNivel3.play();
                this.salto = this.sound.add('salto');
                this.muerte = this.sound.add('muerte');
                this.soundNextLev = this.sound.add('soundNextLev');



                this.add.image(400, 250, 'escenario');
                this.suelo = this.physics.add.sprite(0, 500, 'suelo').setImmovable(true).setOrigin(0, 1);
                this.cuerda = this.physics.add.sprite(0, 25, 'cuerda').setImmovable(true).setOrigin(0);
                this.rueda = this.physics.add.sprite(90, 25, 'rueda').setOrigin(0);

                //grupo publicos
                this.publicos = this.physics.add.group();
                for (let publicos of publico) {
                    let positionX = 0;
                    for (let i = 0; i < publicos.quantity; i++) {
                        //700 is the speed
                        let publicAux = this.publicos.create((publicos.seconds * 700) + positionX, publicos.y, 'publico').setOrigin(0, 1);
                        positionX += publicAux.width;
                    }
                }
                this.publicos.setVelocityX(-100);


                //grupo de arosback
                this.decoracion = this.physics.add.group();
                for (let decoracion of arosatras3) {
                    let positionX = 0;
                    for (let i = 0; i < decoracion.quantity; i++) {
                        //700 is the speed
                        let decoracionAux = this.decoracion.create((decoracion.seconds * 700) + positionX, decoracion.y, 'aroback');
                        positionX += decoracionAux.width;
                    }
                }

                //player principal
                this.player = this.physics.add.sprite(80, 380, 'corre1').setOrigin(0, 1);
                this.player.body.gravity.y = 4000;
                this.player.setTexture('corre1');
                this.rueda.visible = false;

                this.anims.create({
                    key: 'run',
                    frames: this.anims.generateFrameNumbers('corre1', { frames: [0, 1] }),
                    frameRate: 4,
                    repeat: -1
                });

                this.anims.create({
                    key: 'vicivici',
                    frames: this.anims.generateFrameNumbers('vici', { frames: [0, 1, 2, 3] }),
                    frameRate: 8,
                    repeat: -1
                });

                this.player.play('run');

                //creacion de colision del suelo y reseteo del conteo de saltos
                this.physics.add.collider(this.player, this.suelo, this.resetCountJump, null, this);
                this.physics.add.collider(this.player, this.cuerda, this.resetCountJump, null, this);

                this.player.setCollideWorldBounds(true);



                //grupo de arosfront y base aro
                for (let decoracion of arosadelante3) {
                    let positionX = 0;
                    for (let i = 0; i < decoracion.quantity; i++) {
                        //700 is the speed
                        let decoracionAux = this.decoracion.create((decoracion.seconds * 700) + positionX, decoracion.y, 'arofront');
                        positionX += decoracionAux.width;
                    }
                }
                for (let decoracion of cintalarga) {
                    let positionX = 0;
                    for (let i = 0; i < decoracion.quantity; i++) {
                        //700
                        let decoracionAux = this.decoracion.create((decoracion.seconds * 700) + positionX, decoracion.y, 'cintalarga').setOrigin(0);
                        positionX += decoracionAux.width;
                    }
                }

                //Grupo con el que colisiona el personaje principal___
                //grupo pie del aro
                this.obstaculo = this.physics.add.group();
                for (let obstaculo of response) {

                    let positionX = 0;

                    if (obstaculo.enemy == "MONO") {
                        for (let i = 0; i < obstaculo.quantity; i++) {
                            let obstaculoAux = this.obstaculo.create((obstaculo.seconds * 700) + positionX, obstaculo.y_value, "monito").setImmovable(true).setOrigin(0);
                            positionX += obstaculoAux.width;

                            this.anims.create({
                                key: 'monomove',
                                frames: this.anims.generateFrameNumbers('monito', { frames: [0, 1, 2] }),
                                frameRate: 6,
                                repeat: -1
                            });

                            obstaculoAux.play('monomove');
                        }
                    }
                    if (obstaculo.enemy == "ARO") {
                        for (let i = 0; i < obstaculo.quantity; i++) {
                            let obstaculoAux = this.obstaculo.create((obstaculo.seconds * 700) + positionX, obstaculo.y_value, "piearo").setImmovable(true);
                            positionX += obstaculoAux.width;
                        }
                    }
                    if (obstaculo.enemy == "PELOTA") {
                        for (let i = 0; i < obstaculo.quantity; i++) {
                            let obstaculoAux = this.obstaculo.create((obstaculo.seconds * 700) + positionX, obstaculo.y_value, "pelotaVerde").setImmovable(true);
                            positionX += obstaculoAux.width;
                        }
                    }
                    if (obstaculo.enemy == "CLAVAS") {
                        for (let i = 0; i < obstaculo.quantity; i++) {
                            let obstaculoAux = this.obstaculo.create((obstaculo.seconds * 700) + positionX, obstaculo.y_value, "clava").setImmovable(true);
                            positionX += obstaculoAux.width;
                        }
                    }
                    if (obstaculo.enemy == "TRAPESISTA") {
                        for (let i = 0; i < obstaculo.quantity; i++) {
                            let obstaculoAux = this.obstaculo.create((obstaculo.seconds * 700) + positionX, obstaculo.y_value, "trapesista").setImmovable(true);
                            positionX += obstaculoAux.width;
                        }
                    }
                }


                this.obstaculo.setVelocityX(-800); //velocidad con el que se movera los obstaculos
                this.decoracion.setVelocityX(-800); // velocidad con el que se movera la decoracion

                //colision del personaje principal con los obstaculos 

                this.physics.add.collider(this.player, this.obstaculo, this.onTouchObstaculo, null, this);

                //seteando tecla para que salte el personaje
                this.input.keyboard.on('keydown-W', this.onAction, this);
                this.input.keyboard.on('keydown-P', this.onPause, this);


                //creando los cambios de modo
                //canon
                this.modocanon = this.physics.add.sprite(15 * 700, 470, 'modoCanon').setOrigin(0, 1);
                this.modocanon.body.velocity.x = -700;

                this.physics.add.overlap(this.player, this.modocanon, this.changeCanon, null, this);
                //mono
                this.modomono = this.physics.add.sprite(30 * 700, 440, 'modoMono').setOrigin(0, 1);
                this.plataformamono = this.physics.add.sprite(29.97 * 700, 79, 'PlataformaMono').setOrigin(0, 1);
                this.modomono.body.velocity.x = -700;
                this.plataformamono.body.velocity.x = -700;
                this.physics.add.overlap(this.player, this.modomono, this.changeMono, null, this);
                //leon

                this.modoleon = this.physics.add.sprite(45 * 700, 500, 'modoLeon').setOrigin(0, 1);
                this.modoleon.body.velocity.x = -700;
                this.physics.add.overlap(this.player, this.modoleon, this.changeLeon, null, this);

                this.pastel = this.physics.add.sprite(58.5 * 700, 500, 'pastel').setOrigin(0, 1);
                this.pastel.body.velocity.x = -700;
                this.physics.add.collider(this.player, this.pastel, this.nextLevel, null, this);

                //explosion del cañon
                if (this.player.body.touching.right && this.modocanon.body.touching.left) {
                    this.disparo = this.physics.add.sprite(-15, 460, 'disparoCanon').setOrigin(0, 1);
                    this.disparo.body.velocity.x = -70000;
                }

                apiNivel.fetchNivel(3)
                    .then(response => {


                        for (let level of response) {
                            console.log(response);
                            this.add.text(500, 470, level.descripcion + "   |   " + "Usuario: " + nombreUsuario, { fontSize: 15, fontFamily: 'Montserrat' });
                        }
                    });
            });

    }

    update() {

    }


    onTouchObstaculo() {
        if (this.player.body.touching.right) {
            this.gameOver();
            this.muerte.play();
        } else if (this.player.body.touching.down && this.player.body.touching.up) {

        }
    }

    gameOver() {
        this.physics.pause();
        this.player.stop('run');
        this.musicNivel3.stop();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('gameOver');
            }
        })

    }

    onAction() {

        if (this.modeCanon) {
            this.player.body.velocity.y = -400;
        }

        if (this.jumpCount >= 1) {

            return;
        }

        if (this.modeMono) {
            this.player.body.velocity.y = 820;
            this.salto.play();
        }

        else if (this.modeLeon) {
            this.player.body.velocity.y = -750;
            this.salto.play();
        }

        this.jumpCount++;
    }

    resetCountJump() {
        this.jumpCount = 0;
    }

    changeLeon() {
        this.modeLeon = true;
        this.modeMono = false;
        this.modeCanon = false;

        this.rueda.visible = false;
        this.player.body.gravity.y = 4000;

        this.player.setTexture('corre1');

        this.player.stop('vicivici');
        this.player.play('run');
    }

    changeCanon() {
        this.modeCanon = true;
        this.modeLeon = false;
        this.modeMono = false;

        this.rueda.visible = false;
        this.player.body.gravity.y = 2000;

        this.player.setTexture('vuela');

        this.player.stop('run');
        this.player.stop('vicivici');
    }


    changeMono() {
        this.modeMono = true;
        this.modeCanon = false;
        this.modeLeon = false;


        this.player.body.gravity.y = -4000;
        this.rueda.visible = true;

        this.player.setTexture('vici');

        this.player.stop('run');
        this.player.play('vicivici');
    }

    nextLevel() {
        this.physics.pause();
        this.player.stop('run');
        this.musicNivel3.stop();
        this.soundNextLev.play();
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.scene.start('congratulation');
            }
        })
    }

    onPause() {
        if (this.pausa === false) {
            this.physics.pause();
            this.pausa = true;
            this.player.stop();
            this.startButton = this.add.sprite(400, 250, 'pauseButton');

            this.musicNivel3.pause();
        } else {
            this.physics.resume();
            this.pausa = false;
            if (this.modeLeon) {
                this.player.play('run');
            } else if (this.modeMono) {
                this.player.play('vicivici');
            }
            this.startButton.visible = false;
            this.musicNivel3.resume();
        }

    }

}
