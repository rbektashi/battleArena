/*
Set-Up
In the dream, the user finds themselves trapped in a battle arena. They have two stats that determine their survival
1. Stamina – starts at 10. If it reaches 0, the user dies
2. Panic Level – starts at 10. If it reaches 20, the user dies
In the arena, the user must battle enemies. The enemy starts with 10 hit points and dies when that reaches 0. 

Dice Roll
The user does battle by rolling a die each turn (int diceRoll = new Random().Next(1, 7);). 
The following list details the effect of each roll.

1 – The user gets hit, and their panic level increases by 2
2 – The user dodges the attack, but their stamina is reduced by 1
3 – The user deflects the attack. There is no stat change
4 – The enemy backs away; the user’s stamina increases by 1
5 – The enemy dodges, but the user strikes a glancing blow. The user’s panic is reduced by 1. The enemy loses 3 hit points. 
6 – The enemy takes significant damage. The user’s panic is reduced by 3. Their stamina is increased by 2. The enemy loses 5 hit points. 

The user has 10 rolls of the die to defeat the enemy. 

Battle Results
After every roll, if the enemy has not died, the user’s panic increases by 1. Their stamina is reduced by 1. 

If the enemy has died, another enemy enters the arena. The player’s panic and stamina stay where it is. 

If the player has run out of turns, their panic reaches the max level. 
If the player has died, the dream starts over from the beginning. 

Final Instructions
Coding is supposed to be fun, so get creative and have a good time with this. Share your GitHub link when your done so I can see what you came up with.
*/

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
