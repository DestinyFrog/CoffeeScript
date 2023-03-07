canvas = document.getElementById "canvas"
ctx = canvas.getContext "2d"

WIDTH  = document.body.clientWidth
HEIGHT = document.body.clientHeight
DELAY  = 40

rad = ( x ) -> x * Math.PI/180

global =
    x: WIDTH/2
    y: HEIGHT/2
background =
    start: ->
        @space = "#222234"
    draw: ->
        ctx.fillStyle = @space
        ctx.fillRect 0, 0, WIDTH, HEIGHT

class player
    constructor: ( col = "yellow", radi = 5, dis = 10, spd = 5 ) ->
        @color = col
        @radius = radi / 3
        @angle = 0
        @distance = dis * 22
        @speed = spd

        @position =
            x: Math.cos( rad @angle ) * @distance + global.x
            y: Math.sin( rad @angle ) * @distance + global.y

        @draw = ->
            @angle += @speed
            if @angle >= 360
                @angle = 0
            @position =
                x: Math.cos( rad @angle ) * @distance + global.x
                y: Math.sin( rad @angle ) * @distance + global.y

            ctx.fillStyle = @color
            ctx.strokeStyle = @color
            ctx.lineWidth = 0.1

            ctx.beginPath()
            ctx.arc @position.x, @position.y, @radius, 0, Math.PI * 2
            ctx.fill()

            ctx.beginPath()
            ctx.arc global.x, global.y, @distance, 0, Math.PI * 2
            ctx.stroke()

#! name             |  color  | radi | dist |  spd  |
mercury = new player "#DE4422", 2.43 , 0.38 , 4.892
venus   = new player "#EE2211", 6.05 , 0.72 , 3.502
earth   = new player "#2222EE", 6.37 , 1.00 , 2.978
mars    = new player "#EEAA22", 3.39 , 1.52 , 2.407
jupiter = new player "#EEAA22", 71.5 , 5.21 , 1.305
saturn  = new player "#EEAA22", 60.3 , 9.54 , 0.964
uranus  = new player "#DDCCFF", 51.1 , 19.2 , 0.681
netuno  = new player "#CCBBFF", 49.5 , 30.1 , 0.543 
#! $$$$             |  $$$$$  | $$$$ | $$$$ |  $$$  |

BodyParty = [ background, mercury, venus, earth, mars, jupiter, saturn, uranus, netuno ]

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

#region #? maincode 
main = () =>
    draw()
    setTimeout main , DELAY 

document.addEventListener( "DOMContentLoaded", () -> 
    start()
    requestAnimationFrame( main )
)
#endregion