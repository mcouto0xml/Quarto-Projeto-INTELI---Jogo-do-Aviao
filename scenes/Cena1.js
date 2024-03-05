// Criando as variáveis da Cena1
var comandos;

// Criando a classe da Cena1 para podermos nos referenciar a ela depois
class CenaP extends Phaser.Scene {



// Construindo a chave a qual iremos chamar a cena e as variáveis
    constructor() {

        // Chaves
        super ('CenaP')

        //Variáveis
        this.start;
        this.clique = false;


    }

// Carregando as imagens

    preload() {

        this.load.image('menu', 'assets/menu.jpg');
        this.load.image('start', 'assets/start.png');

    }

// Criando os elementos do jogo
    create() {

        this.add.image(630, 320, 'menu');
        this.start = this.physics.add.staticImage(630, 450, 'start').setScale(0.5);

        this.start.setInteractive();

        // Lógica de quando clicar no botão de start
        this.start.on("pointerup", function () {
            this.clique = true;
            game.scene.start('CenaS');
            game.scene.stop('CenaP');
        });

        // Adicionando o texto 
        comandos = this.add.text(50, 50, 'Movimente com as setas e clique em Start para Iniciar', {fontSize:'35px', fill:'#000000'});

    }

    update() {



    }


}