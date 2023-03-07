canvas = document.getElementById "canvas"
ctx = canvas.getContext "2d"

WIDTH  = 400
HEIGHT = WIDTH
DELAY  = 100

rad = ( x ) -> x * Math.PI/180
global =
    x: WIDTH/2
    y: HEIGHT/2
background =
    start: () ->
        @ice = "#EEEEFF"
        @dark_ice = "#DDDDDD"
    draw: () ->
        ctx.fillStyle = @ice
        ctx.fillRect 0, 0, WIDTH, HEIGHT

        ctx.strokeStyle = @dark_ice
        ctx.beginPath()

        for i in [ 1..WIDTH ] by 25
            ctx.moveTo i, 0
            ctx.lineTo i, WIDTH

            ctx.moveTo 0, i
            ctx.lineTo HEIGHT, i

        ctx.stroke()

class player
    constructor: ( col = "yellow", radi = 5, dis = 10, spd = 5 ) ->
        @color = col
        @radius = radi
        @angle = 0
        @distance = dis
        @speed = spd

        @position =
            x: Math.cos( rad @angle ) * @distance + global.x
            y: Math.sin( rad @angle ) * @distance + global.y

        @draw = () ->
            @angle += @speed

            if @angle >= 360
                @angle = 0

            @position =
                x: Math.cos( rad @angle ) * @distance + global.x
                y: Math.sin( rad @angle ) * @distance + global.y

            ctx.fillStyle = @color
            ctx.strokeStyle = @color

            ctx.beginPath()

            ctx.arc @position.x, @position.y, @radius, 0, Math.PI * 2
            ctx.fill()

            ctx.moveTo global.x, @position.y
            ctx.lineTo @position.x, @position.y

            ctx.moveTo @position.x, global.y
            ctx.lineTo @position.x, @position.y

            ctx.stroke()

            ctx.closePath()

mercury = new player "#DE4422", 6 , 20 , 15
venus   = new player "#EE2211", 10, 60 , 7
earth   = new player "#2222EE", 14, 120, 3
mars    = new player "#EEAA22", 11, 180, 2

BodyParty = [ background, mercury, venus, earth, mars ]

start = () -> #? Call once on the start
    canvas.width  = WIDTH
    canvas.height  = HEIGHT
    BodyParty.forEach (obj) ->
        if obj.start != undefined
            obj.start()
    return
draw  = () -> #? Call once each frame
    BodyParty.forEach (obj) -> obj.draw()
    return

#region maincode 
main = () =>
    draw()
    setTimeout main , DELAY 

document.addEventListener( "DOMContentLoaded", () -> 
    start()
    requestAnimationFrame( main )
)
#endregion