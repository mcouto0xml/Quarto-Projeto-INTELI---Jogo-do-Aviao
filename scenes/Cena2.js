// Criando as variáveis
var teclado;
var plane;
var plane2;
var posMissel;
var missel;
var explosao;
var emcima = false;
var planes = [plane, plane2];
var i = 0;
var placar;
var pontuacao = 0;

// Criando a classe Cena2 para podermos nos referenciar a ela depois
class CenaS extends Phaser.Scene {


    constructor() {

        super ('CenaS')


        this.fogo;

    }


// Carregando as imagens da Cena1
    preload() {

        this.load.image('caça', 'assets/caça.png')
        this.load.image('fogo', 'assets/fogo.png')
        this.load.image('fundo', 'assets/fundo.jpg')
        this.load.image('missel', 'assets/missel.png')
        this.load.spritesheet('explosao', 'assets/explosao.png', {frameWidth: 140, frameHeight: 190});
        this.load.image('plane2', 'assets/plane2.png');

    }


// Criando os elementos do jogo
    create() {

        this.add.image(630, 300, 'fundo').setScale(0.7);
        this.fogo = this.physics.add.sprite(100, 100, 'fogo').setVisible(false);
        planes[0] = this.physics.add.sprite(200, 300, 'caça');
        
        while ( i < 1 ) {  
            
            planes[1] = this.physics.add.sprite(800, 500, 'plane2').setScale(0.5);
            i = i + 1;
        }

        missel = this.physics.add.sprite(1100, 600, 'missel').setFlip(true, false);


        // Criando a animação do explodir do missel
        explosao = this.anims.create({
            key: 'explodido',
            frames: this.anims.generateFrameNumbers('explosao', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: 1
        });

        // Arrumando a gravidade de alguns elementos do jogo
        this.fogo.body.allowGravity = false;
        missel.body.allowGravity = false;
        planes[1].body.allowGravity = false;
        
        // Adicionando velocidade ao míssel
        missel.setVelocityX(-450);
        
        // Adicionando a função do teclado do jogo
        teclado = this.input.keyboard.createCursorKeys();

        // Fazendo a lógica do Avião tocar no míssel
        this.physics.add.overlap(planes[0], missel, function() {
            emcima = true
        })

        planes[0].setCollideWorldBounds(true);

        planes[1].body.setSize(450, 300);

        this.physics.add.collider(planes[0], planes[1]);

        placar = this.add.text(60, 50, 'Pontos:' + pontuacao, {fontSize:'45px', fill:'#000000'});


        

    }


    // Criando uma função para adicionar comandos para o teclado
    tecladasso(x) {
        x = this.input.keyboard.createCursorKeys();
        return teclado;
    };

    // Atualizando o código com alguns elementos
    update() {

        teclado = this.tecladasso(teclado);

        // Atualizando o posição do fogo conforme o avião anda
        this.fogo.x = planes[0].x - 150
        this.fogo.y = planes[0].y + 15


        // Colocando os comandos do teclado no avião
        if (teclado.left.isDown) {
            
            this.fogo.setVisible(false);
            planes[0].setVelocityX(-200);

        }

        else if (teclado.right.isDown) {
            
            this.fogo.setVisible(true);
            planes[0].setVelocityX(200);

        }

        else  {

            this.fogo.setVisible(false);
            planes[0].setVelocityX(0);

        }

        if (teclado.up.isDown) {
            planes[0].setVelocityY(-200);
        }

        else if (teclado.down.isDown) {
            
            planes[0].setVelocityY(200);

        }

        else {

            planes[0].setVelocityY(0);

        }
        
        // Condição do míssel passar da barreira do mundo
        if (missel.x < 0) {

            
            explosao = this.add.sprite(missel.x+50, missel.y, 'explosao');
            posMissel = Phaser.Math.RND.between(20, 580);
            missel.setPosition(1300, posMissel);
            explosao.anims.play('explodido');
            explosao.on('animationcomplete', function () {
                
                explosao.destroy();
                pontuacao = pontuacao + 1
                placar.setText('Pontos:' + pontuacao);
            })

        }

        // Condição para começar a próxima cena
        if (emcima === true) {

            game.scene.start('CenaT');
            game.scene.stop('CenaS');

        }

    }


}