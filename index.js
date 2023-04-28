//we can grab our canvas element by using querySelector()
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

//window.innerHeight - grabbing the opened windows height and width
canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary
{
    static width = 40;
    static height = 40;
    constructor({position, velocity})
    {
        this.position = position
        this.width = 40;
        this.height = 40;
    }

    draw()
    {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class PacMan
{
    constructor({position, velocity})
    {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
    }

    draw()
    {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "yellow";
        c.fill();
        c.closePath();
    }

    update()
    {
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const boundaries = []
const player = new PacMan({position: {x: Boundary.width + Boundary.width / 2, y: Boundary.height + Boundary.height / 2}, velocity: {x: 0, y: 0}});

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},

}

const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-']
]

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol)
        {
            case '-':
                boundaries.push(new Boundary({position: {x: j * Boundary.width, y: i * Boundary.height}}))
                break;
        }
    })
})

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    
    player.update();
}

animate();

addEventListener("keydown", ({key}) =>
{
    switch(key)
    {
        case 'w': 
        keys.w.pressed = true;
        break;
        case 'a': 
        keys.a.pressed = true;
        break;
        case 's': 
        keys.s.pressed = true;
        break;
        case 'd': 
        keys.d.pressed = true;
        break;
    }
    console.log(key, player.velocity);
})

addEventListener("keydown", ({key}) =>
{
    switch(key)
    {
        case 'w': 
        keys.w.pressed = false;
        break;
        case 'a': 
        keys.a.pressed = false;
        break;
        case 's': 
        keys.s.pressed = false;
        break;
        case 'd': 
        keys.d.pressed = false;
        break;
    }
    console.log(key, player.velocity);
})

