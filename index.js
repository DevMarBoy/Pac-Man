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
    d: {pressed: false}
}

let lastKey = "";

const map = [
    ['-','-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-']
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

function CircleCollidesWithRectangle({circle, rectangle})
{
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && 
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width);
}

function animate()
{
    requestAnimationFrame(animate);

    c.clearRect(0,0, canvas.width, canvas.height);

    if(keys.w.pressed && lastKey === "w")
    {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
        if(CircleCollidesWithRectangle({circle: {...player, velocity: {x: 0, y: -5}}, rectangle: boundary}))
        {
            player.velocity.y = 0;
            break;
        }
        else
        {
            player.velocity.y = -5;
        }
    }

    }
    if(keys.a.pressed && lastKey === "a")
    {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
        if(CircleCollidesWithRectangle({circle: {...player, velocity: {x: -5, y: 0}}, rectangle: boundary}))
        {
            player.velocity.x = 0;
            break;
        }
        else
        {
            player.velocity.x = -5;
        }
        }
    }
    if(keys.s.pressed && lastKey === "s")
    {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
        if(CircleCollidesWithRectangle({circle: {...player, velocity: {x: 0, y: 5}}, rectangle: boundary}))
        {
            player.velocity.y = 0;
            break;
        }
        else
        {
            player.velocity.y = 5;
        }
    }
    }
    if(keys.d.pressed && lastKey === "d")
    {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
        if(CircleCollidesWithRectangle({circle: {...player, velocity: {x: 5, y: 0}}, rectangle: boundary}))
        {
            player.velocity.x = 0;
            break;
        }
        else
        {
            player.velocity.x = 5;
        }
        }
    }

    boundaries.forEach(boundary => {
        boundary.draw();
        if(CircleCollidesWithRectangle({circle: player, rectangle: boundary}))
        {
            console.log("collision has occured", player.position.y, player.position.y - player.radius + player.velocity.y);
            player.velocity.x = 0;
            player.velocity.y = 0;

        }
    })

    player.update();

    // player.velocity.y = 0;
    // player.velocity.x = 0;

}

animate();

addEventListener("keydown", ({key}) =>
{
    switch(key)
    {
        case 'w': 
        keys.w.pressed = true;
        lastKey = "w";
        break;
        case 'a': 
        keys.a.pressed = true;
        lastKey = "a";
        break;
        case 's': 
        keys.s.pressed = true;
        lastKey = "s";
        break;
        case 'd': 
        keys.d.pressed = true;
        lastKey = "d";
        break;
    }
})

addEventListener("keyup", ({key}) =>
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
})
