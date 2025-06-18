const MonsterState = require('./MonsterState');
const AttackState = require('./AttackState');

class StunnedState extends MonsterState {
    constructor(monster) {
        super(monster);
        this.turnsLeft = 2;
    }

    attack(target) {
        this.monster.notifyObservers(`${this.monster.name} is stunned and cannot attack!`);
        this.turnsLeft--;
        if (this.turnsLeft <= 0) {
            this.monster.setState(new AttackState(this.monster));
            this.monster.notifyObservers(`${this.monster.name} is no longer stunned!`);
        }
        return 0;
    }

    defend() {
        this.monster.notifyObservers(`${this.monster.name} is stunned and cannot defend!`);
        this.turnsLeft--;
        if (this.turnsLeft <= 0) {
            this.monster.setState(new AttackState(this.monster));
            this.monster.notifyObservers(`${this.monster.name} is no longer stunned!`);
        }
        return 0;
    }

    takeDamage(damage) {
        const increasedDamage = Math.floor(damage * 1.5); // Stunned monsters take more damage
        this.monster.hp = Math.max(0, this.monster.hp - increasedDamage);
        if (this.monster.hp === 0) {
            this.monster.notifyObservers(`${this.monster.name} fainted!`);
        }
        return increasedDamage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.monster.maxHp - this.monster.hp, amount);
        this.monster.hp += actualHeal;
        this.monster.notifyObservers(`${this.monster.name} healed for ${actualHeal} HP!`);
        return actualHeal;
    }
}

module.exports = StunnedState;
