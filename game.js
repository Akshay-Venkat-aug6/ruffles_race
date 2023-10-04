const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const ClickToStart = document.querySelector('.ClickToStart');
ClickToStart.addEventListener('click', Start);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
let keys = {
  ArrowUp: true,
  ArrowDown: true,
  ArrowLeft: false,
  ArrowRight: false,
}
let player = {
  speed: 5,
  score: 0,
  highScore: 0
};
function keydown(e) {
  keys[e.key] = true
}
function keyup(e) {
  keys[e.key] = false;
}

function c(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let chipPosition = c(0,2);

let counter = 0;
let carLeftPosition;

// starting the game
function Start() {
  counter = 0;
  carLeftPosition = 0;
  player.speed = 5;

  gameArea.innerHTML = "";
  startScreen.classList.add('hide');
  player.isStart = true;
  player.score = 0;
  window.requestAnimationFrame(Play);
  // creating the road lines
  for (i = 0; i < 15; i++) {
    let roadLines = document.createElement('div');
    roadLines.setAttribute('class', 'roadLines');
    roadLines.y = (i * 100);
    roadLines.style.top = roadLines.y + "px";
    gameArea.appendChild(roadLines);

    let roadLines_1 = document.createElement('div');
    roadLines_1.setAttribute('class', 'roadLines_1');
    roadLines_1.y = (i * 100);
    roadLines_1.style.top = roadLines_1.y + "px";
    gameArea.appendChild(roadLines_1);
  }
  // creating the opponents car
  for (i = 0; i < 3; i++) {
    let Opponents = document.createElement('div');
    Opponents.setAttribute('class', 'Opponents');
    Opponents.y = ((i) * -300);
    Opponents.style.top = Opponents.y + "px";
    gameArea.appendChild(Opponents);
    let random_image = randomColor();
    let lfSd = Math.floor(Math.random() * 300);
    console.log("lfSd: ", lfSd)
    if(lfSd < 70) {
      Opponents.style.left = '70px'
    } else {
      Opponents.style.left = lfSd > 250 ? 250 : lfSd + "px";
    }
    // Opponents.style.left = lfSd > 250 ? 250 : lfSd + "px";
    Opponents.style.background=`url(${random_image})`;
    Opponents.style.backgroundSize = '100% 100%';
    function randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    const rndInt = randomIntFromInterval(1, 2)
    if (i === chipPosition) {
      // Chips
      let PotatoChips = document.createElement('div');
      PotatoChips.setAttribute('class', 'PotatoChips');
      PotatoChips.setAttribute('key', chipPosition)
      PotatoChips.y = ((i) * -300);
      PotatoChips.style.top = PotatoChips.y + "px";
      gameArea.appendChild(PotatoChips);
      PotatoChips.style.left = '200px'
      PotatoChips.style.transform = 'rotate('+lfSd+'deg)';
      PotatoChips.style.background=`url(potato_chip_`+rndInt+`.png)`;
      PotatoChips.style.backgroundSize = '100% 100%'
    }
  }
  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  let finishLine = document.createElement('div');
  finishLine.setAttribute('class', 'finishLine');
  finishLine.y = ((i) * -300);
  finishLine.style.top = finishLine.y+"px"
  gameArea.appendChild(finishLine);

  let chipcar = document.createElement('div');
  chipcar.setAttribute('class', 'chipcar');
  gameArea.appendChild(chipcar);
  player.x = chipcar.offsetLeft;
  player.y = chipcar.offsetTop;
}

function randomColor(){
  const car_png = [ 'kart-red.png', 'kart-yellow.png', 'kart-red.png', 'kart-yellow.png', 'kart-red.png', 'kart-yellow.png' ]
  function c(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return car_png[c(0, 5)];
}

//play the game
function Play() {
  let car = document.querySelector('.car');
  let chipcar = document.querySelector('.chipcar');
  if (player.isStart) {
    moveLines();
    moveOpponents(car);
    moveChips(chipcar)
    if (keys.ArrowRight && player.x < 250) { player.x += player.speed }
    if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
    car.style.top = player.y + "px";
    chipcar.style.top = player.y + "px";

    if(player.x < 70) {
      car.style.left = "70px";
      chipcar.style.left = "70px";
      player.x = 70;
    } else {
      car.style.left = player.x + "px";
      chipcar.style.left = player.x + "px";
    }

    window.requestAnimationFrame(Play);
  }
}

function arrowRight () {
  let car = document.querySelector('.car');
  let chipcar = document.querySelector('.chipcar');
  // if (player.isStart) {
    moveLines();
    moveOpponents(car);
    moveChips(chipcar)
    if (keys.ArrowRight && player.x < 250) { player.x += player.speed }
    if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
    car.style.top = player.y + "px";
    chipcar.style.top = player.y + "px";

    if(player.x < 57) {
      car.style.left = "70px";
      chipcar.style.left = "70px";
    } else {
      car.style.left = player.x + "px";
      chipcar.style.left = player.x + "px";
    }
    // window.requestAnimationFrame(arrowRight);
  // }
}

function moveLines() {
  let roadLines = document.querySelectorAll('.roadLines');
  roadLines.forEach(function (item) {
    if (item.y >= 700)
      item.y -= 700;
      item.y += player.speed;
      item.style.top = item.y + "px";
    }
  )

  let roadLines_1 = document.querySelectorAll('.roadLines_1');
  roadLines_1.forEach(function (item) {
    if (item.y >= 700)
      item.y -= 700;
      item.y += player.speed;
      item.style.top = item.y + "px";
    }
  )
}

function finalLine() {
  finishLine = document.querySelectorAll('.finishLine');
  let finalTop;
  let car = document.querySelector('.car');
  finishLine.forEach(function (item) {
    if(isCollide(car, item)) {
      endGame()
    }
    item.style.display = 'block';
    item.style.top = "0px";

    if (item.y >= 700)
      item.y -= 700;
      item.y += player.speed;
      item.style.top = item.y + "px";
      finalTop = item.y
    }
  )

  // Hide the Cars after touching the FInish Line
  let Opponents = document.querySelectorAll('.Opponents');
  Opponents.forEach(function (item) {
    if(finalTop > item.y) {
      item.style.display = "none"
    }
  });

  // Hide the Chips after touching the FInish Line
  let Chips = document.querySelectorAll('.PotatoChips');
  Chips.forEach(function (item) {
    if(finalTop > item.y) {
      item.style.display = "none"
    }
  });
};


function moveOpponents(car, chips) {
  let Opponents = document.querySelectorAll('.Opponents');
  Opponents.forEach(function (item) {
    if (isCollide(car, item)) {
      endGame();
    }
    if (item.y >= 750) {
      item.y -= 900;
      let lfSd = Math.floor(Math.random() * 300);
      if(lfSd < 70) {
        lfSd = 70
      } else {
        lfSd =  lfSd > 250 ? 250 : lfSd
      }
      item.style.left = lfSd + "px";
      console.log("Left Posi: ", lfSd)
      carLeftPosition = lfSd
    }
    // console.log("Left Position: ", carLeftPosition)
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
  
}


function moveChips(chips) {
  let Chips = document.querySelectorAll('.PotatoChips');
  let chipsCountGray = document.querySelectorAll('.chips-count-gray');
  
  Chips.forEach(function (item) {
    let isColliding = isCollide(chips, item);
    if (isColliding) {
      item.style.display = 'none';
      counter += 1;
      console.log(counter,'counter');
      setInterval(() => {
        if(item.style.display === 'none') {
          
          item.style.display = 'block'
        }
      }, 5000)

    }
    if (item.y >= 750) {
      item.y -= 800;
      let lfSd = Math.floor(Math.random() * 300);
      if(lfSd < 70) {
        lfSd = 70
      } else {
        lfSd =  lfSd > 250 ? 250 : lfSd
      }

      if(lfSd === carLeftPosition || carLeftPosition < 70) {
        lfsd = 140
      } else if(lfSd === carLeftPosition || carLeftPosition > 70 & carLeftPosition < 150) {
        lfsd = 250
      } else if (lfSd === carLeftPosition || carLeftPosition > 150 & carLeftPosition < 250) {
        lfSd = 70
      }

      item.style.left = lfSd + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
    if (counter > 0 && counter <= 5) {
      chipsCountGray[counter-1].src = "assets/yellow_chip.png";

    }
    // chips collect
    if(counter > 4) {
      chipsCollect();
    }
  })
};

// Chips Collect Function
function chipsCollect() {
  finalLine()
}

//check whether the cars collide or not
function isCollide(a, b) {
  aRect = a?.getBoundingClientRect();
  bRect = b?.getBoundingClientRect();
  return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

let lastDigit = (num) => num % 10;

//game is end
function endGame(type) {
  player.isStart = false;
  player.speed = 5;
  startScreen.classList.remove('hide');
}