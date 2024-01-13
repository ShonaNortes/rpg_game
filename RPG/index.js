class Character {
  constructor(name, hp, dmg, mana) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = "playing";
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      hg;
      this.hp = 0;
      this.status = "loser";
    }
  }

  dealDamage(target) {
    target.takeDamage(this.dmg);
    console.log(
      `${this.name} attacks ${target.name}. Deals ${this.dmg} damage.`
    );
  }
}

class Fighter extends Character {
  constructor(name) {
    super(name, 12, 4, 40);
    this.specialAttackCost = 20;
  }

  specialAttack(target) {
    if (this.mana >= this.specialAttackCost) {
      target.takeDamage(5);
      this.mana -= this.specialAttackCost;
      console.log(`${this.name} uses Dark Vision on ${target.name}.`);
    } else {
      console.log("Not enough mana to perform special attack.");
      this.dealDamage(target);
    }
  }
}

class Paladin extends Character {
  constructor(name) {
    super(name, 16, 3, 160);
    this.specialAttackCost = 40;
  }

  specialAttack(target) {
    if (this.mana >= this.specialAttackCost) {
      target.takeDamage(4);
      this.hp += 5;
      this.mana -= this.specialAttackCost;
      console.log(`${this.name} uses Healing Lighting on ${target.name}.`);
    } else {
      console.log("Not enough mana to perform special attack.");
      this.dealDamage(target);
    }
  }
}

class Monk extends Character {
  constructor(name) {
    super(name, 8, 2, 200);
    this.specialAttackCost = 25;
  }

  specialAttack(target) {
    if (this.mana >= this.specialAttackCost) {
      this.hp += 8;
      this.mana -= this.specialAttackCost;
      console.log(`${this.name} uses Heal. Restores 8 HP.`);
    } else {
      console.log("Not enough mana to perform special attack.");
      this.dealDamage(target);
    }
  }
}

class Berzerker extends Character {
  constructor(name) {
    super(name, 8, 4, 0);
    this.specialAttackCost = 0;
  }

  specialAttack() {
    this.dmg++;
    this.hp--;
    console.log(`${this.name} goes into Rage. Damage +1, HP -1.`);
  }
}

class Assassin extends Character {
  constructor(name) {
    super(name, 6, 6, 20);
    this.specialAttackCost = 20;
    this.shadowHit = false;
  }

  specialAttack(target) {
    if (this.mana >= this.specialAttackCost) {
      this.shadowHit = true;
      target.takeDamage(7);
      if (target.hp > 0) {
        this.takeDamage(7);
      }
      this.mana -= this.specialAttackCost;
      console.log(`${this.name} uses Shadow Hit. Deals 7 damage.`);
    } else {
      console.log("Not enough mana to perform special attack.");
      this.dealDamage(target);
    }
  }

  takeDamage(damage) {
    if (!this.shadowHit) {
      this.hp -= damage;
      if (this.hp <= 0) {
        this.hp = 0;
        this.status = "loser";
      }
    }
    this.shadowHit = false;
  }
}

class Game {
  constructor() {
    this.characters = [
      new Fighter("Grace"),
      new Paladin("Ulder"),
      new Monk("Moana"),
      new Berzerker("Draven"),
      new Assassin("Carl"),
    ];
    this.turnLeft = 10;
  }

  startGame() {
    console.log("The game starts now!");
    this.startTurn();
  }

  startTurn() {
    console.log(`It's turn ${11 - this.turnLeft}`);

    const shuffledCharacters = this.shuffleArray(this.characters);

    shuffledCharacters.forEach((character) => {
      if (character.status === "playing") {
        console.log(`It's time for ${character.name} to play`);

        const randomAction = Math.random();

        if (randomAction < 0.5) {
          const randomTargetIndex = Math.floor(
            Math.random() * this.characters.length
          );
          const target = this.characters[randomTargetIndex];
          character.dealDamage(target);
        } else {
          switch (character.constructor) {
            case Fighter:
              character.specialAttack(this.selectRandomTarget(character));
              break;
            case Paladin:
              character.specialAttack(this.selectRandomTarget(character));
              break;
            case Monk:
              character.specialAttack(this.selectRandomTarget(character));
              break;
            case Berzerker:
              character.specialAttack();
              break;
            case Assassin:
              character.specialAttack(this.selectRandomTarget(character));
              break;
            default:
              break;
          }
        }
      }
    });

    this.turnLeft--;

    if (this.turnLeft > 0) {
      this.startTurn();
    } else {
      this.endGame();
    }
  }

  // ... Autres méthodes de Game

  shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  selectRandomTarget(attacker) {
    let randomTargetIndex = Math.floor(Math.random() * this.characters.length);
    let target = this.characters[randomTargetIndex];
    while (target === attacker || target.status !== "playing") {
      randomTargetIndex = Math.floor(Math.random() * this.characters.length);
      target = this.characters[randomTargetIndex];
    }
    return target;
  }

  endGame() {
    const remainingCharacters = this.characters.filter(
      (character) => character.status === "playing"
    );
    if (remainingCharacters.length === 1) {
      const winner = remainingCharacters[0];
      winner.status = "winner";
      console.log(`${winner.name} is the winner!`);
    } else {
      console.log("It's a draw!");
    }
  }
}

const game = new Game();
game.startGame();
