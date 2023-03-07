(function() {
  var BodyParty, DELAY, HEIGHT, WIDTH, background, canvas, ctx, draw, earth, global, jupiter, main, mars, mercury, netuno, player, rad, saturn, start, uranus, venus;

  canvas = document.getElementById("canvas");

  ctx = canvas.getContext("2d");

  WIDTH = document.body.clientWidth;

  HEIGHT = document.body.clientHeight;

  DELAY = 40;

  rad = function(x) {
    return x * Math.PI / 180;
  };

  global = {
    x: WIDTH / 2,
    y: HEIGHT / 2
  };

  background = {
    start: function() {
      return this.space = "#222234";
    },
    draw: function() {
      ctx.fillStyle = this.space;
      return ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
  };

  player = class player {
    constructor(col = "yellow", radi = 5, dis = 10, spd = 5) {
      this.color = col;
      this.radius = radi / 3;
      this.angle = 0;
      this.distance = dis * 22;
      this.speed = spd;
      this.position = {
        x: Math.cos(rad(this.angle)) * this.distance + global.x,
        y: Math.sin(rad(this.angle)) * this.distance + global.y
      };
      this.draw = function() {
        this.angle += this.speed;
        if (this.angle >= 360) {
          this.angle = 0;
        }
        this.position = {
          x: Math.cos(rad(this.angle)) * this.distance + global.x,
          y: Math.sin(rad(this.angle)) * this.distance + global.y
        };
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.1;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(global.x, global.y, this.distance, 0, Math.PI * 2);
        return ctx.stroke();
      };
    }

  };

  //! name             |  color  | radi | dist |  spd  |
  mercury = new player("#DE4422", 2.43, 0.38, 4.892);

  venus = new player("#EE2211", 6.05, 0.72, 3.502);

  earth = new player("#2222EE", 6.37, 1.00, 2.978);

  mars = new player("#EEAA22", 3.39, 1.52, 2.407);

  jupiter = new player("#EEAA22", 71.5, 5.21, 1.305);

  saturn = new player("#EEAA22", 60.3, 9.54, 0.964);

  uranus = new player("#DDCCFF", 51.1, 19.2, 0.681);

  netuno = new player("#CCBBFF", 49.5, 30.1, 0.543);

  
  //! $$$$             |  $$$$$  | $$$$ | $$$$ |  $$$  |
  BodyParty = [background, mercury, venus, earth, mars, jupiter, saturn, uranus, netuno];

  start = function() { //? Call once on the start
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    BodyParty.forEach(function(obj) {
      if (obj.start !== void 0) {
        return obj.start();
      }
    });
  };

  draw = function() { //? Call once each frame
    BodyParty.forEach(function(obj) {
      return obj.draw();
    });
  };

  //region #? maincode 
  main = () => {
    draw();
    return setTimeout(main, DELAY);
  };

  document.addEventListener("DOMContentLoaded", function() {
    start();
    return requestAnimationFrame(main);
  });

  //endregion

}).call(this);


//# sourceMappingURL=script.js.map
//# sourceURL=coffeescript