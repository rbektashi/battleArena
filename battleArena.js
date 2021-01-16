MAX_LEVEL = 20;
class Dream {
  constructor() {
      this.battleArena = new BattleArena();
  }

  restart(){
      this.battleArena = new BattleArena();
  }
}

class User {
  constructor(dream) {
    this.dream = dream;
    this.stamina = 10;
    this.panicLevel = 10;
    this.remainingRolls = 10;
  }

  set stamina(newStamina) {
    if (newStamina <= 0) {
      this.die();
    }
  }

  set panicLevel(newPanicLevel) {
    if (newPanicLevel >= MAX_LEVEL) {
      this.die();
    }
  }

  getHit() {
    this.panicLevel += 2;
  }

  dodge() {
    this.stamina -= 1;
  }

  deflect() {}

  glancingBlow(enemy) {
    this.panic -= 1;
    enemy.receiveGlancingBlow()
  }
  die() {
      this.dream.restart();
  }

  pushAwayEnemy(enemy){
    enemy.backAway();
    this.stamina += 1;
  }

  giveSignificantDamage(enemy){
    enemy.takeSignificantDamage();
    this.panic -= 3;
    this.stamina += 2;
  }

  reactToEnemyDeath(){
    this.panic +=1;
    this.stamina -=1;
  }
  rollDie(die) {
    die.roll();
  }
    takeSignificantDamage()
}

class BattleArena {
  constructor() {
    this.enemies = [];
  }

  takeTurn(user, enemy, die) {
    user.rollDie(die);

    if (die.face == 1) {
      user.getHit();
    }
    if (die.face == 2) {
      user.dodge();
    }
    if (die.face == 3) {
      user.deflect();
    }
    if (die.face == 4) {
        user.pushAwayEnemy(enemy);
    }
    if (die.face == 5) {
      enemy.dodge();
      user.glancingBlow(enemy);
    }
    if (die.face == 6) {
        user.giveSignificantDamage(enemy);

    }
    if(!enemy.dead){
        user.reactToEnemyDeath()
    } else if (enemy.dead){
        this.addEnemyToArena();
    }

    user.remainingRolls -= 1;
    if(user.remainingRolls <= 0){
        user.panic = MAX_LEVEL;
    }
    if(player.dead){
        this.dream.startOver();
    }
  }

  addEnemyToArena(){
    this.enemies.push(new Enemy());
  }  
}

class Enemy {
  constructor() {
    this.hitPoints = 10;
  }

  set hitPoints(newHitPoints) {
    if (newHitPoints <= 0) {
      this.die();
    }
  }

  takeSignificantDamage(){
    this.hitPoints -= 5;     
  }
  receiveGlancingBlow(){
    this.hitPoints -= 3;
  }
  die() {}
  dodge() {}
}

class Die {
  constructor() {
    this.face = null;
  }
  roll() {
    this.face = new Random().Next(1, 7);
  }
}
