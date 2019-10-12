var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors;
var dory;

function preload ()
{
    this.load.image('ocean', 'assets/deepblue.jpg');
    this.load.image('fishRight', 'assets/fishRight.png');
    this.load.image('sharkLeft', 'assets/sharkLeft.png');
    this.load.image('sharkRight', 'assets/sharkRight.png');
}

function create ()
{
    this.add.image(0,0,'ocean').setScale(.5);
   dory = this.add.image(200,400,'fishRight').setScale(.05);
    this.add.image(500,400,'sharkLeft').setScale(.2);
    this.add.image(400,200,'sharkRight').setScale(.19);

    cursors = this.input.keyboard.createCursorKeys();

}

function update ()
{
    if (cursors.left.isDown)
    {
        dory.x -= 8;
        dory.scale.x = -1;
    }
    else if (cursors.right.isDown)
    {
        dory.x += 8;
        dory.scale.x = 1;
    }

    if (cursors.up.isDown)
    {
        dory.y -= 8;
    }
    else if (cursors.down.isDown)
    {
        dory.y += 8;
    }
}