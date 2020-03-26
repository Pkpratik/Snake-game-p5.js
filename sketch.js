var scl = 20
var score = 0
var hs = 0
var food
var pre = 0
var movement = 0

function setup() {
  fill(100)
  createCanvas(460, 440);
  s = new Snake()
  frameRate(10)
  pl()
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var element = document.getElementById('text');
  if (isMobile) {
    rb = createButton("Right")
    rb.size(100, 60)
    rb.position(320, 540)
    db = createButton("Down")
    db.size(100, 60)
    db.position(170, 630)
    ub = createButton("Up")
    ub.size(100, 60)
    ub.position(170, 450)
    lb = createButton("Left")
    lb.size(100, 60)
    lb.position(20, 540)
    lb.mousePressed(lbp)
    rb.mousePressed(rbp)
    ub.mousePressed(ubp)
    db.mousePressed(dbp)
  }
}

function lbp() {
  if (pre != "right") {
    s.dir(-1, 0)
    pre = "left"
  }
}

function rbp() {
  if (pre != "left") {
    s.dir(1, 0)
    pre = "right"
  }
}

function ubp() {
  if (pre != "down") {
    s.dir(0, -1)
    pre = "up"
  }
}

function dbp() {
  if (pre != "up") {
    s.dir(0, 1)
    pre = "down"
  }
}

function pl() {
  var cols = floor(width / scl)
  var rows = floor(height / scl)
  food = createVector(floor(random(2, cols - 2)), floor(random(2, rows - 2)))
  food.mult(scl)
  
}


function draw() {
  background(255);
  fill(0, 0, 255)
  textSize(20)
  text(`Current Score - ${score}            Highest Score - ${hs}`, 14, 15)
  fill(0, 255, 0)
  noStroke()
  rect(20, 20, 440, 20)
  rect(440, 20, 20, 400)
  rect(0, 420, 460, 20)
  rect(0, 20, 20, 420)
  var arr=[]
  s.death()
  s.update()
  s.show()
  if (s.eat(food)) {
    pl()
    score++
  }
  fill(255, 0, 100)
  rect(food.x, food.y, scl, scl)

}

function keyPressed() {
  if (keyCode === UP_ARROW && movement != "down") {
    s.dir(0, -1)
    movement = "up"
  } else if (keyCode === DOWN_ARROW && movement != "up") {
    s.dir(0, 1)
    movement = "down"
  } else if (keyCode === RIGHT_ARROW && movement != "left") {
    s.dir(1, 0)
    movement = "right"
  } else if (keyCode === LEFT_ARROW && movement != "right") {
    s.dir(-1, 0)
    movement = "left"
  }
}

function Snake() {
  this.x = 20
  this.y = 40
  this.xspeed = 1
  this.yspeed = 0
  this.total = 0
  this.tail = []
  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i]
      var d = dist(this.x, this.y, pos.x, pos.y)
      if (d < 1) {
        this.total = 0
        this.tail = []
        if (score > hs) {
          hs = score
        }
        score = 0
      }
    }
  }
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y)
    if (d < scl / 10) {
      this.total++
      return true
    } else {
      return false
    }
  }
  this.dir = function(x, y) {
    this.xspeed = x
    this.yspeed = y
  }
  this.update = function() {
    if (this.total === this.tail.length) {
      this.tail.shift()
    }
    this.tail[this.total - 1] = createVector(this.x, this.y)
    this.x = this.x + this.xspeed * scl
    this.y = this.y + this.yspeed * scl
    this.x = constrain(this.x, 20, width - scl - 20)
    this.y = constrain(this.y, 40, height - scl - 20)
  }
  this.show = function() {
    fill(105)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl)
    }
    fill(51)
    rect(this.x, this.y, scl, scl)
  }
  
}