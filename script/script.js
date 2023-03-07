(function() {
  var BodyParty, DELAY, HEIGHT, WIDTH, background, canvas, ctx, draw, earth, global, main, mars, mercury, player, rad, start, venus;

  canvas = document.getElementById("canvas");

  ctx = canvas.getContext("2d");

  WIDTH = 400;

  HEIGHT = WIDTH;

  DELAY = 100;

  rad = function(x) {
    return x * Math.PI / 180;
  };

  global = {
    x: WIDTH / 2,
    y: HEIGHT / 2
  };

  background = {
    start: function() {
      this.ice = "#EEEEFF";
      return this.dark_ice = "#DDDDDD";
    },
    draw: function() {
      var i, j, ref;
      ctx.fillStyle = this.ice;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.strokeStyle = this.dark_ice;
      ctx.beginPath();
      for (i = j = 1, ref = WIDTH; j <= ref; i = j += 25) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, WIDTH);
        ctx.moveTo(0, i);
        ctx.lineTo(HEIGHT, i);
      }
      return ctx.stroke();
    }
  };

  player = class player {
    constructor(col = "yellow", radi = 5, dis = 10, spd = 5) {
      this.color = col;
      this.radius = radi;
      this.angle = 0;
      this.distance = dis;
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
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.moveTo(global.x, this.position.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.moveTo(this.position.x, global.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.stroke();
        return ctx.closePath();
      };
    }

  };

  mercury = new player("#DE4422", 6, 20, 15);

  venus = new player("#EE2211", 10, 60, 7);

  earth = new player("#2222EE", 14, 120, 3);

  mars = new player("#EEAA22", 11, 180, 2);

  BodyParty = [background, mercury, venus, earth, mars];

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

  //region maincode 
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