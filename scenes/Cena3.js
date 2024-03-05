
// Criando a classe Cena3 para podermos nos referenciar a ela mais tarde
class CenaT extends Phaser.Scene {


    constructor() {

        super ('CenaT')


    }

    // Carregando as imagens
    preload() {

        this.load.image('f22', 'assets/f22caido.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('tryagain', 'assets/tryagain.png');

    }
    
    // Criando as imagens
    create() {

        this.add.image(630, 300, 'f22').setScale(0.8);
        this.add.image(630, 150, 'gameover');
        this.add.image(630, 450, 'tryagain');

    }

    update() {

    }

}